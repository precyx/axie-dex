import React, { Component } from 'react';
import styled from 'styled-components';
//own
import {getBattleParts} from '../data/axie-data-transform';
import {minMaxPartStats} from '../data/axie-stats';
import {axieStats} from '../data/axie-stats';

//CSS
const StyledAxieBadges = styled.div`
	font-size: 12px;
	.atk {color:#d66666;}
	.def,.hp {color:#1ba91b;}
	.acc {color:#5296b1;}
	.sum {color:#f392b9;}
	.spd,.skl,.mor {color:#a57db9;}
	.mor {color:#eab22f;}
	.spd {color:#43a1d0;}
	.acc {color:#b865d2;}

	.stats {}
	.stats div {margin-bottom:5px;}
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
			battleParts: null
		};
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
		var attackScore = "";
		if(this.state.attackScore){
			attackScore = (
				<div>{this.state.attackScore}</div>
			);
		}

		return (
			<StyledAxieBadges>
				<div className="stats">
					{this.state.atk && <div className="atk">Atk {this.state.atk}</div>}
					{this.state.def &&
					this.state.hp  &&	<div className="def">Tank {+((this.state.def+this.state.hp)/2).toFixed(2)}</div>}
					{this.state.acc && <div className="acc">Acc {this.state.acc}</div>}
					{this.state.spd && <div className="spd">Spd {this.state.spd}</div>}
					{this.state.mor && <div className="mor">Mor {this.state.mor}</div>}
				</div>
			</StyledAxieBadges>
		);
	}

	componentDidMount() {
		this.calcTotals();
	}
	calcTotals(){
		var battleParts = getBattleParts(this.props.axieData.parts);
		var totals = {atk:0, def:0, acc:0, sum:0};
		battleParts.forEach((part)=>{
			// calc totals
			var move0 = part.moves[0];
			totals.atk 	+= move0.attack;
			totals.def 	+= move0.defense;
			totals.acc  += move0.accuracy;
			totals.sum  += this.round(move0.attack * move0.defense/100 + move0.defense, 0)
		});
		this.setState({
			battleParts : battleParts,
			totals : totals
		}, this.rateStats);
	}
	rateStats(){
		var scores = {};
		var stats = ["attack", "defense", "accuracy"];
		var stats2 = ["hp", "speed", "skill", "morale"];
		// get scores for stats
		this.state.battleParts.forEach((part)=>{
			stats.forEach(stat=>{
				let val = part.moves[0][stat];
				let max = minMaxPartStats[part.type][stat]["max"];
				let percentage =  val / max;
				scores[stat] = scores[stat] ? scores[stat] : 0; 
				scores[stat] += percentage;
			});
		});
		stats2.forEach(stat=>{
			let val = this.props.axieData.stats[stat];
			let min = axieStats[stat].base;
			let max = axieStats[stat].max;
			let percentage = (val-min) / (max-min);
			scores[stat] = +(percentage*10).toFixed(1);
		});
		// harmonize score to scala 1-10
		stats.forEach(stat=>{
			scores[stat] 	=  +(scores[stat]*10/4).toFixed(1);
		});
		this.setState({
			atk:scores["attack"],
			def:scores["defense"],
			acc:scores["accuracy"],
			hp:scores["hp"],
			spd:scores["speed"],
			mor:scores["morale"],
		  skl:scores["skill"],
		});
	}

	round(number, places){
		var a = Math.pow(10, places);
		return Math.round(number * a) / a;
	}
}

export default AxieBadges;