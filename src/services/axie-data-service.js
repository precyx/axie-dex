/*jshint loopfunc:true */
//axios
import axios from 'axios';
import { ExpSyncContract } from '../data/contracts/ExpSyncContract';
import Web3 from "web3";
import { consolidateStreamedStyles } from 'styled-components';

/*
    A list of API URL generators for the Axie Infinity Website
    https://axieinfinity.com
*/

export const AXIE_DATA = {
    /**
     * Builds Axie Infinity Axies By Address API URL
     * @param {string} address
     * @param {number} offset
     * @returns
     */
    buildAxiesByAddressAPI(address, offset, additionalParams){
        var url = "https://axieinfinity.com/api/addresses/";
        if(address) url += address + "/axies";
        else throw new Error("address is required. e.g. 0x2B81fd2DBFbF45f403bc74F06d416d4218e8A953");
        url += "?a";
        if(offset) url += "&offset=" + offset;
        if(additionalParams) url += additionalParams;
        return url;
    },
    /**
     * @param {*} address
     * @param {*} offset
     * @returns {Object} contains {axies}, {totalAxies}, {totalPages}
     */
    getAxiesByAddress(address, offset){
        return axios.get(AXIE_DATA.buildAxiesByAddressAPI(address, offset)).then((axies)=>{
            return axies.data;
        });
    },
    /**
     * @param {*} address
     * @returns {Array} Array containing {Axie} Objects 
     */
    getAllAxiesByAddress(address){
        return AXIE_DATA.getAxiesByAddress(address).then((data)=>{
            //var totalAxies = data.totalAxies;
            var totalAxies = data.totalAxies;
            var axiesPerPage = data.axies.length;
            var totalPages = Math.floor(totalAxies / axiesPerPage);
            var axies_cache = [];
            //
            var promises = [];
            for(let i = 0; i < totalPages; i++){
                var p = new Promise((resolve, reject)=>{
                    AXIE_DATA.getAxiesByAddress(address, i * axiesPerPage).then(data=>{
                        axies_cache = [...data.axies, ...axies_cache];
                        //console.log("OK", axies_cache);
                        resolve();
                    }).catch((err)=>{
                        reject(err);
                    })
                });
                promises.push(p);
            }
            return Promise.all(promises).then((xyz)=>{
                return axies_cache;
            });
        });
    },
    /**
     * @param {Number} id
     * @returns
     */
    buildAxieByIdAPI(id){
        var url = "https://axieinfinity.com/api/axies/";
        if(id) url += id;
        else throw new Error("id is required. e.g 259");
        return url;
    },
    /**
     * @param {Number} offset
     * @param {String} additionalParams
     * @returns
     */
    buildAxiesAPI(offset, additionalParams){
        var url = "https://axieinfinity.com/api/axies";
        if(offset) url+= "?offset="+offset;
        if(additionalParams) url+= additionalParams;
        return url;
    },
    /**
     * @returns {Array} with body parts
     */
    getBodyParts(){
        let url = "https://axieinfinity.com/api/body-parts";
        return axios.get(url).then((bodyparts)=>{
            return bodyparts.data;
        });
    },
}// end axie-data


