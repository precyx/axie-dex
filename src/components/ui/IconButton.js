import React from 'react';
import styled, { css } from "styled-components";
import ReactSVG from 'react-svg';

//CSS
const StyledIconButton = styled.div`
	background: white;
	display:flex;
	align-items: center;
	justify-content: center;
	width:35px; 
	height:35px;
	border-radius:50%;
	cursor:pointer;
	:hover {background:#eaeaea;}
	/* svg */
	>div {display:flex;}
	>div >div {display:flex;}
	svg {fill:grey; width:18px; height:18px;}
	/* color */
	${({ color }) => color && css`
		svg {fill: ${props => props.color}; }
		&.theme_dark {background: ${props => props.color}; }
		&.theme_dark svg { fill:white; }
	`}
	/* size => medium */
	${({ size }) => size == "medium" && css`
		width: 45px;
		height: 45px;
		svg { width: 24px; height:24px; }
	`}
	/* size => big */
		${({ size }) => size == "big" && css`
		width: 50px;
		height: 50px;
		svg { width: 30px; height:30px; }
	`}
`;

class IconButton extends React.PureComponent {
	render() {
		return (
			<StyledIconButton 
				color={this.props.color} 
				theme={this.props.theme} 
				size={this.props.size} 
				className={"iconButton" + " " + this.props.className + " theme_" + this.props.theme} 
				onClick={this.props.onClick}
			>
				<ReactSVG src={this.props.icon}/>
			</StyledIconButton>
		);
	}
}

export default IconButton;