import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from "styled-components";
// own
import AxieTeam from "./AxieTeam";
import {AXIE_DATA_V1} from "../services/axie-data-service";
// CSS
const StyledAxieTeams = styled.div`
	padding:25px 0;
	width:550px;
	height:100%;
	height: calc(100vh - 250px);
	background: white;
	/* containers */
	.gapContainer {padding:0 25px; display:flex; justify-content:center;}
	/* teams */
	.teams { height: calc(100% - 120px); overflow-y: scroll; border-top: 1px solid #e4e4e4; background:white;}
	.team { border-bottom: 1px solid #e6e6e6; border-radius: 0; padding-bottom: 12px; margin: 0;}
	/* new team button */
	.newTeamBtn {margin-top:15px; user-select:none; width:180px; background:#a146ef; color: white; font-weight:bold; padding:15px 5px; text-align:center; border-radius:8px; cursor:pointer;}
	.newTeamBtn:hover {background:#ca62ff;}

		/* focus state */
		${({ selectedAxie }) => selectedAxie && css`
			width: 1200px;
			border: none;
			background: #f1f1f1;
			.teams {background: #f1f1f1; border:none;}
			.teams .team {cursor: pointer; padding: 15px 15px; border:2px solid white; border-radius:8px; margin:10px;}
			.teams .team:hover {border:2px solid #a146ef;}
			.teams .team .deleteButton {display:none;}
			.teams .team .teammember .removeAxieButton {display:none;}
  `}
`;

/**
 * Renders a list of {axie teams}
 * @class AxieTeams
 * @example <AxieTeams className="axieTeams" selectedAxie={this.state.selectedAxie}/>
 * @extends {Component}
 */
class AxieTeams extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teams: [],
			counter: 0,
		}
	}

	componentDidMount() {
		this.fillStandardTeams();
	}

	fillStandardTeams(){
		var teams = [];
		for(let i = 0; i < 3; i++){
			var t = new Team();
			t.name = "#"+(i+1) + " New Team";
			t.id = (i+1);
			teams.push(t);
		}
		this.setState({
			teams: teams,
			counter: 3,
		})
	}

	createNewTeam = () => {
		var newTeam = new Team();
		newTeam.id = (this.state.counter + 1);
		newTeam.name = "#" + newTeam.id + " New Team";
		this.setState((prevState) => ({
			teams: [...prevState.teams, newTeam],
			counter: prevState.counter + 1,
		}));
	}
	handleDelete = (teamToDelete) => {
		var teams = [...this.state.teams];
		this.setState({
			teams: this.state.teams.filter(function(team) { 
				return team !== teamToDelete 
			})
		});
	}
	addNewTeamMember = (teamToUpdate) => {
		if(!this.props.selectedAxie) return;
		// get axie image
		AXIE_DATA_V1.getAxieById(this.props.selectedAxie.id).then((data)=>{
			var axieImage = data.figure.static.idle;
			// update teams
			var newTeams = [...this.state.teams];
			const index = this.state.teams.findIndex(team => team.id === teamToUpdate.id);
			newTeams[index] = teamToUpdate;
			// update members
			var newMembers = [...teamToUpdate.members, new TeamMember(this.props.selectedAxie, axieImage)];
			newTeams[index].members = newMembers;
			this.setState({
				teams: newTeams,
			}, () => {
				console.log("t", this.state.teams);
				// trigger event
				this.props.onAxieDeposit(this.props.selectedAxie);
			});
		});
	}

	removeAxieFromTeam = (teamToUpdate, teamMemberToDelete) => {
		// delete member
		var changedTeam = Object.assign({}, teamToUpdate);
		changedTeam.members = changedTeam.members.filter((member) => member.axie.id !== teamMemberToDelete.axie.id);
		// update teams
		var newTeams = [...this.state.teams];
		const index = this.state.teams.findIndex(team => team.id === teamToUpdate.id);
		newTeams[index] = changedTeam;
		//
		this.setState({
			teams: newTeams,
		});
		console.log("°2",changedTeam);
		console.log("t", teamToUpdate);
		console.log("m", teamMemberToDelete);
	}

	render() {
		var teams = "";
		if(this.state.teams.length){
			teams = this.state.teams.map((team, i)=>(
				<AxieTeam 
					className="team" 
					key={i} 
					name={team.name}
					team={team}
					onClick={() => this.addNewTeamMember(team)} 
					handleDelete={() => this.handleDelete(team)}
					removeAxieFromTeam={this.removeAxieFromTeam}
					/>
			))
		}

		return (
			<StyledAxieTeams className="axieTeams" selectedAxie={this.props.selectedAxie}>
				<div className="gapContainer">
					<h2>Axie Teams</h2>
				</div>
				<div className="teams">
					{teams}
				</div>
				<div className="gapContainer">
					<div className="newTeamBtn" onClick={this.createNewTeam}>New Team</div>
				</div>
			</StyledAxieTeams>
		);
	}
}

export default AxieTeams;


class TeamMember {
	axie = null;
	image = null;
	constructor(axie, image){
		this.axie = axie;
		this.image = image;
	}
}

class Team {
	id = null;
	name = "";
	members = [];
	constructor(){
	}
	addMember(member){
		this.members.push(member);
	}
}