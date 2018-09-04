import React, { Component } from 'react';
import styled from 'styled-components';
//custom
import AxiePartIcon from './AxiePartIcon';

//CSS
const StyledParts = styled.div`
	font-size: 12px;
	color: #4a4a4a;
	width:200px;

	.part {display:flex; align-items: center; margin-bottom:5px;}
	.part .name {margin-left:5px;}
`;

/**
 * Displays a list of parts of a specific Axies
 * @example <AxieParts parts={parts} /> 
 * @class AxieParts
 * @extends {Component}
 */
class AxieParts extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	render(){
		var parts = this.props.parts.map( (part) => 
			<div key={part.id} className="part">
				<AxiePartIcon className="axiePartIcon" type={part.type} axieClass={part.class} />
				<div className="name">{part.name}</div>
			</div>
		);
		return (
			<StyledParts className="parts">
				{parts}

				
			</StyledParts>
		);
	}
}

export default AxieParts;