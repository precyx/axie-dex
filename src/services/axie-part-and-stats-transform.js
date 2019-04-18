import {axieStats} from '../data/axie-stats';
import {minMaxPartStatsByType} from '../data/axie-stats';

/**
 * Returns the Battle parts of all 6 parts 
 * @export
 * @param {*} parts
 * @returns
 */
export function getBattleParts(parts){
	let battleParts = [];
	var partTypes = ["back", "ears", "eyes", "horn", "mouth", "tail"];
	let battlePartTypes = ["mouth", "back", "horn", "tail"];
	// solve array
	if(Array.isArray(parts)){
		parts.forEach(part => {
			if(battlePartTypes.includes(part.type)) battleParts.push(part);
		});
	}
	// solve object
	else if(parts !== null && typeof parts === "object"){
		partTypes.forEach(partType =>{
			if(battlePartTypes.includes(partType)) battleParts.push(parts[partType]);
		});
	}
	return battleParts;
}


/**
 * Analyzes {trait data} with all the [min, max] stats for each [partType] (back, mouth, tail, horn)
 * Currently checks only MOVE 0
 * @export getMinMaxStatsOfPartsByType
 * @param {*} axieTraitsData
 * @return {Object}
 */
export function getMinMaxStatsOfPartsByType(axieTraitsData){
	let partStats = {};
	//
	//const CLASSES = ["aquatic", "plant", "beast", "reptile", "bird", "bug"]; @unused
	const DEFAULT_MIN = 9999999;
	const DEFAULT_MAX = 0;
	const BATTLE_PART_TYPES = ["mouth", "back", "horn", "tail"];
	const STATS_TO_CHECK = ["attack","defense","accuracy", "attackTrueHit"];
	const MIN_MAX_MODEL = {
		"attack" : {
			"min" : DEFAULT_MIN,
			"max" : DEFAULT_MAX,
		},
		"defense" : {
			"min" : DEFAULT_MIN,
			"max" : DEFAULT_MAX,
		}, 
		"accuracy" : {
			"min" : DEFAULT_MIN,
			"max" : DEFAULT_MAX,
		},
		"attackTrueHit" : {
			"min" : DEFAULT_MIN,
			"max" : DEFAULT_MAX
		}
	};
	for(let traitElem in axieTraitsData){
		let trait = axieTraitsData[traitElem];
		if(BATTLE_PART_TYPES.includes(trait.type)){
			// if part type is a first: initialize with data
			if(!partStats[trait.type]) partStats[trait.type] = JSON.parse(JSON.stringify(MIN_MAX_MODEL));
			// check stats in loop
			STATS_TO_CHECK.forEach((stat) => {
				// check true hit
				if(stat === "attackTrueHit"){
					if(trait.moves[0]["attack"] !== 0) {
						partStats[trait.type]["attackTrueHit"]["min"] = Math.min(partStats[trait.type]["attackTrueHit"]["min"], trait.moves[0]["attack"] * trait.moves[0]["accuracy"] / 100);
						partStats[trait.type]["attackTrueHit"]["max"] = Math.max(partStats[trait.type]["attackTrueHit"]["max"], trait.moves[0]["attack"] * trait.moves[0]["accuracy"] / 100);
					}
				}
				// check normal stats
				else {
					if(trait.moves[0][stat] !== 0) {
						partStats[trait.type][stat]["min"] = Math.min(partStats[trait.type][stat]["min"], trait.moves[0][stat]);
						partStats[trait.type][stat]["max"] = Math.max(partStats[trait.type][stat]["max"], trait.moves[0][stat]);
					}
				}
			});
		}
	}
	// add summs of each stat
	partStats["sums"] = JSON.parse(JSON.stringify(MIN_MAX_MODEL));
	BATTLE_PART_TYPES.forEach((type)=>{
		STATS_TO_CHECK.forEach((stat)=>{
			// reset defaults
			partStats["sums"][stat]["min"] = partStats["sums"][stat]["min"] === DEFAULT_MIN ? 0 : partStats["sums"][stat]["min"];
			partStats["sums"][stat]["max"] = partStats["sums"][stat]["max"] === DEFAULT_MAX ? 0 : partStats["sums"][stat]["max"];
			// increment
			partStats["sums"][stat]["min"] += partStats[type][stat]["min"];
			partStats["sums"][stat]["max"] += partStats[type][stat]["max"];
		});
	});
	return partStats;
}



/**
 * Gets Totals of all Stats {atk, def, acc, ath, sum}
 * ATH = Attack True Hit (atk * acc / 100)
 * @param {*} battleParts
 * @returns {Object}
 */
