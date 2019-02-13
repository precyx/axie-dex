export const dps_bonuses = {
	"mouth-little-owl" : 4,
	"mouth-nut-cracker" : 4,
	"mouth-peace-maker" : 2,
	"tail-navaga" : 5,
	"tail-swallow" : 5,
	"tail-granmas-fan" : 5,
	"tail-hare": 5,
	"tail-nut-cracker": 4,
	"tail-rice": 4,
	"back-ronin" : 3,
	"back-furball" : 5,
	"back-cupid" : 3,
	"back-risky-beast": 5,
	"back-scarab": 6,
	"horn-cactus" : 5,
	"horn-feather-spear" : 5,
	"horn-little-branch" : 5,
	"horn-bumpy" : 3,
	"horn-scaly-spear" : 4,
	"horn-trump": 4,
	"horn-cerastes": 5,
	"horn-bamboo-shoot": 4,
}

export const type_bonus = (atk_type, def_type1, def_type2) => {
	let bonus = 0;
	bonus += type_bonus_single(atk_type, def_type1);
	bonus += type_bonus_single(atk_type, def_type2);
	return bonus;
}

function type_bonus_single(atk_type, def_type){
	const {PLANT, REPTILE, BEAST, BUG, AQUATIC, BIRD} = {
		PLANT		: "plant",
		REPTILE	: "reptile",
		BEAST		: "beast",
		BUG			: "bug",
		AQUATIC	: "aquatic",
		BIRD		: "bird",
	}; 
	let bonus = 0;
	if([BEAST, BUG].includes(atk_type)) {
		if([PLANT, REPTILE].includes(def_type)) bonus = 3;
		if([AQUATIC, BIRD].includes(def_type)) 	bonus = -3;
	}
	if([PLANT, REPTILE].includes(atk_type)) {
		if([AQUATIC, BIRD].includes(def_type)) 	bonus = 3;
		if([BEAST, BUG].includes(def_type)) 		bonus = -3;
	}
	if([AQUATIC, BIRD].includes(atk_type)) {
		if([BEAST, BUG].includes(def_type)) 		bonus = 3;
		if([PLANT, REPTILE].includes(def_type)) bonus = -3;
	}
	return bonus;
}