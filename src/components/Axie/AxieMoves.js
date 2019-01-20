import React from 'react';
import ReactSVG from 'react-svg';
import styled from 'styled-components';
//own
import {getBattleParts} from '../../services/axie-part-and-stats-transform';
import axieClassColors from '../../data/axie-class-colors';

//CSS
const AxieMovesStyled = styled.div`
	font-size:12px;
	color: #4a4a4a;
	width:280px;

	.moves {width:100%;}
	.move {margin-bottom:5px; vertical-align:middle;}
	.move .name {opacity:0.7;}
	.move > td { padding: 0 8px; padding-bottom:5px;}
	.move > td.image {padding:0; padding-bottom:5px;}
	.move .atk {color:#d66666;}
	.move .def {color:#1ba91b;}
	.move .acc {color:#b865d2;}
	.move .sum {color:#f392b9;}

	.moveTypeIcon {width:16px; height:16px; border-radius:3px; display:flex; align-items: center; justify-content:center;}
	.moveTypeIcon svg,
	.moveTypeIcon .icon {width:16px; height:16px;}
	.moveTypeIcon svg {fill:white;}
`;

/**
 * Displays Axie Moves with attack, defence, accuracy
 * @example <AxieMoves parts={parts} />
 * @class AxieMoves
 */
class AxieMoves extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			battleParts: null
		}
	}

	componentDidMount() {
		this.setBattleParts();
	}

	setBattleParts(){
		var battleParts = getBattleParts(this.props.parts);
		this.setState({battleParts:battleParts}, this.calcTotalPartValue);
	}

	calcTotalPartValue(){

	}

	round(number, places){
		var a = Math.pow(10, places);
		//console.log(a);
		return Math.round(number * a) / a;
	}

	render() {
	var moves = (<tr><td></td></tr>);
		if(this.state.battleParts) {
			moves = this.state.battleParts.map((part)=>
				<tr key={part.id} className="move">
					<td className="image"><MoveTypeIcon moveClass={part.class} moveType={part.moves[0].type}/></td>
					<td className="name"> 
						<div className="val">{part.moves[0].name}</div>
					</td>
					<td className="atk">{part.moves[0].attack}</td>
					<td className="def">{part.moves[0].defense}</td>
					<td className="acc">{part.moves[0].accuracy}</td>
					<td style={{display:"none"}} className="sum">
						{+(part.moves[0].attack*part.moves[0].accuracy/100+part.moves[0].defense).toFixed(2)} 
					</td>
				</tr>
			)
		}
		
		return (
			<AxieMovesStyled>
				<table className="moves">
					<tbody>{moves}</tbody>
				</table>
			</AxieMovesStyled>
		);
	}
}

function MoveTypeIcon (props){
	return (
		<div className="moveTypeIcon" style={{background: axieClassColors[props.moveClass]}}>
			<div className="icon">
				<ReactSVG src={"./img/icons/moveTypes/" + props.moveType + ".svg"}/>
			</div>
		</div>
	);
}

/*function Move(){
	return (
		<div className="move"></div>
	);
}*/

export default AxieMoves;