import React, { Component } from 'react';
import {ToggleBase} from "./ToggleBase";
import {StyledToggle} from "./styles/StyledToggle";

export enum ToggleButtonType {
	Chip = 'chip',
	Modern = 'modern',
	Simple = 'simple',
}

export interface ToggleProps {
	toggleOn?:boolean,
	type?:ToggleButtonType,
	className?:string,
	color?:string,
	value?:string,
	onToggle?:Function,
}

interface ToggleState {
	toggleOn:boolean,
}

export class Toggle extends React.Component<ToggleProps, ToggleState> {

	constructor(props:ToggleProps){
		super(props);
		this.state = {
			toggleOn: props.toggleOn || false,
		}
	}

	handleClick = () => {
		this.setState(prevState=>({ toggleOn: !prevState.toggleOn }), 
			() => { 
				this.props.onToggle && this.props.onToggle(this.props.value, this.state.toggleOn) 
			}
		)
	}

	render(){
		const className = this.props.className || "";
		const toggleOn = this.state.toggleOn;
		const toggleClass = toggleOn ? " active" : "";
		const children = this.props.children;
		const type = this.props.type || ToggleButtonType.Simple;
		const color = this.props.color;
		return (
			<StyledToggle type={type} color={color} className={`toggle-button${className}${toggleClass}`} onClick={this.handleClick}>
				{children}
			</StyledToggle>
		)
	}
}