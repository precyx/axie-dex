import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from "styled-components";
// own
import AxieTeam from "./AxieTeam";
import {AXIE_DATA_V1} from "../services/axie-data-service";
/* ui */
import IconButton from "./ui/IconButton";

// CSS
const StyledAxieTeams = styled.div`
	padding:0 0;
	width:1000px;
	background: white;
	position:relative; 
	background:white; 
	padding:10px 0;
	padding-top:30px;
	height:50vh; 
	width: calc(30vw);

	&.minimized {width:100px; height:100px; box-shadow:none;}
	&.minimized .newTeamBtn {display:none;}
	/* containers */
	.gapContainer {padding:0 25px; display:flex; justify-content:center;}
	/* teams */
	.teams {height:100%; overflow-y: scroll; }
	.team { border-bottom: 1px solid #e6e6e6; border-radius: 0; padding-bottom: 10px; margin: 0;}
	/* new team button */
	.newTeamBtn {position:absolute; right: 40px; bottom:40px;}
	.buttonContainer {border-top: 1px solid #e4e4e4; padding-bottom:10px;}
	/* resize button */
	.resizeButton { position:absolute; z-index:10; top: 2px; left: 2px;}

	/* selectedAxie */
	${({ selectedAxie }) => selectedAxie && css`
		width: calc(30vw);
		border: none;
		background: #f1f1f1;
		.resizeButton {display:none;}
		.teams {background: #f1f1f1; border:none;}
		.teams .team {cursor: pointer; padding: 15px 15px; border:2px solid white; border-radius:8px; margin:10px;}
		.teams .team:hover {border:2px solid #a146ef;}
		.teams .team .right {display:none;}
		.teams .team .teammember .removeAxieButton {display:none;}
  `}

`;

/**
 * Renders a list of {axie teams}
 * @class AxieTeams
 * @example <AxieTeams className="axieTeams" selectedAxie={this.state.selectedAxie}/>
 * @extends {Component}
 */
class AxieTeams extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			teams: [],
			counter: 0,
			minimized: false,
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
	deleteTeam = (teamToDelete) => {
		var teams = [...this.state.teams];
		this.setState({
			teams: this.state.teams.filter(function(team) { 
				return team !== teamToDelete 
			})
		}, () => {
			this.props.onTeamDelete(teamToDelete);
		});
	}
	addNewTeamMember = (teamToUpdate) => {
		if(!this.props.selectedAxie) return;
		// get axie image
		/*AXIE_DATA_V1.getAxieById(this.props.selectedAxie.id).then((data)=>{
		});*/

		// update teams
		var newTeams = [...this.state.teams];
		const index = this.state.teams.findIndex(team => team.id === teamToUpdate.id);
		newTeams[index] = teamToUpdate;
		// update members
		var newMembers = [...teamToUpdate.members, new TeamMember(this.props.selectedAxie)];
		newTeams[index].members = newMembers;
		this.setState({
			teams: newTeams,
		}, () => {
			// trigger event
			this.props.onAxieDeposit(this.props.selectedAxie);
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
		}, () => {
			this.props.onTeamMemberDelete(teamMemberToDelete, newTeams);
		});
	}

	toggleSize = () => {
		//console.log(this.state.minimized);
		this.setState((prevState)=>({
			minimized: !prevState.minimized,
		}));
	}


	/* render */
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
					deleteTeam={() => this.deleteTeam(team)}
					onViewTeam={this.props.onViewTeam}
					removeAxieFromTeam={this.removeAxieFromTeam}
					/>
			))
		}

		return (
			<StyledAxieTeams className={"axieTeams" + (this.state.minimized ? " minimized" : "")} selectedAxie={this.props.selectedAxie} minimized={this.state.minimized} >
				<IconButton className="resizeButton" onClick={this.toggleSize} icon={"./img/icons/general/fullscreen.svg"} />
				<div className="teams">
					{teams}
				</div>
				<IconButton color="#a146ef" theme="dark" size="big" className="newTeamBtn" onClick={this.createNewTeam} icon={"./img/icons/general/add.svg"} />
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