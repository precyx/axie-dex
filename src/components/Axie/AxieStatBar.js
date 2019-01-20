import React from 'react';
import styled from 'styled-components';
// own
import {getRatingByStatPercentage} from "../../data/axie-stats";
import {axieStatRatingColors} from "../../data/axie-stats";

const StyledAxieStatBar = styled.div`
	width:100%;
  display:flex;
	.blob {width:8px; height:8px; border-radius:50%; background:grey; margin-left:3px;}
	.container {width:100%; height:10px;}
	.bar {background:grey; height:100%; border-radius:50px;}
`;

class AxieStatBar extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			percentage: this.props.val / 10 *100,
			color: axieStatRatingColors[getRatingByStatPercentage(this.props.val/10)]
		}
	}
	render() {
		/*var numElems = +Math.round(+this.props.val);
		var blobs = [];
		for(var i=0; i<numElems; i++){
			blobs.push(
				<div key={i} className="blob"></div>
			)
		}*/
		return (
			<StyledAxieStatBar color={this.props.color}>
				<div className="container">
					<div className="bar" style={{width: this.state.percentage + "%", background: this.state.color}} ></div>
				</div>
			</StyledAxieStatBar>
		);
	}
}

export default AxieStatBar;