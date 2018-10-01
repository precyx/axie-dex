import React from 'react';
import styled, { css } from "styled-components";
// axie
import AxiePartIcon from './AxiePartIcon';

//CSS
const StyledAxiePartList = styled.div`
	/* component */
	width:250px; 
	font-size:12px; 
	background: white; 
	z-index: 11; 
	padding: 20px 0;
	box-shadow: 0 2px 11px #0000007a; 
	border-radius: 3px; 
	height:350px; 
	max-height: calc(100vh - 200px); 
	overflow-y: scroll;
	/* part */
	.part {display:flex; width:100%; justify-content:space-between; align-items: center;  padding: 3px 20px;}
	.part:hover {background:#efefef; }
	.part .count{margin-left:0; }
	.part .name{width:100px; }
	/* conditional styles */
	${({ x }) => x && css``}
`;

class AxiePartList extends React.PureComponent {
	render() {
		var allParts = "";
		if(this.props.parts &&
			 this.props.parts.length){
			 var parts = this.props.parts.map((part)=> 
				<div className="part" key={part.partData.id}>
					<AxiePartIcon type={part.partData.type} axieClass={part.partData.class}/>
					<div className="name">{part.partData.name}</div> 
					<div className="count">{part.count}</div>
				</div>
			 );
			 allParts = (
				<div className="allParts">
					{parts}
				</div>
			 );
		}

		return (
			<StyledAxiePartList className={"axiePartList" + " " + this.props.className}>
				{allParts}
			</StyledAxiePartList>
		);
	}
}

export default AxiePartList;