import React from 'react';
//import styled from 'styled-components';
// own
import {StyledAxieOwner} from './StyledAxieOwner';
import axieClassColors from '../../data/axie-class-colors';

/**
 * Renders {name, id, class icon} of an {axie}
 * @class AxieTitle
 * @example <AxieOwner owner={ownerAddr} axieClass={axieClass}/>
 */
function AxieOwner(props) {
	return(
		<StyledAxieOwner className="axieOwner" color={axieClassColors[props.axieClass]}>
			<a target="_blank" href={"https://axieinfinity.com/profile/" + props.owner}>{props.owner}</a>
		</StyledAxieOwner>
	)
}

export default AxieOwner;