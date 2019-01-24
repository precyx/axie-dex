import axios from "axios";

export const LAND_DATA = {
	





	getLandOfAddress(_address:string) {
		const url:string = `https://axieinfinity.com/land-api/profile/${_address}/land`;
		return axios.get(url).then(data => {return data.data});
	}
}