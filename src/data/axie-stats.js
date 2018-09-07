export const axieStats = {
	hp: 		{base: 23, max: 61},
	speed: 	{base: 23, max: 61},
	morale: {base: 23, max: 61},
	skill: 	{base: 23, max: 61},
};

export const axieStatRatingColors = {
	"perfect" 	: "#7ad6f5",
	"good" 			: "#79eed3",
	"average" 	: "#b8e986",
	"bad" 			: "#ffc96f",
	"terrible" 	: "#ff8c6f"
};



export const axieClassStats = {
	aquatic:	{
		body: {hp: 4, speed: 4, skill: 3, morale: 1},
		part: {hp: 1, speed: 3, skill: 0, morale: 0}
	},
	beast:	{
		body: {hp: 2, speed: 3, skill: 2, morale: 5},
		part: {hp: 0, speed: 1, skill: 0, morale: 3}
	},
	plant:	{
		body: {hp: 5, speed: 2, skill: 2, morale: 3},
		part: {hp: 3, speed: 0, skill: 0, morale: 1}
	},
	bird:	{
		body: {hp: 1, speed: 5, skill: 3, morale: 3},
		part: {hp: 0, speed: 3, skill: 0, morale: 1}
	},
	bug:	{
		body: {hp: 3, speed: 2, skill: 3, morale: 4},
		part: {hp: 1, speed: 0, skill: 0, morale: 3}
	},
	reptile:	{
		body: {hp: 4, speed: 3, skill: 2, morale: 3},
		part: {hp: 3, speed: 1, skill: 0, morale: 0}
	}
}


export const minMaxPartStats = {"mouth":{"attack":{"min":15,"max":26,"vals":[0,20,19,16,24,19,21,20,19,25,24,17,26,19,0,0,20,20,21,24,23,18,25,15,20,16,26,19,20,24,20,0]},"defense":{"min":3,"max":13,"vals":[3,7,13,5,4,4,9,10,6,8,5,9,8,12,13,7,7,10,4,8,10,11,5,12,7,5,8,13,7,8,10,3]},"accuracy":{"min":66,"max":100,"vals":[82,90,74,86,86,90,74,74,79,70,82,90,66,74,100,100,94,82,90,82,74,86,82,74,94,86,66,74,90,82,74,82]}},"horn":{"attack":{"min":17,"max":28,"vals":[25,28,19,20,24,18,18,19,23,25,27,23,0,19,0,24,18,21,19,22,23,25,21,23,19,22,17,20,22,19,18,19,19,25,23,24,19,20,28,17,20,27,20,17,19]},"defense":{"min":1,"max":15,"vals":[2,1,9,6,5,6,11,15,5,9,8,10,13,7,13,10,5,7,11,8,6,2,7,2,7,6,11,11,7,8,6,15,9,5,5,4,10,9,1,12,10,8,6,11,7]},"accuracy":{"min":66,"max":100,"vals":[82,86,90,94,82,94,90,74,90,83,81,70,100,78,100,81,90,86,74,82,70,82,86,82,90,74,74,74,86,74,94,74,90,66,90,86,74,78,86,90,74,81,94,74,78]}},"back":{"attack":{"min":8,"max":25,"vals":[0,20,20,24,22,12,0,16,24,21,13,17,20,20,22,20,20,22,16,22,15,17,0,20,19,18,16,20,18,24,20,23,18,22,8,0,14,20,24,25,22,12,20,18,16]},"defense":{"min":2,"max":24,"vals":[14,8,7,3,3,16,14,6,6,8,18,18,10,5,5,5,12,3,18,10,15,9,14,12,5,11,10,5,7,5,0,8,10,8,24,14,17,7,5,2,3,16,0,11,18]},"accuracy":{"min":66,"max":100,"vals":[100,90,90,86,89,90,100,94,84,74,74,70,82,90,82,90,74,82,82,70,86,90,100,74,94,74,74,86,82,90,90,83,74,82,74,100,74,90,66,86,89,90,90,74,82]}},"tail":{"attack":{"min":15,"max":31,"vals":[19,23,20,16,18,19,20,24,23,16,17,20,24,19,17,21,22,23,16,31,16,17,19,15,24,23,17,18,15,26,21,22,22,15,18,18,18,18,21,17,20,16,21,15]},"defense":{"min":1,"max":17,"vals":[11,5,7,13,10,7,5,9,2,13,7,7,5,5,16,8,10,2,10,1,0,10,4,17,2,9,10,12,11,5,10,3,3,13,7,14,9,10,10,16,5,0,10,11]},"accuracy":{"min":66,"max":94,"vals":[82,74,94,78,86,94,90,84,82,78,90,78,74,90,74,86,66,82,74,82,78,74,90,74,82,66,90,74,94,80,80,86,86,86,90,70,78,86,80,74,90,78,80,94]}}};