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
	CustomComponent?:StyledComponentClass<any, any>,
	style?:any,
}

interface ToggleState {
	isControlled:boolean,
	isOn:boolean,
}

/**
 * Toggle Enables an ON / OFF state for a label / content / component via a click event or a default value
 * There are predefined ToggleTypes to choose from like: Checkbox, Radio, Chip... 
 * 
 * There is also an option to provide a custom StyledComponent via *CustomComponent*
 * A CustomComponent has access to properties such as: *isOn*, *color*
 * A custom styled component can inherit a base toggle style from *StyledToggleBase* in the ToggleBase file
 * 
 * @example
 * <Toggle label="My Label" type="checkbox"/> 								//basic checkbox
 * <Toggle type="modern"> <i>I</i> My Content </Toggle>				//tab with custom content
 * <Toggle isOn={true}/>																			//controlled toggle
 * <Toggle type="chip" color="#ff00aa"/>											//chip with pink color
 * <Toggle CustomComponent={StyledComponent}> 								//custom style + content
 * 	<div className="custom"></div>
 * </Toggle>
 */
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
				this.props.onToggle && this.props.onToggle(this.props.value, this.state.isOn) 
			}
		)
	}

	render():JSX.Element{
		const {type, color, label, children, CustomComponent, className, style, ...other} = this.props;
		const isOn = this.state.isControlled ? this.props.isOn : this.state.isOn;

		const ToggleComponent = CustomComponent ? Custom : ToggleTypeMapping[type!] || Chip;
		
		return (
			<>
			<ToggleComponent className="ui-toggle" CustomComponent={CustomComponent} isOn={isOn!} color={color!} label={label!} onClick={this.handleClick} style={style} {...other}>
				{label || children} 
			</ToggleComponent>
			</>
		)
	}
}

