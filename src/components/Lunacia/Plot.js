import React, { Component } from 'react';
import {StyledPlot} from "./styles/StyledPlot";

function Plot(props){
	const data = props.data;
	const mapSize = props.mapSize; //std: 6020
	const numPlots = props.numPlots; //std: 3011
	const plotSize = mapSize/numPlots;
	const x = data.col * plotSize + mapSize/2 - plotSize/2 +"px";
	const y = data.row * plotSize + mapSize/2 - plotSize/2 +"px";
	const color = props.color;
	return (
		<StyledPlot className="plot" x={x} y={y} plotSize={plotSize} color={color}>
		</StyledPlot>
	);
}

export default Plot;