

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
	const BATTLE_PART_TYPES = ["mouth", "back", "horn", "tail"];
	const STATS_TO_CHECK = ["attack","defense","accuracy", "attackTrueHit"];
	const MIN_MAX_MODEL = {
		"attack" : {
			"min" : 9999,
			"max" : 0,
		},
		"defense" : {
			"min" : 9999,
			"max" : 0,
		}, 
		"accuracy" : {
			"min" : 9999,
			"max" : 0,
		},
		"attackTrueHit" : {
			"min" : 9999,
			"max" : 0
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
				if(stat == "attackTrueHit"){
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
	return partStats;
}