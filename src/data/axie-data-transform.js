

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
 * Returns a JSON with all the min & max stats for each {part type} (back, mouth, tail, horn)
 * Currently checks only MOVE 0
 * @export
 * @param {*} axieTraitsData
 */
export function getMinMaxStatsOfParts(axieTraitsData){
	var partStats = {};
	//
	const BATTLE_PART_TYPES = ["mouth", "back", "horn", "tail"];
	const STATS_TO_CHECK = ["attack","defense","accuracy"];
	const MIN_MAX_MODEL = {
		"attack" : {
			"min" : 999,
			"max" : Number.NEGATIVE_INFINITY,
			"vals" : [],
		},
		"defense" : {
			"min" : 999,
			"max" : Number.NEGATIVE_INFINITY,
			"vals" : [],
		}, 
		"accuracy" : {
			"min" : 999,
			"max" : Number.NEGATIVE_INFINITY,
			"vals" : [],
		}, 
	};
	for(let traitElem in axieTraitsData){
		var trait = axieTraitsData[traitElem];
		if(BATTLE_PART_TYPES.includes(trait.type)){
			// if part type is a first: initialize with data
			if(!partStats[trait.type]) partStats[trait.type] = JSON.parse(JSON.stringify(MIN_MAX_MODEL));
			STATS_TO_CHECK.forEach((stat) => {
				if(trait.moves[0][stat] != 0) {
					console.log(Math.min(partStats[trait.type][stat]["min"], trait.moves[0][stat]));
					partStats[trait.type][stat]["min"] = Math.min(partStats[trait.type][stat]["min"], trait.moves[0][stat]);
					partStats[trait.type][stat]["max"] = Math.max(partStats[trait.type][stat]["max"], trait.moves[0][stat]);
				}
				partStats[trait.type][stat]["vals"].push(trait.moves[0][stat]);
			});
		}
	}
	return partStats;
}