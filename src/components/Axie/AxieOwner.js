import React from 'react';
//import styled from 'styled-components';
// own
import {StyledAxieOwner} from './styles/StyledAxieOwner';
import axieClassColors from '../../data/axie-class-colors';

/**
 * @example <AxieOwner owner={ownerAddr} axieClass={axieClass}/>
 */
function AxieOwner(props) {
	const color = axieClassColors[props.axieClass];
	const owner = props.owner;
	return(
		<StyledAxieOwner className="axieOwner" color={color}>
			<a target="_blank" href={"https://axieinfinity.com/profile/" + owner}>{owner}</a>
		</StyledAxieOwner>
	)
}

export default AxieOwner;