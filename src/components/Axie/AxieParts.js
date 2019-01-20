import React from 'react';
import ReactSVG from 'react-svg';
import styled from 'styled-components';
//custom
import AxiePartIcon from './AxiePartIcon';
import axieClassColors from '../../data/axie-class-colors';

//CSS
const StyledParts = styled.div`
	font-size: 12px;
	color: #4a4a4a;
	width:200px;

	.part {display:flex; align-items: center; margin-bottom:5px;}
	.part .name {margin-left:5px;}
	.partName {display:flex; align-items:center;}
	.partName.mystic { color: #54b0e6;}
	.partName svg { display:none; width: 12px; fill: #ff4040; margin-left:10px;}
`;


/**
 * Displays a list of parts of a specific Axies
 * @example <AxieParts parts={parts} /> 
 * @class AxieParts
 * @extends {Component}
 */
class AxieParts extends React.PureComponent {
	constructor(props) {
		super(props);
		console.log("pp", this.props.parts)
		this.state = {
		}
	}
	render(){
		var parts = "";
		// solve array
		if(Array.isArray(this.props.parts)){
			parts = this.props.parts.map( (part) => 
				<div key={part.id} className="part">
					<AxiePartIcon className="axiePartIcon" type={part.type} axieClass={part.class} theme="dark"/>
					<PartName part={part}/>
				</div>
			);
		}
		// solve object
		else if(this.props.parts !== null && typeof this.props.parts === 'object'){
			//var partTypes = ["back", "ears", "eyes", "horn", "mouth", "tail"];
			parts = Object.keys(this.props.parts).map((partKey) => (
				<div key={partKey} className="part">
					<AxiePartIcon className="axiePartIcon" type={this.props.parts[partKey].type} axieClass={this.props.parts[partKey].class} theme="dark"/>
					<PartName part={this.props.parts[partKey]} />
				</div>
			));
		}
		return (
			<StyledParts className="parts">
				{parts}
			</StyledParts>
		);
	}
}

const PartName = (props) => {
	const name = <div className="name">{props.part.name}</div>
	const mystic_icon = props.part.mystic ? <ReactSVG svgStyle={{fill:axieClassColors[props.part.class]}} src={"./img/icons/star.svg"} /> : ""; 
	return (
		<div className={props.part.mystic ? "partName mystic" : "partName"}>
			{name}{mystic_icon}
		</div>
	);
}

export default AxieParts;