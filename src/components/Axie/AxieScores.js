import React from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';
//own
import {getBattleParts, getTotalStats, rateStats} from '../../services/axie-part-and-stats-transform';
//
import {minMaxPartStatsByType} from '../../data/axie-stats';
import axieClassColors from '../../data/axie-class-colors';
import {axieStats} from '../../data/axie-stats';
import {hexToRGB} from '../../services/utils';
import AxieStatBar from './AxieStatBar';

//CSS
const StyledAxieScores = styled.div`
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
`;

/**
 * Renders Axie Scores for (atk, def, spd, mor...)
 * @example <AxieScores axieData={axieData} />
 * @class AxieScores
 * @extends {Component}
 */
class AxieScores extends React.PureComponent {
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

		return (
			<StyledAxieScores color={axieClassColors[this.props.axieData.class]}>
				<canvas style={{display:"block"}} id={"radar_" + this.props.axieData.id}></canvas>
				{ExtendedStats}
			</StyledAxieScores>
		);
	}

	componentDidMount() {
		this.setTotalsAndRatings();
	}
	setTotalsAndRatings(){
		var battleParts = getBattleParts(this.props.axieData.parts);
		var totals = getTotalStats(battleParts);
		var scores = rateStats(this.props.axieData, axieStats, battleParts, minMaxPartStatsByType);
		this.setState({
			battleParts : battleParts,
			totals : totals,
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
					labels : ["Ath", "Tnk", "Acc", "Spd", "Mor"],
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
		this.setState({ratingDone:true});
	}
}

export default AxieScores;
