import React from 'react';
//import styled from 'styled-components';
// own
import AxiePart from "./AxiePart";
import {StyledPartTypeGroup} from './styles/StyledPartTypeGroup';

/**
 * Renders {name, id, class icon} of an {axie}
 * @class AxieTitle
 * @example <PartTypeGroup owner={ownerAddr} axieClass={axieClass}/>
 */
class PartTypeGroup extends React.PureComponent{

	render(){
		const partsArr = this.props.parts;
		const parts = partsArr.map((part)=>
			<AxiePart key={part.id} data={part} size="normal"/>
		);
		const label = this.props.label;
		return(
			<StyledPartTypeGroup className="partTypeGroup">
				<div className="label">{label}</div>
				<div className="parts">
					{parts}
				</div>
			</StyledPartTypeGroup>
		)
	}

}

export default PartTypeGroup;