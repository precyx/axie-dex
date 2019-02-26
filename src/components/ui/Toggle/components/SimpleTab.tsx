import * as React from 'react';

import styled, {css} from 'styled-components';

import {ToggleBaseProps, StyledToggleBase} from "../ToggleBase";

const StyledSimpleTab = styled(StyledToggleBase)<{isOn?:boolean, disabled?:boolean, color:string}>`

	border-radius:5px;
	&:hover {
		background: rgba(0,0,0,0.1);
	}
	${props => props.isOn && `
		&& {
			font-weight:500;
			color: ${props.color};
		}
	`}

	${props => props.disabled &&`
		&&{
			cursor:default;
			color: #cacaca;
			background:transparent;
		}
	`}
`;

export const SimpleTab:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => {
	const {label, children, color, isOn, disabled, className, onClick, style} = props;

	return(
		<StyledSimpleTab color={color} isOn={isOn} disabled={disabled} className={className} onClick={onClick} style={style}>
			{label || children}
		</StyledSimpleTab>
	)
};