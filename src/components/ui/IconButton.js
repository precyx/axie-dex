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
	svg {fill:grey; width:18px;}
	/* focus state */
	${({ color }) => color && css`
		svg {fill: ${props => props.color}; }
	`}
`;

class IconButton extends React.PureComponent {
	render() {
		return (
			<StyledIconButton color={this.props.color} className={"iconButton" + " " + this.props.className} onClick={this.props.onClick}>
				<ReactSVG src={this.props.icon}/>
			</StyledIconButton>
		);
	}
}

export default IconButton;