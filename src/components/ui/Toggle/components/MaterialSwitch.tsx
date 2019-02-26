import * as React from 'react';

import styled, {css} from 'styled-components';

import {hexToRgbA} from "../../utils/color";

import {ToggleBaseProps, StyledToggleBase} from "../ToggleBase";
import {Switch, StyledSwitch} from "./Switch";

const StyledMaterialSwitch = styled(StyledSwitch)<{isOn?:boolean, disabled?:boolean, color:string}>`

	.ui-plate {
		background:grey;
		border-radius:50px;
		width:35px;
		height:15px;
		background:grey;
		position:relative;
		transition: background 0.2s ease-in-out;
	}

	.ui-handle {
		border-radius:50%;
		width:20px;
		height:20px;
		position:absolute;
		top: -3px;
    left: -1px;
		background:#fafafa;
		transition: left 0.2s ease-in-out;
		box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
	}

	${props => props.color &&`
		.ui-plate {
			
		}
		.ui-handle{
			
		}
	`}

	${props => props.isOn &&`
		&&{
			.ui-plate {
				background:#666666;
			}
			.ui-handle{
				left:18px;
				background:#121212;
				box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);
			}
		}

		&&&:hover{
			opacity:0.85;
		}

		${props.color && `
			&&{
				.ui-plate {
					background: ${hexToRgbA(props.color, 0.45)}
				}
				.ui-handle{
					background: ${props.color}
				}
			}
		`}
	`}

	${props => props.disabled &&`
		&{
			pointer-events:none;
			cursor:default;
			opacity:0.5;	
		}
	`}
`;

export const MaterialSwitch:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => {
	const {label, children, color, isOn, disabled, className, onClick, style} = props;

	return(
		<Switch CustomComponent={StyledMaterialSwitch} color={color} isOn={isOn} disabled={disabled} className={className} onClick={onClick} style={style}>
			{label || children}
		</Switch>
	)
};