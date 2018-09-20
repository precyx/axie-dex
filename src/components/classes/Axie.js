export class Axie {
	id = null;
	axieData = null;
	spineData = null;

	constructor(axieData, spineData){
		this.id = axieData.id;
		this.axieData = axieData;
		this.spineData = spineData;
	}
}