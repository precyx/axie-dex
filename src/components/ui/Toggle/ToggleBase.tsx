import React, { Component, ReactElement } from 'react';

import styled, {css} from 'styled-components';


export interface ToggleBaseProps {
	isOn: boolean,
	disabled?:boolean,
	value?:string,
	color:string,
	label?:string,
	children?:any,
	className?:string,
	onClick?:any,
	CustomComponent?:any,
	style?:any,
	[a:string]:any,
}

export const StyledToggleBase = styled.div<ToggleBaseProps>`
	display: inline-flex;
	padding: 10px;
	font-size:14px;
	color: #333;
	user-select: none;
	cursor: pointer;
`;

/*
export const ToggleBase:React.FC<ToggleBaseProps> = (props:ToggleBaseProps) => {
	const {label, children, color, isOn, onClick, ...other} = props;
	return (
		<></>
	)
};
*/