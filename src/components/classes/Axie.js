export class Axie {
	id = null;
	axieData = null;
	spineData = null;
	ratings = {};
	otherData = {};

	constructor(axieData, spineData){
		this.id = axieData.id;
		this.axieData = axieData;
		this.spineData = spineData;
	}
}