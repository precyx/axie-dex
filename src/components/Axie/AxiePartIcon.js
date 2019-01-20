import React from 'react';
import ReactSVG from 'react-svg';
import styled, { css } from 'styled-components';
//custom
import axieClassColors from '../../data/axie-class-colors';

//CSS
const StyledAxiePartIcon = styled.div`
	width: 26px;
	height: 26px;
	background: #e4e4e4;
	background: ${props => props.color};
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;

	.icon {width:20px; height:20px;}
	svg { width:20px; height:auto; fill:white;}

	/* Light Theme */
	${({ theme }) => theme === "light" && css`
		background: white;
		svg {fill: ${props => props.color}}
  `}
`;

/**
 * AxiePartIcon - displays an part icon with a class color	
 * @example <AxiePartIcon type='ears' axieClass='beast'/>
 * @class AxiePartIcon
 * @extends {Component}
 */
class AxiePartIcon extends React.PureComponent {
	render() {
		return (
			<StyledAxiePartIcon 
				color={axieClassColors[this.props.axieClass]} 
				theme={this.props.theme} 
				>
				<ReactSVG 
					className="icon" 
					src={"./img/icons/parts/"+ this.props.type + "_24px.svg"}
				/>
			</StyledAxiePartIcon>
		);
	}
}

export default AxiePartIcon;