export function getTotalStats(battleParts){
	var totals = {atk:0, def:0, acc:0, ath:0, sum:0};
	battleParts.forEach((part)=>{
		// calc totals
		var move0 = part.moves[0];
		totals.atk 	+= move0.attack;
		totals.def 	+= move0.defense;
		totals.acc  += move0.accuracy;
		totals.ath  += move0.attack * move0.accuracy/100;
		totals.sum  += (move0.attack * move0.defense/100 + move0.defense).toFixed(1);
	});
	totals["ath"] = Math.round(totals["ath"]);
	return totals;
}


/**
 * Rates all stats (atk, def, acc, hp, spd, skl, mor, ath, tnk) with a {score} between 1-10
 * {Scores} are calculated by comparing each {stat} of all {battle parts} against the {best parts} of each {type}
 * A {best part} possesses a {stat} that's the highest in the game.   
 * TNK = Tankiness
 * ATH = Attack True Hit
 * @param {*} axieData
 * @param {*} axieStats
 * @param {*} battleParts
 * @param {*} minMaxPartStatsByType
 * @returns {Object}
 */
export function rateStats(axieData, axieStats, battleParts, minMaxPartStatsByType){
	var scores = {};
	var stats = ["attack", "defense", "accuracy"];
	var stats2 = ["hp", "speed", "skill", "morale"];
	// get scores for stats
	battleParts.forEach((part)=>{
		stats.forEach(stat=>{
			let val = part.moves[0][stat];
			let max = minMaxPartStatsByType[part.type][stat]["max"];
			let percentage =  val / max;
			scores[stat] = scores[stat] ? scores[stat] : 0; 
			scores[stat] += percentage;
		});
		// calc attackTrueHit score
		scores["attackTrueHit"] = scores["attackTrueHit"] ? scores["attackTrueHit"] : 0; 
		scores["attackTrueHit"] += part.moves[0]["attack"] * part.moves[0]["accuracy"] /100  / minMaxPartStatsByType[part.type]["attackTrueHit"]["max"];
		// calc def score 2
		scores["defense2"] = scores["defense2"] ? scores["defense2"] : 0; 
		scores["defense2"] += part.moves[0]["defense"];
	});
	// harmonize score to scala 1-10
	//console.log("X", axieData);
	stats2.forEach(stat=>{
		//console.log("dd", axieData.stats);
		let val = axieData.stats[stat];
		let min = axieStats[stat].base;
		let max = axieStats[stat].max;
		let percentage = (val-min) / (max-min);
		scores[stat] = +(percentage*10).toFixed(1);
	});
	// harmonize score to scala 1-10
	stats.forEach(stat=>{
		scores[stat] 	=  +(scores[stat]*10/4).toFixed(1);
	});
	// harmonize other stats
	scores["attackTrueHit"] = +(scores["attackTrueHit"]*10/4).toFixed(1);
	scores["defense2"] = +(scores["defense2"]/minMaxPartStatsByType["sums"]["defense"]["max"]*10).toFixed(1);
	scores["hp2"] = +(axieData.stats["hp"] / axieStats["hp"].max*10).toFixed(1);
	//
	return scores;
}


export function calcBadges(axieData){
	if(axieData.stage < 3) return;
	var battleParts = getBattleParts(axieData.parts);
	var totals = getTotalStats(battleParts);
	var scores = rateStats(axieData, axieStats, battleParts, minMaxPartStatsByType);
	// totals
	var hpDefTotal = axieData.stats.hp + totals["def"];
	var athTotal = totals["ath"];
	//console.log(hpDefTotal, athTotal); 
	//
	//rate tankiness (def+hp)
	var tankLevel = 0;
	var tankScore = (scores["defense"] + scores["hp2"]) / 2;
	if(tankScore >= 6.5) tankLevel = 1;
	if(tankScore >= 7.5) tankLevel = 2;
	if(tankScore >= 8.5) tankLevel = 3;
	if(tankScore >= 9.5) tankLevel = 4;
	// rate attack true hit (ath)
	var athLevel = 0;
	var attackScore = scores["attackTrueHit"]; 
	if(attackScore >= 6.5) athLevel = 1;
	if(attackScore >= 7.5) athLevel = 2;
	if(attackScore >= 8.5) athLevel = 3;
	if(attackScore >= 9.5) athLevel = 4;
	//
	return{
		attack: {level: athLevel, score: athTotal},
		tankiness: {level: tankLevel, score:hpDefTotal},
	};
	//console.log("automated", tkLv);
}