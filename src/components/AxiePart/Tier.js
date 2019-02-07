import React, { Component } from 'react';
import {StyledTier} from './styles/StyledTier';
import PartTypeGroup from "./PartTypeGroup";

class Tier extends Component {
	constructor(props) {
		super(props);
		this.tierColors = {
			s : {secondary: "#ffdbdb", primary: "#db4545", tertiary: "#fb1d77"},
			a : {secondary: "#ffeddb", primary: "#ee9245", tertiary: "#ff6c23"},
			b : {secondary: "#fff6ba", primary: "#e4cc3f", tertiary: "#ffb62d"},
		}

		this.defaultColor = {
			primary: "grey",
			secondary: "grey",
			tertiary: "grey",
		}
	}

	render() {
		console.log("tier", this.props.name, this.props.parts);
		//
		const type = this.props.type;
		const name = this.props.name;
		let color = this.tierColors[name.toLowerCase()];
		const partGroups = Object.keys(this.props.parts).map((partGroupKey)=>
			<PartTypeGroup key={partGroupKey} label={partGroupKey} parts={this.props.parts[partGroupKey]} color={color || this.defaultColor} type={type}/>
		);
		return (
			<StyledTier className="tier" tier={name.toLowerCase()}>
				<div className="tierName">{name}</div>
				<div className="partGroups">
					{partGroups}
				</div>
			</StyledTier>
		);
	}
}

export default Tier;