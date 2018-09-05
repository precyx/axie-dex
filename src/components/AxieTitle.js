import React, { Component } from 'react';
import styled from 'styled-components';


const StyleAxieTitle = styled.div`
	display:block;
	font-size:14px;
	margin-bottom:10px;

	.id {font-size: 10px; color: #a2a2a2;}
	.name {color: grey; font-style: italic; font-size: 12px;}
`;

class AxieTitle extends Component {
	render() {
		return (
			<StyleAxieTitle className="axieTitle">
				<div className="id">#{this.props.id}</div>
        <div className="name">{this.props.name}</div>
        <div style={{display:"none"}} className="class">{this.props.class}</div>
			</StyleAxieTitle>
		);
	}
}


export default AxieTitle;