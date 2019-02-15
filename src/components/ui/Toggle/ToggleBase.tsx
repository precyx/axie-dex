import React, { Component, ReactElement } from 'react';


interface ToggleBaseProps {
	on:boolean,
}


export const ToggleBase:React.FC<ToggleBaseProps> = (props) => {
	return (
		<div>
			{props.on ? "on" : "offf"}
			{props.children && props.children}
		</div>
	)
}
