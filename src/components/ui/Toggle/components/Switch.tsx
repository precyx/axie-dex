import * as React from 'react';

import styled, {css} from 'styled-components';

import {ToggleBaseProps, StyledToggleBase} from "../ToggleBase";

export const StyledSwitch = styled(StyledToggleBase)<{isOn?:boolean, disabled?:boolean, color:string}>`
	display: flex;
	align-items: center;
		
	.ui-plate {
		margin-right:10px;
	}
`;

const Plate = styled.div`
	border-radius:50px;
`;

const Handle = styled.div`
	width: 15px;
	height: 15px;
`;

export const Switch:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => {
	const {label, children, color, isOn, disabled, className, onClick, style, CustomComponent} = props;

	return(
		<CustomComponent color={color} isOn={isOn} disabled={disabled} className={className} onClick={onClick} style={style}>
			<Plate className="ui-plate">
				<Handle className="ui-handle"></Handle>
			</Plate>
			{label || children}
		</CustomComponent>
	)
};