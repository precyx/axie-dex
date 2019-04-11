import axios, { AxiosPromise } from 'axios';
import AxiePartClasses from '../components/Axie/AxiePartClasses';
import { async } from 'q';


const baseUrl = "https://axieinfinity.com/api/v2";


export enum AxieClass {
	aquatic = "aquatic",
	beast = "beast",
	plant = "plant",
	bug = "bug",
	bird = "bird",
	reptile = "reptile",
	dusk = "dusk",
	dawn = "dawn",
	mech = "mech",
}

export enum AxieType {
	back = "back",
	tail = "tail",
	ears = "ears",
	eyes = "eyes",
	horn = "horn",
	mouth = "mouth",
}

export interface AxieParams {
	breedable?:string;
	offset?:string;
	class?:AxieClass;
	stage?:string;
	lang?:string;
	parts?:string[];
}

export interface Axie {
	axies:[],
	totalAxies:number,
}

export interface BodyPart {
	partId:string;
	name:string;
	type:AxieType;
	class:AxieClass;
	specialGenes:string | null;
}

export const AxieV2 = {

/*	getAxiesByAddress(address){
			let url = "https://axieinfinity.com/api/v2/addresses/";
			let web3 = new Web3(Web3.givenProvider)
			if(!web3.utils.isAddress(address)) return new Error("invalid Ethereum address");
			url = `${url}${address}/axies`;
			axios.get(url).then(data => {
				console.log("data", data);
			}).catch(error => console.log("err", error));
	}*/


	getAxiesByAddress : async (address:string, params:AxieParams):Promise<Axie[]> => {
		let url = `${baseUrl}/addresses/${address}/axies?a=1`;
		url = AxieV2.appendParam(url, "breedable", params.breedable);
		url = AxieV2.appendParam(url, "offset", params.offset);
		url = AxieV2.appendParam(url, "class", params.class);
		url = AxieV2.appendParam(url, "stage", params.stage);
		url = AxieV2.appendParam(url, "lang", params.lang);
		if(params.parts){
			params.parts.forEach(part => {
				url =  AxieV2.appendParam(url, "part", part);
			});
		}
		//console.log("url", url);
		const response = await axios.get(url);
		const data:Axie[] = response.data;
		return data;
	},

	getAxiesByAddress2 : (address:string, params:AxieParams):AxiosPromise => {
		let url = `${baseUrl}/addresses/${address}/axies?a=1`;
		url = AxieV2.appendParam(url, "breedable", params.breedable);
		url = AxieV2.appendParam(url, "offset", params.offset);
		url = AxieV2.appendParam(url, "class", params.class);
		url = AxieV2.appendParam(url, "stage", params.stage);
		url = AxieV2.appendParam(url, "lang", params.lang);
		if(params.parts){
			params.parts.forEach(part => {
				url =  AxieV2.appendParam(url, "part", part);
			});
		}
		//console.log("url", url);
		const response:AxiosPromise = axios.get(url);
		return response;
	},


	getBodyParts : async(lang?:string):Promise<BodyPart[]> => {
		let url = `${baseUrl}/body-parts?lang=en`;
		const response = await axios.get(url);
		const data:BodyPart[] = response.data;
		return data;
	},

	appendParam : (url:string, name:string, value:string | undefined) => {
		if(!value) return url;
		return `${url}&${name}=${value}`;
	},
	
}