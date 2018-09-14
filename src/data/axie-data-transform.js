

/**
 * Returns the Battle parts of all 6 parts 
 * @export
 * @param {*} parts
 * @returns
 */
export function getBattleParts(parts){
	var battleParts = [];
	var battlePartTypes = ["mouth", "back", "horn", "tail"];
	parts.forEach(part => {
		if(battlePartTypes.includes(part.type)) battleParts.push(part);
	});
	return battleParts;
}


/**
 * Returns a JSON with all the [min, max] stats for each [partType] (back, mouth, tail, horn)
 * Currently checks only MOVE 0
 * @export getMinMaxStatsOfPartsByType
 * @param {*} axieTraitsData
 */
export function getMinMaxStatsOfPartsByType(axieTraitsData){
	var partStats = {};
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
		var trait = axieTraitsData[traitElem];
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