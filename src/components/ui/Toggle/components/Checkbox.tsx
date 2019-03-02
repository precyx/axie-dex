import * as React from 'react';

import styled, {css} from 'styled-components';
import {hexToRgbA} from "../../utils/color";

import ReactSVG from 'react-svg'

import {Icon} from "../../Icon/Icon";

import {ToggleBaseProps, StyledToggleBase} from "../ToggleBase";

const StyledCheckbox = styled(StyledToggleBase)<{isOn?:boolean, disabled?:boolean, color:string}>`
	display: inline-flex;
	align-items: center;
	border-radius:5px;

	&:hover .checkerbox {
		background: #e8e8e8;
	}

	${props => props.isOn && `
		&& {
			font-weight:500;
			color: ${props.color};
		}
		.ui-checkerbox {
			background:grey;
			${props.color && `
				background: ${props.color};
				border-color: ${props.color};
			`}
		}
	`}

	${props => props.disabled &&`
		user-select:none;
		cursor:default;
		color:#c1c1c1;

		&& .ui-checkerbox { 
			border-color:#b5b5b5;
		}

		${props.isOn &&`
			&& .ui-checkerbox { 
				border-color:#b5b5b5;
				background: #b5b5b5;
			}
		`}	
		
	`}
`;

const CheckerBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width:20px;
	height:20px;
	background:white;
	border:2px solid grey;
	border-radius:3px;

	margin-right:10px;
`;

export const Checkbox:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => {
	const {label, children, color, isOn, disabled, className, onClick, style} = props;

	return (
		<StyledCheckbox color={color} isOn={isOn} disabled={disabled} className={className} onClick={onClick} style={style} >
			<CheckerBox className="ui-checkerbox">
				{isOn && <Icon className="ui-icon" src={`./img/icons/general/check.svg`} size={16} color="white"/> }
			</CheckerBox>
			{label || children}
		</StyledCheckbox>
	)
};