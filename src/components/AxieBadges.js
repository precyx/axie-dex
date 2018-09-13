import React, { Component } from 'react';
import styled from 'styled-components';
import ReactSVG from 'react-svg';
import Chart from 'chart.js';
import ReactTooltip from 'react-tooltip'
//own
import {getBattleParts} from '../data/axie-data-transform';
import {minMaxPartStatsByType} from '../data/axie-stats';
import axieClassColors from '../data/axie-class-colors';
import {axieStats} from '../data/axie-stats';
import {hexToRGB} from '../data/utils';
import AxieStatBar from '../components/AxieStatBar';

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
	.stats .stat {display:flex; align-items:center; margin-bottom:5px;}
	.stats .stat .label {width:100px;}
	.stats span { font-weight: bold; color: #7d7d7d; margin-left: 5px;}
	.stats .val {width:80px;}
	.stats .container {width:110px;  background: #efefef; border-radius: 50px;}

	.badges {margin-bottom:10px;}
	.badge { display: inline-flex; margin-right:5px; flex-flow: column; text-align: center;}
	.badge .bg {width:35px; height:35px; background:#dedede; border-radius:50%; display:flex; align-items:center; justify-content:center;}
	.badge .bg { background: ${props => props.color}  }
	.badge svg {width:25px; fill:black; opacity:0.6;}
	.badge .desc { font-weight: bold; font-size:11px; width: 18px; height: 18px; background: rgba(0, 0, 0, 0.6); border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin-top: -16px; margin-left: 24px;}
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
		console.log("KJKLJ",this.props.axieData);
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

		var ExtendedStats = this.state.ratingDone ? (
			<div className="stats">
				<div className="stat atk">
					<div className="label">Atk {this.state.atk} </div> <AxieStatBar val={this.state.atk}/> {this.state.totals.atk}
				</div>
				<div className="stat atk">
					<div className="label">Ath {this.state.ath} </div> <AxieStatBar val={this.state.ath}/> {this.state.totals.ath}
				</div>
				<div className="stat def">
					<div className="label">Hp {this.state.hp} </div> <AxieStatBar val={this.state.hp}/>
				</div>
				<div className="stat def">
					<div className="label">Def {this.state.def} </div> <AxieStatBar val={this.state.def}/>
				</div>
				<div className="stat def">
					<div className="label">Tank {this.state.tnk} </div> <AxieStatBar val={this.state.tnk}/>{this.state.totals.def + this.props.axieData.stats.hp}
				</div>
				<div className="stat acc">
					<div className="label">Acc {this.state.acc}</div> <AxieStatBar val={this.state.acc}/>
				</div>
			  <div className="stat spd">
					<div className="label">Spd {this.state.spd}</div> <AxieStatBar val={this.state.spd}/>
				</div>
				<div className="stat mor">
					<div className="label">Mor {this.state.mor}</div> <AxieStatBar val={this.state.mor}/>
				</div>
			</div>
		) : "";


		var HalfComplexStats = this.state.ratingDone ? (
			<div className="stats">
				<div className="stat atk">
					<div className="label">Ath {this.state.ath} </div> <AxieStatBar val={this.state.ath}/> {this.state.totals.ath}
				</div>
				<div className="stat def">
					<div className="label">Tank {this.state.tnk} </div> <AxieStatBar val={this.state.tnk}/>{this.state.totals.def + this.props.axieData.stats.hp}
				</div>
				<div className="stat acc">
					<div className="label">Acc {this.state.acc}</div> <AxieStatBar val={this.state.acc}/>
				</div>
			  <div className="stat spd">
					<div className="label">Spd {this.state.spd}</div> <AxieStatBar val={this.state.spd}/>
				</div>
				<div className="stat mor">
					<div className="label">Mor {this.state.mor}</div> <AxieStatBar val={this.state.mor}/>
				</div>
			</div>
		) : "";

		var Stats2 = this.state.ratingDone ? (
			<div className="stats">
				<div className="stat atk">
					<div className="label">Ath {this.state.ath} <span>(L{this.state.athLevel})</span> </div> <AxieStatBar val={this.state.ath}/> {this.state.totals.ath}
				</div>
				<div className="stat def">
					<div className="label">Tank {this.state.tnk} <span>(L{this.state.tankLevel})</span> </div> <AxieStatBar val={this.state.tnk}/>{this.state.totals.def + this.props.axieData.stats.hp}
				</div>
				<div>{+(this.state.tnk + this.state.ath).toFixed(2)}</div>
			</div>
		) : "";

		var Stats = this.state.ratingDone ? (
			<div className="stats">
				<div className="stat atk">
					<div className="label">Dammage</div>
					<div className="val">{ (this.state.totals.ath / 4).toFixed(1)} </div>
					<AxieStatBar val={this.state.ath}/> 
				</div>
				<div className="stat def">
					<div className="label">Tankiness</div>
					<div className="val">{this.state.totals.def + this.props.axieData.stats.hp}</div>
					<AxieStatBar val={this.state.tnk}/>
				</div>
			</div>
		) : "";

		if(this.state.ratingDone){
			var atkTooltipText = 
			<div>
				{this.state.totals.ath} DPR
			</div>
			var tnkTooltipText = (
				<div>
					{this.state.totals.def + this.props.axieData.stats.hp} TNK
				</div>
			);
		}
		var Badges = this.state.ratingDone ? (
			<div className="badges">
				{(this.state.tankLevel && this.state.tankLevel > 0) ? 
					<Badge icon={"./img/icons/stats/defense.svg"} level={this.state.tankLevel} id={'tankLevelTooltip_'+this.props.axieData.id} tooltipText={tnkTooltipText}/>
				:""} 
				{(this.state.attackLevel && this.state.athLevel > 0) ?
					<Badge icon={"./img/icons/stats/attack.svg"} level={this.state.athLevel} id={'attackLevelTooltip_'+this.props.axieData.id} tooltipText={atkTooltipText}/>
				:""} 
			</div>
		) : "";



		return (
			<StyledAxieBadges color={axieClassColors[this.props.axieData.class]}>
				<canvas style={{display:"none"}} id={"radar_" + this.props.axieData.id}></canvas>
				{Badges}
			</StyledAxieBadges>
		);
	}

	componentDidMount() {
		this.calcTotals();
	}
	calcTotals(){
		var battleParts = getBattleParts(this.props.axieData.parts);
		var totals = {atk:0, def:0, acc:0, ath:0, sum:0};
		battleParts.forEach((part)=>{
			// calc totals
			var move0 = part.moves[0];
			totals.atk 	+= move0.attack;
			totals.def 	+= move0.defense;
			totals.acc  += move0.accuracy;
			totals.ath  += move0.attack * move0.accuracy/100;
			totals.sum  += this.round(move0.attack * move0.defense/100 + move0.defense, 0)
		});
		totals["ath"] = Math.round(totals["ath"]);
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
				let max = minMaxPartStatsByType[part.type][stat]["max"];
				let percentage =  val / max;
				scores[stat] = scores[stat] ? scores[stat] : 0; 
				scores[stat] += percentage;
			});
			// calc attackTrueHit score
			scores["attackTrueHit"] = scores["attackTrueHit"] ? scores["attackTrueHit"] : 0; 
			scores["attackTrueHit"] += part.moves[0]["attack"] * part.moves[0]["accuracy"] /100  / minMaxPartStatsByType[part.type]["attackTrueHit"]["max"];
			// calc def score 2
			scores["defense2"] = scores["defense2"] ? scores["defense2"] : 0; 
			scores["defense2"] += part.moves[0]["defense"];
		});
		// harmonize score to scala 1-10
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
		// harmonize other stats
		scores["attackTrueHit"] = +(scores["attackTrueHit"]*10/4).toFixed(1);
		scores["defense2"] = +(scores["defense2"]/minMaxPartStatsByType["sums"]["defense"]["max"]*10).toFixed(1);
		scores["hp2"] = +(this.props.axieData.stats["hp"] / axieStats["hp"].max*10).toFixed(1);
		//
		this.setState({
			atk:scores["attack"],
			ath:scores["attackTrueHit"],
			def:scores["defense"],
			acc:scores["accuracy"],
			hp:scores["hp2"],
			spd:scores["speed"],
			mor:scores["morale"],
			skl:scores["skill"],
			tnk:+((scores["defense"]+scores["hp2"])/2).toFixed(2),
		}, this.renderChart);
	}

	renderChart(){
		var myRadarChart = new Chart(document.getElementById("radar_"+this.props.axieData.id), {
				type: 'radar',
				data: {
					labels : ["Ath", "Def", "Acc", "Spd", "Mor"],
					datasets : [{
						data: [this.state.ath, this.state.tnk, this.state.spd, this.state.mor, this.state.acc],
						backgroundColor: [
							hexToRGB(axieClassColors[this.props.axieData.class], 0.55),
						],
						borderColor: [
							hexToRGB(axieClassColors[this.props.axieData.class], 0.85),
						],
					}]
				},
				options: {
					scale: {
							ticks: {
									suggestedMin: 0,
									suggestedMax: 10
							}
					},
					legend: {
						display: false
					},
			}
		});
		this.calcBadges();
	}

	calcBadges(){
		//rate tankiness (def+hp)
		var tankLevel = 0;
		if(this.state.tnk >= 6.5) tankLevel = 1;
		if(this.state.tnk >= 7.5) tankLevel = 2;
		if(this.state.tnk >= 8.5) tankLevel = 3;
		if(this.state.tnk >= 9.5) tankLevel = 4;
		// rate attack (atk)
		var attackLevel = 0;
		if(this.state.atk >= 6.5) 	attackLevel = 1;
		if(this.state.atk >= 7.5) 	attackLevel = 2;
		if(this.state.atk >= 8.5) 	attackLevel = 3;
		if(this.state.atk >= 9.5) 	attackLevel = 4;
		// rate attack true hit (ath)
		var athLevel = 0;
		if(this.state.ath >= 6.5) 	athLevel = 1;
		if(this.state.ath >= 7.5) 	athLevel = 2;
		if(this.state.ath >= 8.5) 	athLevel = 3;
		if(this.state.ath >= 9.5) 	athLevel = 4;
		//
		this.setState({
			tankLevel: tankLevel,
			attackLevel: attackLevel,
			athLevel: athLevel,
			ratingDone: true
		});
		//console.log("automated", tkLv);
	}

	positive = function(num) {
		return num < 0 ? 0 : num;
	}
	mapNum (num, in_min, in_max, out_min, out_max) {
		return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}

	round(number, places){
		var a = Math.pow(10, places);
		return Math.round(number * a) / a;
	}
}

export default AxieBadges;

class Badge extends Component {
	render() {
		return (
			<div className="badge">
				<div className="badgeInner" data-tip data-for={this.props.id}>
					<div className="bg">
						<ReactSVG src={this.props.icon} />
					</div>
					<div className="desc">{this.props.level}</div>
				</div>
				<ReactTooltip id={this.props.id} type='dark' effect='solid' place="top">
					{this.props.tooltipText}
				</ReactTooltip>
			</div>
		);
	}
}