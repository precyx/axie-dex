import React, { Component } from 'react';

import {Chip} from "./components/Chip";
import {ModernTab} from "./components/ModernTab";
import {SimpleTab} from "./components/SimpleTab";
import {Checkbox} from "./components/Checkbox";
import {Radio} from "./components/Radio";
import {Custom} from "./components/Custom";
import { StyledComponentClass } from 'styled-components';



export enum ToggleButtonType {
	Custom = 'custom',
	Chip = 'chip',
	Modern = 'modern',
	Simple = 'simple',
	Checkbox = 'checkbox',
	Radio = 'radio',
}

const ToggleTypeMapping:any = {
	[ToggleButtonType.Custom]: Custom,
	[ToggleButtonType.Chip]: Chip,
	[ToggleButtonType.Modern]: ModernTab,
	[ToggleButtonType.Simple]: SimpleTab,
	[ToggleButtonType.Checkbox]: Checkbox,
	[ToggleButtonType.Radio]: Radio,
}


export interface ToggleProps {
	label?:string,
	value?:string,
	isOn?:boolean,
	type?:ToggleButtonType,
	className?:string,
	color?:string,
	onToggle?:Function,
	CustomComponent?:any,
	style:any,
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
				//console.log(this.state.isOn);
				this.props.onToggle && this.props.onToggle(this.props.value, this.state.isOn) 
			}
		)
	}

	render():JSX.Element{
		const {type, color, label, children, CustomComponent, className, style, ...other} = this.props;
		const isOn = this.state.isControlled ? this.props.isOn : this.state.isOn;
		//console.log("k", CustomComponent);

		const ToggleComponent = CustomComponent ? Custom : ToggleTypeMapping[type!] || Chip;
		
		return (
			<>
			<ToggleComponent CustomComponent={CustomComponent} isOn={isOn!} color={color!} label={label!} onClick={this.handleClick} style={style} {...other}>
				{children} 
			</ToggleComponent>
			</>
		)
	}
}

