import Web3 from "web3";

/*
* Connect to web3 ethereum provider
* Compatible with:
*	- 1.0
* - 0.2.x
*/
function connectWeb3(){
	if (window.ethereum) {
		//window.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/6181032f255b4ce9bf7bf2b143f1bc1d'));
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable();
	}
	else if (window.web3) {
		window.web3 = new Web3(window.web3.currentProvider);
	}
	else {
		console.log('no web3');
	}
}

/**
 * Gets default ethere address of account 
 * Compatible with:
 *	- 1.0
 * - 0.2.x
 */
function getDefaultAccount(){
	return new Promise((resolve,reject)=>{
		window.web3.eth.getAccounts((err, acc)=>{
			if(err) reject(err);
			else resolve(acc[0]);
		});
	})
}


export const WEB3_V1 = {
	connectWeb3 : connectWeb3,
	getDefaultAccount : getDefaultAccount,
	getContract: function(abi, address){
		return new window.web3.eth.Contract(abi, address);
	},
	getBlock: function(){
		return window.web3.eth.getBlockNumber();
	},
	getBlockOf: function(blockNumber) {
		return window.web3.eth.getBlock(blockNumber);
	}
}

export const WEB3_V0xx = {
	connectWeb3 : connectWeb3,
	getDefaultAccount : getDefaultAccount,
}