export const AXIE_DATA_V1 = {
        /**
     * Builds Axie Infinity Axies By Address API URL
     * @param {string} address
     * @param {number} offset
     * @returns
     */
    buildAxiesByAddressAPI(address, page, additionalParams){
        var url = "https://api.axieinfinity.com/v1/addresses/";
        if(address) url += address + "/axies";
        else throw new Error("address is required. e.g. 0x2B81fd2DBFbF45f403bc74F06d416d4218e8A953");
        address += "?a";
        if(page) url += "&page=" + page;
        if(additionalParams) url += additionalParams;
        return url;
    },
    /**
     * @param {*} address
     * @param {*} offset
     * @returns {Object} contains {axies}, {totalAxies}, {totalPages}
     */
    getAxiesByAddress(address, offset, additionalParams){
        return axios.get(AXIE_DATA.buildAxiesByAddressAPI(address, offset, additionalParams)).then((axies)=>{
            return axies.data;
        });
    },
    /**
     * @param {Array} ids list of [axie] ID's
     * @return {Array} axies 
     */
    getAxiesByIds(ids, callback){
        var promises = [];
        var loaded = 0;
        ids.forEach(id=>{
            var p = new Promise((resolve,reject)=>{
                AXIE_DATA_V1.getAxieById(id).then((axieData)=>{
                    if(callback) callback({loaded: ++loaded, total: ids.length});
                    resolve(axieData);
                })
            })
            promises.push(p);
        })
        return Promise.all(promises);
    },
    /**
     * @param {*} address
     * @returns {Array} Array containing {Axie} Objects 
     */
    getAllAxiesByAddress(address, additionalParams, callback){
        return AXIE_DATA.getAxiesByAddress(address, 0, additionalParams).then((data)=>{
            //console.log("d", data);
            var totalAxies = data.totalAxies;
            var axiesPerPage = data.axies.length;
            var totalPages = Math.floor(totalAxies/axiesPerPage);
            var axies_cache = [];
            if(callback) callback({loaded: 0, total: totalPages * axiesPerPage});
            //
            var promises = [];
            for(let i = 0; i < totalPages; i++){
                var p = new Promise((resolve, reject)=>{
                    AXIE_DATA.getAxiesByAddress(address, i * axiesPerPage, additionalParams).then(data=>{
                        axies_cache = [...data.axies, ...axies_cache];
                        if(callback) callback({loaded: axies_cache.length, total: totalPages * axiesPerPage});
                        //console.log("OK", axies_cache);
                        resolve();
                    })
                });
                promises.push(p);
            }
            return Promise.all(promises).then((xyz)=>{
                return axies_cache;
            });
        });
    },
    buildAxiesAPI(page, additionalParams){
        var url = "https://api.axieinfinity.com/v1/axies/";
        url += "?a";
        if(page) url+= "&page="+page;
        if(additionalParams) url+= additionalParams;
        return url;
    },
    /**
     * @param {Number} id
     * @returns
     */
    buildAxieByIdAPI(id){
        var url = "https://api.axieinfinity.com/v1/axies/";
        if(id) url += id;
        else throw new Error("id is required. e.g 259");
        return url;
    },
    getAxieById(id){
        var url = this.buildAxieByIdAPI(id);
        return axios.get(url).then((data)=>{
            return data.data;
        }).catch((err)=>{
            console.log("error: ", err);
		});
    },
    /**
     * @param {Array[Axie]} axies array of {axies} 
     * @param {Function} onDataCallback triggers each time data is fetched. param is {axie} 
     */
    getStaticImagesByAxies(axies, onDataCallback){
        var promises = [];
        axies.forEach((axie)=>{
            var p = new Promise((resolve, reject)=>{
                this.getAxieById(axie.id).then((data) => {
                    var staticImage = data.figure ? data.figure.static.idle : ""; 
                    console.log("eee", staticImage);
                    resolve(staticImage);
                    onDataCallback(axie);
                });
            });
            promises.push(p);
        });
        return Promise.all(promises);
    },
    /**
     * @return gets all ID's for the different body shapes e.g. sumo, wetDog, bigYak
     */
    getBodyShapes(){
        let url = "https://api.axieinfinity.com/v1/body-shape";
        return axios.get(url).then((data)=>{
            return data.data;
        }).catch(function(error){
            throw new Error("Axie API v1 down");
        });
    },
    getGasPrice(){
        const url = "https://api.axieinfinity.com/v1/gas-price";
        return axios.get(url).then(data=>{
            return data.data;
        })
    },
    getTeamsByAddress(address){
        if(!address) throw new Error("address required");
        const url = `https://api.axieinfinity.com/v1/battle/teams/?address=${address}&offset=0&count=9999&no_limit=1`;
        return axios.get(url).then(data=>{
            return data.data;
        });
    },
    getTeamById(teamID){
        if(!teamID) throw new Error("teamID required");
        const url = `https://api.axieinfinity.com/v1/battle/teams/${teamID}`;
        return axios.get(url).then(data=>{
            return data.data;
        })
    },
}



export const AXIE_DATA_V2 = {

	getAxiesByAddress(address, offset, additionalParams){
        let url = "https://axieinfinity.com/api/v2/addresses/";
        let web3 = new Web3(Web3.givenProvider)
        if(!web3.utils.isAddress(address)) throw new Error("invalid Ethereum address");
        url = `${url}${address}/axies?a=1`;
        if(offset) url += `&offset=${offset}`;
        if(additionalParams) url += `&${additionalParams}`;
        console.log(url);
        return axios.get(url).then(data => {
            return data.data;
            console.log("data", data);
        }).catch(error => console.log("err", error));
	}
}



export const AXIE_DATA_TRANSFORM = {

    mergeXPDataIntoV2API(axies_v2, axies_v0){
        axies_v2.forEach(axie_v2 => {
            axies_v0.forEach(axie_v0 => {
                if(axie_v2.id == axie_v0.id) {
                    console.log("vvv", axie_v2, axie_v0);
                    axie_v2["exp"]            = axie_v0.exp
                    axie_v2["expForBreeding"] = axie_v0.expForBreeding
                }
            })
        });
    },

    getAndMergePendingBlockchainXPIntoV2API(axies_v2, ExpSyncContract){
        var promises = [];
        axies_v2.forEach(axie=>{
            var p = new Promise((resolve,reject)=>{
                console.log("kkkK", axie);
                ExpSyncContract.methods.getCheckpoint(axie.id.toString()).call((err, res)=>{
                    console.log("XP", res);
                    axie["pendingExp2"] = (res && res._exp) ? res._exp : 0;
                    resolve();
                });
            })
            promises.push(p);
        })
        return Promise.all(promises);
    }
    
}


export const AXIE_ICU = {

    getAxies(params){
        const url = `https://axie.icu/api/search?${params}`;
        return axios.get(url).then(data=>{
            return data.data;
        })
    }
}
