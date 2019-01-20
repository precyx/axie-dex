import React from 'react';
import styled from "styled-components";
// own
//import AxieBadges from "./AxieBadges";
import AxieParts from "../Axie/AxieParts";
import Axie from "../Axie/Axie/Axie";
/* ui */
import IconButton from "../ui/IconButton";

// CSS
const StyledAxieTeam = styled.div`
	/* component */
	display:flex; 
	align-items: center;
	justify-content: space-between;
	width: auto;
	padding: 10px 15px;
	min-height: 60px;
	margin:10px;
	border: 2px solid white;
	border-radius:8px;
	background:white;
	/* team */
	.team_title {font-size: 18px; color: #696969; font-weight: normal; user-select:none;}
	/* teammember */
	.members {display:flex; margin-top:10px;}
	.teammember { border-radius: 8px; padding-bottom:10px;  margin-right: 10px; position:relative;}
	/* axie */
	.teammember .axie {margin:0; border:none; padding:0;}
	.teammember .axie .staticImg {width: 140px; height: 110px;}
	/* rest */
	.teammember .title {font-size:12px; color:grey; margin-bottom:5px;}
	.teammember .img {width:120px; height:auto; margin-right:0; margin-top:10px;}
	.teammember .img_box {width:120px; height:90px; position:relative;}
	.teammember .axie_badges {position: absolute; top:0; left:0;}
	.teammember .removeAxieButton {display:none; position: absolute; top: 15px; right: 15px;}
	.teammember:hover .removeAxieButton {display:flex;}
	/* right */
	.right {display:none;}
	:hover .right {display:flex}
	/* name */
	.name {font-size: 12px; color: grey;}
	/* delete button */
	.deleteButton, .viewButton {margin-left: 10px; }
	/* button */
	.roundMiniButton { user-select:none; color:grey; width:25px; height:25px; background: rgba(0, 0, 0, 0.1); display:flex; cursor:pointer; font-size: 12px; align-items: center; justify-content: center; border-radius: 50%; }
	.roundMiniButton:hover { color:#222222; }
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
					 <Axie data={member.axie.axieData} img={member.axie.image} features={"minimal"}/>
					 <AxieParts parts={member.axie.axieData.parts} />
					 <IconButton className="removeAxieButton" onClick={() => { this.props.removeAxieFromTeam(this.props.team, member) }} icon={"./img/icons/general/close.svg"} />
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
					<IconButton icon={"img/icons/general/eye.svg"} className="viewButton" onClick={() => this.props.onViewTeam(this.props.team)} />
					<IconButton icon={"img/icons/general/close.svg"} className="deleteButton" onClick={this.props.deleteTeam}/>
				</div>
			</StyledAxieTeam>
		);
	}
}
export default AxieTeam;