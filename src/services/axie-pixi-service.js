//pixi
import * as PIXI from 'pixi.js';
import 'pixi-spine';
//axios
import axios from 'axios';

export const AXIE_PIXI = {
	/**
	 * Gets the {spine} from an {axie}
	 * @export
	 * @param {Axie} axie with {model, atlas, img}
	 */
	getAxieSpine(axie){
		let axieModel = axie.figure.model;
		let axieAtlas = axie.figure.atlas;
		let axieImg = axie.figure.images["axie.png"];

		//
		var newDateParam = ("?" + new Date().getTime());
		return axios.get(axieModel + newDateParam).then((axieModel)=> {
			return axios.get(axieAtlas + newDateParam).then((axieAtlas)=> {
				const rawAtlasData = axieAtlas.data;
				
				//console.log("attulasu", axieModel.data, axieAtlas.data);

				const spineAtlas = new PIXI.spine.core.TextureAtlas(rawAtlasData, (line, callback)=> {
						callback(PIXI.BaseTexture.from(axieImg + newDateParam));
				});
				const spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas);
				const spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);
				const spineData = spineJsonParser.readSkeletonData(axieModel.data);
				let axie = new PIXI.spine.Spine(spineData);
				return axie;
			});
		});
	},

	/**
	 * Gets {spines} from {axies}
	 * @param {Array} axies
	 * @param {Function} onDataCallback triggers each time data is fetched. param is {axie} 
	 * @returns {Array} with {axie spines}
	 */
	getSpinesOfAxies(axies, onDataCallback){
		var promises = [];
		for(var i=0; i < axies.length; i++){
			let axie = axies[i];
			if(axie.figure) {
				let p = AXIE_PIXI.getAxieSpine(axie).then((aSpine)=>{
					onDataCallback(axie);
					return aSpine;
				});
				promises.push(p);
			}
			else promises.push(null);
		}
		return Promise.all(promises).then((axie_spines)=>{
			return axie_spines;
		});
	}
}// end-axie-pixi-service