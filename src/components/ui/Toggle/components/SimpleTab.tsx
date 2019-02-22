import * as React from 'react';

import styled, {css} from 'styled-components';
import {hexToRgbA} from "../../utils/color";

import {ToggleBaseProps, StyledToggleBase} from "../ToggleBase";

const StyledSimpleTab = styled(StyledToggleBase)<{isOn?:boolean, color:string}>`

	border-radius:5px;
	&:hover {
		background: rgba(0,0,0,0.1);
	}
	${props => props.isOn && `
		&.isOn {
			font-weight:500;
			color: ${props.color};
		}
	`}
`;

export const SimpleTab:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => (
	<StyledSimpleTab color={props.color} isOn={props.isOn} className={props.isOn ? "isOn" : ""} onClick={props.onClick}>
		{props.label || props.children}
	</StyledSimpleTab>
);