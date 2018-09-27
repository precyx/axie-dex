import React, { Component } from 'react';
import styled from "styled-components";
// own
import AxieBadges from "./AxieBadges";

// CSS
const StyledAxieTeam = styled.div`
	/* component */
	display:flex; 
	align-items: center;
	justify-content: space-between;
	width: auto;
	padding: 10px 15px;
	margin:10px;
	border: 2px solid white;
	border-radius:8px;
	background:white;
	:hover {}
	/* team */
	.team_title {font-size: 15px; color: #a146ef; font-weight: bold;}
	/* teammember */
	.members {display:flex; margin-top:10px;}
	.teammember .title {font-size:12px; color:grey; margin-bottom:5px;}
	.teammember .img {width:100px; height:auto; margin-right:0; margin-top:10px;}
	.teammember .img_box {width:100px; height:85px; position:relative;}
	.teammember .axie_badges {position: absolute; top:0; left:0;}
	.teammember .removeAxieButton {display:none; position: absolute; bottom:0; left:0; user-select:none; color:grey; width:25px; height:25px; cursor:pointer; font-size: 12px; align-items: center; justify-content: center; border-radius: 50%; }
	.teammember:hover .removeAxieButton {display:flex;}
	/* name */
	.name {font-size: 12px; color: grey;}
	/* delete button */
	.deleteButton {margin-left: 10px; user-select:none; color:grey; width:25px; height:25px; display:flex; cursor:pointer; font-size: 12px; align-items: center; justify-content: center; border-radius: 50%; }
	.deleteButton:hover {color:#383838;}
`;

class AxieTeam extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
		}
	}

	componentDidMount() {

	}

	/*componentWillReceiveProps({team}) {
		this.setState({...this.state, team.members});
	}*/

	render() {
		// members
		var members = "";
		//console.log("m", this.props.team);
		if(this.props.team.members.length){
			members = this.props.team.members.map((member)=>(
					<div key={member.axie.id} className="teammember">
						<div className="title">#{member.axie.id}</div>
						<div className="img_box">
							<img className="img" src={member.image} />
							<div className="axie_badges">
								<AxieBadges size="tiny" axieData={member.axie.axieData}/>
							</div>
							<div onClick={() => { this.props.removeAxieFromTeam(this.props.team, member) }} className="removeAxieButton">X</div>
						</div>
					</div>
			));
		}

		// view
		return (
			<StyledAxieTeam className="team" onClick={this.props.onClick}>
				<div className="left">
					<p className="team_title">{this.state.name}</p>
					{members ? <div className="members">{members}</div> : ""}
				</div>
				<div className="right">
					<div className="deleteButton" onClick={this.props.handleDelete}>X</div>
				</div>
			</StyledAxieTeam>
		);
	}
}
export default AxieTeam;