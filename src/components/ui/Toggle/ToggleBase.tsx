import React, { Component, ReactElement } from 'react';

import styled, {css} from 'styled-components';


export interface ToggleBaseProps {
	isOn: boolean,
	color:string,
	label?:string,
	children?:any,
	onClick:any,
}

export const StyledToggleBase = styled.div<ToggleBaseProps>`
	display: inline-flex;
	padding: 10px;
	font-size:14px;
	color: #333;
	user-select: none;
	cursor: pointer;
	margin-bottom: 5px;
`;



/**
 * @deprecated
 */
interface ToggleBaseProps2 {
	on:boolean,
}

export const ToggleBase:React.FC<ToggleBaseProps2> = (props) => {
	return (
		<div>
			{props.on ? "on" : "offf"}
			{props.children && props.children}
		</div>
	)
}
