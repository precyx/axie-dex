import React, { Component } from 'react';
import styled from 'styled-components';
import ReactSVG from 'react-svg';
//custom
import axieClassColors from '../data/axie-class-colors';

//CSS
const StyleAxieTitle = styled.div`
	display:flex;
	align-items:center;
	text-align:right;

	.name { font-size: 12px; margin-right:5px; color: #949494;}
	.id {color: white; border-radius:3px; font-style: italic; font-size: 12px; color: ${props => axieClassColors[props.axieClass]}; }
	.icon {width:16px; height:16px; margin-right:5px;}
	svg {width:16px;}
`;

class AxieTitle extends Component {
	render() {
		return (
			<StyleAxieTitle className="axieTitle" axieClass={this.props.class}>
        <div className="name">{this.props.name} </div>
				<ReactSVG className="icon" svgStyle={{fill: axieClassColors[this.props.class]}} src={"./img/icons/classes/" + this.props.class + "_24px.svg"} />
				<div className="id">#{this.props.id}</div>
        <div style={{display:"none"}} className="class">{this.props.class}</div>
			</StyleAxieTitle>
		);
	}
}


export default AxieTitle;