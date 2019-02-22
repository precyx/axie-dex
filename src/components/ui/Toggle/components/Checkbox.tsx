import * as React from 'react';

import styled, {css} from 'styled-components';
import {hexToRgbA} from "../../utils/color";

import {ToggleBaseProps, StyledToggleBase} from "../ToggleBase";

const StyledCheckbox = styled(StyledToggleBase)<{isOn?:boolean, color:string}>`
	display: inline-flex;
	align-items: center;
	border-radius:5px;

	&:hover .checkerbox {
		background: #e8e8e8;
	}

	${props => props.isOn && `
		&.isOn {
			font-weight:500;
			color: ${props.color};
		}
	`}
`;

const CheckerBox = styled.div<{isOn:boolean, color:string, content:any}>`
	width:20px;
	height:20px;
	background:#f3f3f3;
	border:2px solid grey;
	border-radius:6px;

	margin-right:10px;

	${props => props.isOn && `
		&&& {
			background:grey;
			${props.color && `
				background: ${props.color};
				border-color: ${props.color};
			`}
		}
	`}
`;

export const Checkbox:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => {
	const {label, children, color, isOn, onClick} = props;
	return (
	<StyledCheckbox color={color} isOn={isOn} className={isOn ? "isOn" : ""} onClick={onClick}>
		<CheckerBox className="checkerbox" isOn={isOn} color={color} content={label || children}>

		</CheckerBox>
		{label || children}
	</StyledCheckbox>
)};