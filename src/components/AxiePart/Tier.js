import React, { Component } from 'react';
import {StyledTier} from './styles/StyledTier';
import PartTypeGroup from "./PartTypeGroup";

class Tier extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		console.log("tier", this.props.name, this.props.parts);
		//
		const name = this.props.name;
		const partGroups = Object.keys(this.props.parts).map((partGroupKey)=>
			<PartTypeGroup key={partGroupKey} label={partGroupKey} parts={this.props.parts[partGroupKey]} />
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