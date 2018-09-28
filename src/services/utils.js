export function hexToRGB(hex, alpha) {
	var r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);

	if (alpha) {
			return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
	} else {
			return "rgb(" + r + ", " + g + ", " + b + ")";
	}
}

export function weiToEth(wei){
	return wei/1000000000000000000;
}


export function nearest_sq(n){
	return Math.round(Math.sqrt(n));
}