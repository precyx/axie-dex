import * as React from 'react';

import styled, {css} from 'styled-components';
import {hexToRgbA} from "../../utils/color";

import {ToggleBaseProps, StyledToggleBase} from "../ToggleBase";

const StyledRadio = styled(StyledToggleBase)<{isOn?:boolean, disabled?:boolean, color?:string}>`

	display:inline-flex;
	align-items:center;

	${props => props.isOn &&`
		&& {
			font-weight:500;
			color: ${props.color};
		}
		.ui-radiobutton {
			.ui-circle { background: ${props.color}; }
			border-color: ${props.color};
		}
	`}
	${props => !props.isOn && `
		&:hover {
			.ui-radiobutton { 
				background: rgba(0,0,0,0.035);
			}
		}
	`}

	${props => props.disabled &&`
		user-select:none;
		cursor:default;
		color:#c1c1c1;
		&& .ui-radiobutton { 
			border-color:#b5b5b5;
			background: white;

			.ui-circle {
				background:#b5b5b5;
			}
		}
	`}
`;

const RadioButton = styled.div`
	display: block;
	align-items:center;
	justify-content:center;
	width:20px;
	height:20px;
	background:#ffffff;
	border:2px solid grey;
	border-radius:50%;
	
	margin-right:10px;

	.ui-circle {
		margin: 0 auto;
		margin-top:3px;
	}
`;

const Circle = styled.div`
		width:10px;
		height:10px;
		border-radius:50%;
		background:grey;
`;


export const Radio:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => {
	const {label, children, isOn, color, value, className, onClick, disabled, style} = props;

	return(
		<StyledRadio color={color} isOn={isOn} disabled={disabled} className={className} onClick={onClick} style={style}>
			<RadioButton className="ui-radiobutton">
				{isOn && <Circle className="ui-circle"/>}
			</RadioButton>
			{label || children}
		</StyledRadio>
	)
};