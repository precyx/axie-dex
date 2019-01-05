import Web3 from "web3";

/*
* Connect to web3 ethereum provider
*/
export function connectWeb3(){
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
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
 */
export function getDefaultAccount(){
	return new Promise((resolve,reject)=>{
		window.web3.eth.getAccounts((err, acc)=>{
			if(err) reject(err);
			else resolve(acc[0]);
		});
	})
}