import React, { Component } from 'react';
import styled from 'styled-components';


const StyleAxieTitle = styled.div`
	display:block;
	margin-bottom:10px;
	text-align:right;

	.id {font-size: 10px; margin-left:5px; color: #d8d8d8;}
	.name {color: grey; font-style: italic; font-size: 16px;}
`;

class AxieTitle extends Component {
	render() {
		return (
			<StyleAxieTitle className="axieTitle">
        <div className="name">{this.props.name} <span className="id">#{this.props.id}</span> </div>
				
        <div style={{display:"none"}} className="class">{this.props.class}</div>
			</StyleAxieTitle>
		);
	}
}


export default AxieTitle;