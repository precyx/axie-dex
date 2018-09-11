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

export function getRatingByStatPercentage(p){
	if(p >= 0.95) 			return "perfect";
	else if(p >= 0.8) 	return "good";
	else if(p >= 0.6) 	return "average";
	else if(p >= 0.4) 	return "bad";
	else if(p < 0.4) 		return "terrible";
}



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


export const minMaxPartStatsByType = {
  "mouth": {
    "attack": {
      "min": 15,
      "max": 26
    },
    "defense": {
      "min": 3,
      "max": 13
    },
    "accuracy": {
      "min": 66,
      "max": 100
    },
    "attackTrueHit": {
      "min": 11.1,
      "max": 20.64
    }
  },
  "horn": {
    "attack": {
      "min": 17,
      "max": 28
    },
    "defense": {
      "min": 1,
      "max": 15
    },
    "accuracy": {
      "min": 66,
      "max": 100
    },
    "attackTrueHit": {
      "min": 12.58,
      "max": 24.08
    }
  },
  "back": {
    "attack": {
      "min": 8,
      "max": 25
    },
    "defense": {
      "min": 2,
      "max": 24
    },
    "accuracy": {
      "min": 66,
      "max": 100
    },
    "attackTrueHit": {
      "min": 5.92,
      "max": 21.6
    }
  },
  "tail": {
    "attack": {
      "min": 15,
      "max": 31
    },
    "defense": {
      "min": 1,
      "max": 17
    },
    "accuracy": {
      "min": 66,
      "max": 94
    },
    "attackTrueHit": {
      "min": 11.1,
      "max": 25.42
    }
  }
};