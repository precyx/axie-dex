import React, { Component } from 'react';

import {Chip} from "./components/Chip";
import {ModernTab} from "./components/ModernTab";
import {SimpleTab} from "./components/SimpleTab";
import {Checkbox} from "./components/Checkbox";



export enum ToggleButtonType {
	Chip = 'chip',
	Modern = 'modern',
	Simple = 'simple',
	Checkbox = 'checkbox',
}

const ToggleTypeMapping:any = {
	[ToggleButtonType.Chip]: Chip,
	[ToggleButtonType.Modern]: ModernTab,
	[ToggleButtonType.Simple]: SimpleTab,
	[ToggleButtonType.Checkbox]: Checkbox,
}


export interface ToggleProps {
	label?:string,
	isOn?:boolean,
	type?:ToggleButtonType,
	className?:string,
	color?:string,
	value?:string,
	onToggle?:Function,
}

interface ToggleState {
	isControlled:boolean,
	isOn:boolean,
}


export class Toggle extends React.Component<ToggleProps, ToggleState> {

	constructor(props:ToggleProps){
		super(props);
		this.state = {
			isOn: props.isOn || false,
			isControlled: props.hasOwnProperty("isOn") ? true : false,
		}
	}

	handleClick = () => {
		this.setState(prevState=>({ isOn: !prevState.isOn }), 
			() => { 
				console.log(this.state.isOn);
				this.props.onToggle && this.props.onToggle(this.props.value, this.state.isOn) 
			}
		)
	}

	render():JSX.Element{
		const {type, color, label, children, className} = this.props;
		const isOn = this.state.isControlled ? this.props.isOn : this.state.isOn;

		const ToggleComponent = ToggleTypeMapping[type!] || Chip;
		return (
			<ToggleComponent isOn={isOn!} color={color!} label={label!} onClick={this.handleClick}>
				{children} 
			</ToggleComponent>
		)
	}
}

