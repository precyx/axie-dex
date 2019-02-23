import * as React from 'react';

import styled, {css} from 'styled-components';
import {hexToRgbA} from "../../utils/color";

import {ToggleBaseProps, StyledToggleBase} from "../ToggleBase";

const StyledRadio = styled(StyledToggleBase)<{isOn?:boolean, color:string}>`

	display:inline-flex;
	align-items:center;

	${props => props.isOn && `
		&.isOn {
			font-weight:500;
			color: ${props.color};
		}
	`}
	${props => !props.isOn && `
		&:hover {
			.radiobutton { 
				background: rgba(0,0,0,0.1);
			}
		}
	`}
`;

const RadioButton = styled.div<{isOn:boolean, color:string}>`
	display: block;
	align-items:center;
	justify-content:center;
	width:20px;
	height:20px;
	background:#f3f3f3;
	border:2px solid grey;
	border-radius:50%;
	
	margin-right:10px;

	.circle {
		margin: 0 auto;
		margin-top:3px;
	}

	${props => props.isOn && `
		&&& {
			${props.color && `
				.circle {
					background: ${props.color};
				}
				border-color: ${props.color};
			`}
		}
	`}
`;

const Circle = styled.div`
		width:10px;
		height:10px;
		border-radius:50%;
		background:grey;
`;


export const Radio:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => {
	const {label, children, color, isOn, onClick, ...other} = props;
	return(
	<StyledRadio color={color} isOn={isOn} className={isOn ? "isOn" : ""} onClick={onClick} {...other}>
		<RadioButton className="radiobutton" isOn={isOn} color={color}>
			{isOn && <Circle className="circle"/>}
		</RadioButton>
		{label || children}
	</StyledRadio>
)};