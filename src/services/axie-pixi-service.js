//pixi
import * as PIXI from 'pixi.js';
import 'pixi-spine';
//axios
import axios from 'axios';

/**
 * gets axie spine from pixi
 * @export
 */
export function getAxieSpine(axieData){
	let axieModel = axieData.figure.model;
	let axieAtlas = axieData.figure.atlas;
	let axieImg = axieData.figure.images[axieData.id+".png"];
	//
	var newDateParam = ("?" + new Date().getTime());
	return axios.get(axieModel + newDateParam).then((axieModel)=> {
		return axios.get(axieAtlas + newDateParam).then((axieAtlas)=> {
			const rawAtlasData = axieAtlas.data;
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
}