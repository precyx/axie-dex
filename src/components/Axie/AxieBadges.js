import React, { Component } from 'react';
import styled, { css } from "styled-components";
import ReactSVG from 'react-svg';
import ReactTooltip from 'react-tooltip';
//own
import {getBattleParts, getTotalStats, rateStats} from '../../services/axie-part-and-stats-transform';
//
import {minMaxPartStatsByType} from '../../data/axie-stats';
import {axieStats} from '../../data/axie-stats';
import axieClassColors from '../../data/axie-class-colors';

//CSS
const StyledAxieBadges = styled.div`
	font-size: 12px;
	.badges {margin-bottom:10px;}
	.badge { display: inline-flex; margin-right:5px; flex-flow: column; text-align: center;}
	.badge .bg {width:35px; height:35px; background:#dedede; border-radius:50%; display:flex; align-items:center; justify-content:center;}
	.badge .bg { background: ${props => props.color}  }
	.badge svg {width:25px; fill:black; opacity:0.6;}
	.badge .desc { font-weight: bold; font-size:11px; width: 18px; height: 18px; background: rgba(0, 0, 0, 0.6); border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin-top: -16px; margin-left: 24px;}

		/* size */
		${({ size }) => size === "small" && css`
			.badge .bg {width:30px; height:30px;}
			.badge svg {width:20px;}
			.badge .desc {width:16px; height:16px; margin-top: -14px; margin-left: 19px;}
  	`}
		${({ size }) => size === "tiny" && css`
			.badge .bg {width:25px; height:25px;}
			.badge svg {width:17px;}
			.badge .desc {width:14px; height:14px; margin-top: -12px; margin-left: 17px;}
  	`}
`;

/**
 * Renders Axie Badges for different battle types like: Tank, Off-Tank, Sniper, Attacker 
 * @example <AxieBadges axieData={axieData} size={"tiny" | "small" | "normal"}/>
 * @class AxieBadges
 * @extends {Component}
 */
class AxieBadges extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			battleParts: null
		};
	}
	render() {
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
				{(this.state.athLevel && this.state.athLevel > 0) ?
					<Badge icon={"./img/icons/stats/attack.svg"} level={this.state.athLevel} id={'attackLevelTooltip_'+this.props.axieData.id} tooltipText={atkTooltipText}/>
				:""} 
			</div>
		) : "";

		return (
			<StyledAxieBadges size={this.props.size} color={axieClassColors[this.props.axieData.class] || axieClassColors[this.props.axieData.clazz]}>
				{Badges}
			</StyledAxieBadges>
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
		}, this.calcBadges);
	}

	calcBadges(){
		//rate tankiness (def+hp)
		var tankLevel = 0;
		if(this.state.tnk >= 6.5) tankLevel = 1;
		if(this.state.tnk >= 7.5) tankLevel = 2;
		if(this.state.tnk >= 8.5) tankLevel = 3;
		if(this.state.tnk >= 9.5) tankLevel = 4;
		// rate attack true hit (ath)
		var athLevel = 0;
		if(this.state.ath >= 6.5) 	athLevel = 1;
		if(this.state.ath >= 7.5) 	athLevel = 2;
		if(this.state.ath >= 8.5) 	athLevel = 3;
		if(this.state.ath >= 9.5) 	athLevel = 4;
		//
		this.setState({
			tankLevel: tankLevel,
			athLevel: athLevel,
			ratingDone: true
		});
		//console.log("automated", tkLv);
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