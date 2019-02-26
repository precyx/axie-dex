import * as React from 'react';

import styled, {css} from 'styled-components';

import {ToggleBaseProps, StyledToggleBase} from "../ToggleBase";
import {Switch} from "./Switch";

const StylediOSSwitch = styled(StyledToggleBase)<{isOn?:boolean, disabled?:boolean, color:string}>`
	display: flex;
	align-items: center;
		
	.ui-plate {
		width:40px;
		margin-right:10px;
		border:2px solid #e4e4e4;
		background:white;
	}
	.ui-handle {
		border-radius:22px;
		width:22px;
		height:22px;
		box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 1px 0px 2px 0px rgba(0,0,0,0.12);
		background:white;
		transition: all 0.2s ease-in-out;
		transition-property: margin, width;
	}

	&:hover {
		.ui-handle {width:24px;}
	}

	${props => props.isOn &&`
		&&{
			.ui-plate {
				background: grey;
				border-color: grey;
			}
			.ui-handle{
				margin-left:14px;
				background:white;
			}
		}

		&&&:hover{
			opacity:0.85;
			.ui-handle{
				width:22px;
			}
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

export const iOSSwitch:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => {
	const {label, children, color, isOn, disabled, className, onClick, style} = props;

	return(
		<Switch CustomComponent={StylediOSSwitch} color={color} isOn={isOn} disabled={disabled} className={className} onClick={onClick} style={style}>
			{label || children}
		</Switch>
	)
};