import React from 'react';
import styled, { css } from 'styled-components';
//import ReactTooltip from 'react-tooltip';
//custom
import axieClassColors from '../../data/axie-class-colors';
//import AxieEffect from "./AxieEffect";

//CSS
const StyledAxiePartClasses = styled.div`
	/* component */
	display:flex;
	margin-bottom:5px;
	/* partDot */
	.partDot {width: 8px; height:8px; border-radius:50%; background:#dadada; margin-right:2px; margin-bottom:2px;}
	.fx_circ {width:5px; height:5px; margin-left:3px; margin-top:3px; background:white; border-radius:50%;}
	.myAxieEffect {width:200px; background:white; box-shadow: 0 2px 2px rgba(0,0,0,0.3); background:white; border-radius:3px; padding:10px;}
	.tooltip {background:none; padding:0;}
	/* conditional style */
	${({ x }) => x && css``}
`;

/**
 * AxiePartClasses 
 * @example <AxiePartClasses parts={parts}/>
 */
class AxiePartClasses extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			uid: Math.round(Math.random()*999999999),
		}
	}
	
	render() {
		var parts = "";
		if(this.props.parts &&
			 this.props.parts.length){
			console.log(this.props.parts);
			parts = this.props.parts.map((part) =>
				<div 
				className="partDot" 
				style={{backgroundColor: axieClassColors[part.class] }}
				data-tip data-for={"axiePartClass_" + this.state.uid + part.id}
				>

				</div>
			);
		}
		return (
			<StyledAxiePartClasses>
				{parts}
			</StyledAxiePartClasses>
		);
	}
}

export default AxiePartClasses;