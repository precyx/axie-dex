



import React from "react";
import styled from "styled-components";

import {AXIE_DATA_V1} from "../../services/axie-data-service"; 

import {Grid} from "./Grid";

const StyledTeam = styled.div`
	.owner {
		margin-top:40px; 
	}
`;

interface TeamProps {
	teamID:string,
}
interface TeamState {
	team?:TeamModel;
}
interface TeamModel {
	owner:string,
	ownerName:string,
	teamId:string,
	name:string,
	teamMembers:Array<object>,
}

export class Team extends React.Component<TeamProps, TeamState>{
	constructor(props:TeamProps) {
		super(props);
		this.state = {
			team: undefined, 
		}
	}

	componentDidMount() {
		this.getTeam(this.props.teamID);
	}

	async getTeam(teamID:string){
		const team = await AXIE_DATA_V1.getTeamById(teamID);
		this.setState({team: team});
		console.log(team);
	}
	

	render():JSX.Element{
		const team = this.state.team;
		
		return (
			<StyledTeam>
				{team &&
					<>
						<Grid activeTiles={[6,4,3]}></Grid>
						<div className="owner">{team.ownerName}</div>
					</>
				}
			</StyledTeam>
		);
	}
}