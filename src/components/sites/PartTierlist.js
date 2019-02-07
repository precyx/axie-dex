import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import TierList from "../AxiePart/TierList";
import {TIERLISTS} from "../AxiePart/data/tierlists";
import RadioGroup from '../ui/RadioGroup/RadioGroup';
//
import styled from 'styled-components';

//CSS
export const StyledPartTierList = styled.div`
	.partList {display:flex; flex-flow:wrap;}
	.axiePart {margin-bottom:10px; margin-right:10px;}
	.titlebar {display:flex; margin-top:60px; margin-bottom:25px;}
	.titlebar .block {display:flex; align-items:center;margin: 0 auto;}
	h1 {font-size:38px; text-align:center; margin:0 15px; display:flex; }
	.patch { background: white; padding: 2px 6px; font-size: 12px; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.18); border-radius: 5px; color: #777777;}
	.level {color:#a146ef; margin-left:15px; font-weight: 400; }

	.radiogroup {display: flex; justify-content: center; margin-bottom: 20px;}
`;

class PartTierlist extends React.PureComponent{


	constructor(props) {
		super(props);
		this.state = {
			currentList: "tank",
		}
		this.titles = {
			"tank" : "Tank",
			"dps" : "DPS",
		}
	}

	handleChangeList = (newOption) => {
		console.log("new", newOption);
		this.setState({
			currentList:newOption,
		})
	}

	render(){
		console.log("x", TIERLISTS.tank)

		const currentList = this.state.currentList;
		const title = `${this.titles[currentList]} Parts`;
		//
		return (

				<StyledPartTierList>
					<div class="titlebar">
						<div className="block">
							<p className="patch">Patch 1.0</p> 
							<h1>Tierlist <p className="level">Level 1</p></h1> 
						</div>
					</div>
					<RadioGroup class={"radiogroup"} type="modern" label="Type" color="#a146ef" options={[
						{label: "Tank", value: "tank"},
						{label: "DPS", value: "dps"},
					]} active_option={currentList} onChange={this.handleChangeList}>
					</RadioGroup>
					<div>
						{currentList == "tank" && <TierList parts={TIERLISTS.tank} type="tank"/> }
						{currentList == "dps" && <TierList parts={TIERLISTS.dps} type="dps"/> }
					</div>
				</StyledPartTierList>
		)
	}

}


export default PartTierlist;