/*jshint loopfunc:true */
//axios
import axios from 'axios';

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
            var totalPages = data.totalPages;
            var axiesPerPage = 12;
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
                        //console.log("ERR", err);
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
    getAxiesByIds(ids){
        var promises = [];
        ids.forEach(id=>{
            var p = new Promise((resolve,reject)=>{
                AXIE_DATA_V1.getAxieById(id).then((axieData)=>{
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
    getAllAxiesByAddress(address){
        return AXIE_DATA.getAxiesByAddress(address).then((data)=>{
            //var totalAxies = data.totalAxies;
            var totalPages = data.totalPages;
            var axiesPerPage = 12;
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
                        //console.log("ERR", err);
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
    }
}