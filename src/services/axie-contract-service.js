
import Web3 from "web3";
import {AXIE_DATA_V1} from "./axie-data-service";

/*export const checkpointForMulti = async (axieIds, expList, signatureList, owner, axieExpCheckpoint) => {
	const createdAtList = [];
	let signatures = '0x' + signatureList.map(s => s.slice(2)).join('');

	for (var i = 0; i < axieIds.length; i++) {
		const createdAt = Date.now();
		createdAtList.push(createdAt);
	}

	return axieExpCheckpoint.checkpointForMulti(
		axieIds,
		expList,
		createdAtList,
		signatures,
		{ from: owner },
	);
};*/


export const AXIE_WEB3 = {

	/**
	 * @param {Contract} _contract {contract object} constructed with Web3 via the {ABI} and {contract adress} 
	 * @param {String} _method {contract method}
	 * @param {Array} _params 
	 * @param {String} _sender address
	 */
	send: function(_contract, _method, _params, _sender){

		console.log("params", _params);

		return new Promise((resolve,reject)=>{
			AXIE_DATA_V1.getGasPrice().then(gasPrice=>{
				// estimate gas
				_contract.methods[_method](..._params).estimateGas({ from: _sender }).then((gasEstimate)=>{
					let options = {
						from: _sender, 
						gas: gasEstimate
					};
					if(gasPrice && gasPrice.standard) options.gasPrice = gasPrice.standard;
					// send transaction
					_contract.methods[_method](..._params).send(options, (err, res)=>{
						//console.log("res", err, res);
						if(res) resolve(res);
						else if(err) reject(err);
					});
				})
			});
		})
			
	}

}