import React, { Component } from 'react';
import styled from 'styled-components';

//CSS
const AxieMovesStyled = styled.div`
	font-size:12px;
	color: #4a4a4a;
	width:200px;

	.moves {width:100%;}
	.move {margin-bottom:5px; }
	.move .name {opacity:0.7;}
	.move > td { padding: 0 8px; padding-bottom:5px;}
`;

/**
 * Displays Axie Moves with attack, defence, accuracy
 * @example <AxieMoves parts={parts} />
 * @class AxieMoves
 * @extends {Component}
 */
class AxieMoves extends Component {
	constructor(props){
		super(props);
		this.state = {
			battlePartTypes: ["mouth", "back", "horn", "tail"],
			battleParts: null
		}
	}

	componentDidMount() {
		this.setBattleParts();
	}

	setBattleParts(){
		var battleParts = [];
		this.props.parts.forEach(part => {
			if(this.state.battlePartTypes.includes(part.type)) battleParts.push(part);
		});
		this.setState({battleParts:battleParts})
	}

	render() {
		var moves = "";
		if(this.state.battleParts) {
			moves = this.state.battleParts.map((part)=>
				<tr key={part.id} className="move">
					<td className="name">{part.moves[0].name}</td>
					<td className="atk">{part.moves[0].attack}</td>
					<td className="def">{part.moves[0].defense}</td>
					<td className="acc">{part.moves[0].accuracy}</td>
				</tr>
			);	
		}
		
		return (
			<AxieMovesStyled>
				<table className="moves">
					{moves}
				</table>
			</AxieMovesStyled>
		);
	}
}

function Move(){
	return (
		<div className="move"></div>
	);
}

export default AxieMoves;