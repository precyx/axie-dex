import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import styled from 'styled-components';
//custom
import axieClassColors from '../data/axie-class-colors';

//CSS
const StyledAxiePartIcon = styled.div`
	width: 26px;
	height: 26px;
	background: ${props => axieClassColors[props.axieClass]};
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;

	.icon {width:20px; height:20px;}
`;

/**
 * AxiePartIcon - displays an part icon with a class color	
 * @example <AxiePartIcon type='ears' axieClass='beast'/>
 * @class AxiePartIcon
 * @extends {Component}
 */
class AxiePartIcon extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<StyledAxiePartIcon axieClass={this.props.axieClass}>
				<ReactSVG 
					className="icon" 
					src={"./img/icons/parts/"+ this.props.type + "_24px.svg"} 
					svgStyle={{ width: 20, fill: "white"}} 
				/>
			</StyledAxiePartIcon>
		);
	}
}

export default AxiePartIcon;