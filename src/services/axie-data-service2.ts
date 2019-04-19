import axios, { AxiosPromise, AxiosResponse } from 'axios';
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
  id?: number;
  name?: string;
  genes?: string;
  owner?: string;
  birthDate?: number;
  sireId?: number;
  sireClass?: AxieClass;
  matronId?: number;
  matronClass?: AxieClass;
  stage?: number;
  class?: AxieClass;
  title?: string;
  parts?: Object[];
  image?: string;
  figure?: {
    images?: {
      "axie.png"?: string;
    };
    atlas?: string;
    model?: string;
  };
  stats?: {
    hp?: number;
    speed?: number;
    skill?: number;
    morale?: number;
  };
  exp?: number;
  breedCount?: number;
  breedable?: boolean;
  level?: number;
  unlocked?: boolean;
}


export interface AxieAdult {
  id: number;
  name: string;
  genes?: string;
  owner?: string;
  birthDate?: number;
  sireId?: number;
  sireClass?: AxieClass;
  matronId?: number;
  matronClass?: AxieClass;
  stage: number;
  class: AxieClass;
  title: string;
  parts?: Object[];
  image?: string;
  figure: {
    images: {
      "axie.png": string;
    };
    atlas: string;
    model: string;
  };
  stats: {
    hp: number;
    speed: number;
    skill: number;
    morale: number;
  };
  exp: number;
  breedCount: number;
  breedable: boolean;
  level: number;
  unlocked: boolean;
}



export interface AxieResponse {
	axies:Axie[];
	totalAxies:number;
}


export interface BodyPart {
	partId:string;
	name:string;
	type:AxieType;
	class:AxieClass;
	specialGenes:string | null;
}


export interface GenericResponse<T> {
	error: Object | boolean;
	data: T;
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


	getAxie : async (id:number):Promise<GenericResponse<Axie>> => {
		let url = `${baseUrl}/axies/${id}`;
		const response:AxiosResponse<Axie> = await axios.get(url);
		return {
			error: false,
			data: response.data,
		}
	},


	getAxiesByAddress : async (address:string, params:AxieParams):Promise<AxieResponse> => {
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
		const data:AxieResponse = response.data;
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


	getAllAxiesByAddress : async (address:string, params:AxieParams, callback?:Function):Promise<Axie[]> => {
		let params2:AxieParams = Object.assign({offset:"0"}, params);
		const response:AxieResponse = await AxieV2.getAxiesByAddress(address, params2);

		const totalAxies = response.totalAxies;
		const axiesPerPage = response.axies.length;
		const totalPages = Math.floor(totalAxies / axiesPerPage);
		let axies_cache:Axie[] = [];
		
		if(callback) callback({loaded: 0, total: totalPages * axiesPerPage});

		for(let i = 0; i < totalPages; i++){
			let newParams = Object.assign({}, params)
			params.offset = (i * axiesPerPage + "");
			
			let axies:AxieResponse = await AxieV2.getAxiesByAddress(address, newParams)
			if(callback) callback({loaded: axies_cache.length, total: totalPages * axiesPerPage});
			axies_cache = [...axies.axies, ...axies_cache];
		}

		return axies_cache;
	},


	getBodyParts : async(lang?:string):Promise<BodyPart[]> => {
		let url = `${baseUrl}/body-parts?lang=en`;
		const response = await axios.get(url);
		const data:BodyPart[] = response.data;
		return data;
	},

  getAxiesByIds: async (ids:number[], callback:Function) => {
			var promises:Array<any> = [];
			var loaded = 0;
			ids.forEach(id=>{
					var p:Promise<any> = new Promise((resolve,reject)=>{
							AxieV2.getAxie(id).then((axieData:GenericResponse<Axie>)=>{
									if(callback) callback({loaded: ++loaded, total: ids.length});
									resolve(axieData.data);
							})
					})
					promises.push(p);
			})
			return Promise.all(promises);
	},

	appendParam : (url:string, name:string, value:string | undefined) => {
		if(!value) return url;
		return `${url}&${name}=${value}`;
	},
	
}