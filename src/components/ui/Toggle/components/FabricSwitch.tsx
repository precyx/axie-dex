import * as React from 'react';

import styled, {css} from 'styled-components';

import {ToggleBaseProps, StyledToggleBase} from "../ToggleBase";
import {Switch} from "./Switch";

const StyledFabricSwitch = styled(StyledToggleBase)<{isOn?:boolean, disabled?:boolean, color:string}>`
	display: flex;
	align-items: center;
		
	.ui-plate {
		width:40px;
		margin-right:10px;
		border:2px solid #333333;
		background:white;
	}
	.ui-handle {
		border-radius:50%;
		border: 2px solid white;
		background:#333333;
		transition: margin 0.2s ease-in-out;
	}

	&:hover {
		.ui-plate {border-color:black;}
		.ui-handle {background:black;}
	}

	${props => props.isOn &&`
		&&{
			.ui-plate {
				background: grey;
				border-color: grey;
			}
			.ui-handle{
				margin-left:21px;
				background:white;
				border-color: grey;
			}
		}

		&&&:hover{
			opacity:0.85;
		}

		${props.color && `
			&&{
				.ui-plate {
					background: ${props.color};
					border-color: ${props.color};
				}
				.ui-handle{
					border-color: ${props.color};
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

export const FabricSwitch:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => {
	const {label, children, color, isOn, disabled, className, onClick, style} = props;

	return(
		<Switch CustomComponent={StyledFabricSwitch} color={color} isOn={isOn} disabled={disabled} className={className} onClick={onClick} style={style}>
			{label || children}
		</Switch>
	)
};