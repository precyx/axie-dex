import axios from 'axios';
import Web3 from "web3";

export const AXIE_DATA_V2 = {

	getAxiesByAddress(address){
			let url = "https://axieinfinity.com/api/v2/addresses/";
			let web3 = new Web3(Web3.givenProvider)
			if(!web3.utils.isAddress(address)) return new Error("invalid Ethereum address");
			url = `${url}${address}/axies`;
			axios.get(url).then(data => {
				console.log("data", data);
			}).catch(error => console.log("err", error));
	}
}