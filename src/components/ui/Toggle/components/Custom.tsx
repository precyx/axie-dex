import * as React from 'react';

import styled, {css} from 'styled-components';
import {hexToRgbA} from "../../utils/color";

import {ToggleBaseProps, StyledToggleBase} from "../ToggleBase";

const StyledCustom = styled(StyledToggleBase)<{isOn?:boolean, color:string}>`
	padding:0;
	margin:0;
`;

export const Custom:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => {
	const {label, children, CustomComponent, color, isOn, onClick, style} = props;
	return (
	<CustomComponent color={color} isOn={isOn} className={isOn ? "isOn" : ""} onClick={onClick} style={style}>
		{children}
	</CustomComponent>
)};