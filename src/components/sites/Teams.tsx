import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
//
import styled from 'styled-components';

import {Team} from "../Battle/Team";

import {TextField} from "../ui/TextField/TextField"; 
import Button from "../ui/Button"; 

//CSS
export const StyledTeams = styled.div`

		display:flex;
		flex-flow:column;
		max-width:1200px;
		margin:0 auto;

		.container {
			background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.14);
		}
		.teams{
			display:flex;
			justify-content: space-between;
		}

		.team .textfield {
			margin-bottom:20px;
		}
		.load_btn {
			width: 200px;
			margin: 0 auto;
			border-radius: 0 0 8px 8px;
			text-align: center;
			display: flex;
			justify-content: center;
		}

`;

export const StyledButton = styled.div`
	padding:20px;
	font-weight:regular;
	cursor: pointer;
	outline:none;
	background:#9c9c9c;
	color:#333;
	display:inline-flex;
`;


interface TeamsProps {}
interface TeamsState {}

class Teams extends React.Component<TeamsProps, TeamsState>{

	constructor(props:TeamsProps){
		super(props);
		this.state = {
		}
	}

	render(){
		return (
			
				<StyledTeams>
					<h1>Teams</h1>

					<div className="container">
					<div className="teams">

					<div className="team team1">
						<TextField className="textfield" value="teamid" label="Team ID" onChange={()=>{}}></TextField>
						<Team teamID="9e8a60be-c9ec-464d-bc69-e70cc65ed04e"></Team>
					</div>

					<div className="team team2">
						<TextField className="textfield" value="teamid2" label="Team ID 2" onChange={()=>{}}></TextField>
						<Team teamID="4466c16b-0377-4888-b3bf-0cfe91f2b79c"></Team>
					</div>

					</div>
					</div>

					<StyledButton className="load_btn">Load Teams</StyledButton>


				</StyledTeams>
			
		)
	}

}


export default Teams;