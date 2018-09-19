//axios
import axios from 'axios';

/*
    A list of API URL generators for the Axie Infinity Website
    https://axieinfinity.com
*/


/**
 * Builds Axie Infinity Axies By Address API URL
 * @param {string} address
 * @param {number} offset
 * @returns
 */
export function buildAxiesByAddressAPI(address, offset){
    var url = "https://axieinfinity.com/api/addresses/";
    if(address) url += address + "/axies";
    else throw new Error("address is required. e.g. 0x2B81fd2DBFbF45f403bc74F06d416d4218e8A953");
    if(offset) url += "?offset=" + offset;
    return url;
}
/**
 * @param {*} address
 * @param {*} offset
 * @returns {Object} contains {axies}, {totalAxies}, {totalPages}
 */
export function getAxiesByAddress(address, offset){
    return axios.get(buildAxiesByAddressAPI(address, offset)).then((axies)=>{
        return axies.data;
    });
}
/**
 * @param {*} address
 * @returns {Array} Array containing {Axie} Objects 
 */
export function getAllAxiesByAddress(address){
    return getAxiesByAddress(address).then((data)=>{
        var totalAxies = data.totalAxies;
        var totalPages = data.totalPages;
        var axiesPerPage = 12;
        var axies = [];
        //
        var promises = [];
        for(let i = 0; i < totalPages; i++){
            var p = new Promise((resolve, reject)=>{
                getAxiesByAddress(address, i * axiesPerPage).then(data=>{
                    axies = [...data.axies, ...axies];
                    resolve(axies);
                })
            });
        }
        promises.push(p);
        return Promise.all(promises).then((axies)=>{
            return axies[0];
        });
    })
}

/**
 * @param {Number} id
 * @returns
 */
export function buildAxieByIdAPI(id){
    var url = "https://axieinfinity.com/api/axies/";
    if(id) url += id;
    else throw new Error("id is required. e.g 259");
    return url;
}

/**
 * @param {Number} offset
 * @param {String} additionalParams
 * @returns
 */
export function buildAxiesAPI(offset, additionalParams){
    var url = "https://axieinfinity.com/api/axies";
    if(offset) url+= "?offset="+offset;
    if(additionalParams) url+= additionalParams;
    return url;
}
