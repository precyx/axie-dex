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
	width: 100%;
	padding: 15px 25px;
	padding-right:15px;
	border-bottom: 1px solid #e4e4e4;
	/* team */
	.team_title {font-size: 15px; color: #a146ef; font-weight: bold; margin-bottom: 10px;}
	/* teammember */
	.members {display:flex;}
	.teammember .title {font-size:12px; color:grey;}
	.teammember .img {width:100px; height:auto; margin-right:0;}
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

	/*componentWillReceiveProps({members}) {
		this.setState({...this.state, members});
	}*/

	render() {
		// members
		var members = "";
		console.log("m", this.props.members);
		if(this.props.members.length){
			members = this.props.members.map((member)=>(
					<div key={member.axie.id} className="teammember">
						<div className="title">#{member.axie.id}</div>
						<img className="img" src={member.image} />
						<AxieBadges axieData={member.axie.axieData}/>
					</div>
			));
		}

		// view
		return (
			<StyledAxieTeam onClick={this.props.onClick}>
			<div className="left">
				<p className="team_title">{this.state.name}</p>
				<div className="members">{members}</div>
			</div>
			<div className="right">
				<div className="deleteButton" onClick={this.props.handleDelete}>X</div>
			</div>
			</StyledAxieTeam>
		);
	}
}
export default AxieTeam;