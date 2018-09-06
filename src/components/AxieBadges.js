import React, { Component } from 'react';
import styled from 'styled-components';
//own
import {getBattleParts} from '../data/axie-data-transform';

//CSS
const StyledAxieBadges = styled.div`
	font-size: 12px;
	.atk {color:#d66666;}
	.def {color:#1ba91b;}
	.acc {color:#5296b1;}
	.sum {color:#f392b9;}
`;

/**
 * Renders Axie Badges for different battle types like: Tank, Off-Tank, Sniper, Attacker 
 * @example <AxieBadges axieData={axieData} />
 * @class AxieBadges
 * @extends {Component}
 */
class AxieBadges extends Component {

	constructor(props){
		super(props);
		this.state = {
			badges: null,
			battleParts: null
		};
	}

	componentDidMount() {
		this.calcAdditionalStats();
		this.calcBadges();	
	}

	round(number, places){
		var a = Math.pow(10, places);
		//console.log(a);
		return Math.round(number * a) / a;
	}

	calcAdditionalStats(){
		var battleParts = getBattleParts(this.props.axieData.parts);
		var totals = {atk:0, def:0, acc:0, sum:0};
		battleParts.forEach((part)=>{
			var move0 = part.moves[0];
			totals.atk 	+= move0.attack;
			totals.def 	+= move0.defense;
			totals.acc  += move0.accuracy;
			totals.sum  += this.round(move0.attack * move0.defense/100 + move0.defense, 1)
			//console.log("ta",totals);
		});
		this.setState({
			battleParts : battleParts,
			totals : totals
		});
	}
	calcBadges(){

	}

	render() {
		var totals = "";
		if(this.state.totals){
			totals = (
				<div className="totals">
					<div className="atk">{this.state.totals.atk} / {this.state.totals.atk / 4}</div>
					<div className="def">{this.state.totals.def} / {this.state.totals.def / 4}</div>
					<div className="acc">{this.state.totals.acc} / {this.state.totals.acc / 4}</div>
					<div className="sum">{this.state.totals.sum} / {this.state.totals.sum / 4}</div>
				</div>
			)
		}
		return (
			<StyledAxieBadges>
				{totals}
			</StyledAxieBadges>
		);
	}
}

export default AxieBadges;