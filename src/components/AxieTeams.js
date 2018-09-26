import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from "styled-components";
// own
import AxieTeam from "./AxieTeam";
// CSS
const StyledAxieTeams = styled.div`
	padding:25px 0;
	width:350px;
	height:100%;
	border: 1px solid #e2e2e2;
	/* containers */
	.gapContainer {padding:0 25px;}
	/* teams */
	.teams { max-height: 300px; overflow-y: scroll;}
	/* new team button */
	.newTeamBtn {margin-top:15px; width:100%; background:#f4f4f4; color: #6e6e6e; font-weight:bold; padding:15px 5px; text-align:center; border-radius:8px; cursor:pointer;}
	.newTeamBtn:hover {background:#ececec;}

		/* focus state */
		${({ selectedAxie }) => selectedAxie && css`
			width: 550px;
			box-shadow: 0 5px 18px rgba(0, 0, 0, 0.32);
			border: none;
			.teams {cursor: pointer;}
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
			console.log("t", this.state.teams);
		});
	
	}

	render() {
		var teams = "";
		if(this.state.teams.length){
			teams = this.state.teams.map((team, i)=>(
				<AxieTeam 
					className="team" 
					key={i} 
					name={team.name}
					members={team.members}
					onClick={() => this.addNewTeamMember(team)} 
					handleDelete={() => this.handleDelete(team)}
					/>
			))
		}

		return (
			<StyledAxieTeams selectedAxie={this.props.selectedAxie}>
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
	constructor(axie){
		this.axie = axie;
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