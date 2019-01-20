import React from 'react';
import styled from 'styled-components';
//custom
import {axieStats} from '../../data/axie-stats';
import {axieStatRatingColors} from '../../data/axie-stats';

const StyledAxieStats  = styled.div`
	width:160px;
	font-size: 12px;
	color: #4a4a4a;

	.key {text-transform: capitalize; opacity: 0.7;}
	.stat {vertical-align: middle;}
	.val {padding-left:15px;}
	.stat_container { padding-left:15px; width:100%;}
	.stat_val {background:#e4e4e4; height:100%; height:8px; border-radius:20px;}
	td {padding-bottom:5px;}
`;

/**
 *
 * @example <AxieStats stats={stats}/>
 * @class AxieStats
 * @extends {Component}
 */
class AxieStats extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			calcedStats: null
		}
	}
	componentWillMount() {
		this.calcStats();
	}
	calcStats(){
		var calcedStats = [];
		for(let key in this.props.stats) {
			calcedStats.push({
				"key": key,
				"val": this.props.stats[key],
				"percentage" : Math.round(this.props.stats[key] / axieStats[key].max * 100),
				"color" : axieStatRatingColors[this.getRatingByStat(this.props.stats[key] / axieStats[key].max)]
			})
		}
		this.setState({calcedStats : calcedStats});
	}

	getRatingByStat(p){
		if(p >= 0.95) 			return "perfect";
		else if(p >= 0.8) 	return "good";
		else if(p >= 0.6) 	return "average";
		else if(p >= 0.4) 	return "bad";
		else if(p < 0.4) 		return "terrible";
	}
	
	render() {
		var stats = this.state.calcedStats.map((stat) => 
			<tr key={stat.key} className="stat"> 
				<td className="key">{stat.key}</td>
				<td className="val">{stat.val}</td>
				<td className="stat_container">
					<div className="stat_val" style={{width: stat.percentage + "%", background: stat.color}}></div>
				</td>
			</tr>
		);
		return (
			<StyledAxieStats>
				<table>
					<tbody>
						{stats}
					</tbody>
				</table>
			</StyledAxieStats>
		);
	}
}

export default AxieStats;