import React, { Component } from 'react';

function Plot(props){
	const data = props.data;
	const mapSize = props.mapSize; //std: 6020
	const numPlots = props.numPlots; //std: 3011
	const plotSize = mapSize/numPlots;
	const x = data.col * plotSize + mapSize/2 - plotSize/2 +"px";
	const y = data.row * plotSize + mapSize/2 - plotSize/2 +"px";
	const color = props.color;
	const styles = {
		position: "absolute",
		left: x,
		top: y,
		width: plotSize + "px",
		height: plotSize + "px",
		backgroundColor: color,
	}
	return (
		<div className="plot" style={styles}>
		</div>
	);
}

export default Plot;