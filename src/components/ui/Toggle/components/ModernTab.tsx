import * as React from 'react';

import styled, {css} from 'styled-components';
import {hexToRgbA} from "../../utils/color";

import {ToggleBaseProps, StyledToggleBase} from "../ToggleBase";

const StyledModernTab = styled(StyledToggleBase)<{isOn?:boolean, color:string}>`

	background:none; 
	font-weight:normal; 
	border-bottom: 3px solid rgba(0,0,0,0);

	&:hover {
		color: rgba(0,0,0,0.7);
		border-radius: 3px 3px 0 0;
		font-weight:500;
		background: #e6e6e6;
		border-bottom-color: #a5a5a5;
	
		${props => props.color && ` 
			background: ${hexToRgbA(props.color, 0.15)};
			border-bottom: 3px solid ${hexToRgbA(props.color, 0.5)}; 
		`}
	}
	${props => props.isOn && ActiveModernTab}; 	

	${props => props.disabled &&`
		&&{
			cursor:default;
			color: rgba(0, 0, 0, 0.33);
			border-radius: 3px 3px 0 0;
			font-weight:normal;
			background: #ececec;
			border-bottom-color: #cacaca;
		}
	`}
`;

const ActiveModernTab = css<{color:string}>`
	&& { 
		font-weight:500;
		color: rgba(0,0,0,0.7);
		border-radius: 3px 3px 0 0;
		background: #d6d6d6;
		border-bottom-color: #3c3c3c; 

		${props => props.color && ` 
			border-bottom: 3px solid ${props.color};
			color: ${props.color};
			background: ${hexToRgbA(props.color, 0.24)}; 
		`}
	}
`;

export const ModernTab:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => {
	const {label, children, color, isOn, disabled, className, onClick, style} = props;

	return (
		<StyledModernTab color={color} isOn={isOn} disabled={disabled} className={className} onClick={onClick} style={style}>
			{label || children}
		</StyledModernTab>
	)
};

