
/**
 * @param {*} hex e.g. #ff00aa
 * @param {*} alpha 0-1
 */
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

/**
 * return random hex e.g. #ff00aa
 */
export function randomHex(){
	return '#' + (function co(lor){   return (lor +=
		[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
		&& (lor.length == 6) ?  lor : co(lor); })('');
}

export function shadeColor2(color, percent) {   
	var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
	return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}