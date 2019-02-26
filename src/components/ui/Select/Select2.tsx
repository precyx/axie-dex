import React, { Component } from 'react';
import {StyledSelect2} from "./styles/StyledSelect2";

import { StyledComponentClass } from 'styled-components';

export interface Select2Props {
	CustomComponent?:StyledComponentClass<any, any>,
	className?:string,
	options?:Array<string>,
	onChange:(options:{[key:string]:string}) => void,
	multiselect?:boolean,
	deselect?:boolean,
	style?:any,
}
interface Select2State {
	isControlled?:boolean,
	selectedOptions:{[key:string]:string},
}

export class Select2 extends React.Component<Select2Props, Select2State> {

	constructor(props:Select2Props){
		super(props);
		let options:any = {};
		if(props.options) props.options.forEach(option => options[option] = option);

		this.state = {
			selectedOptions: options,
			isControlled: props.hasOwnProperty("options") ? true : false,
		}
	}

	onToggleOption = (key:string, val:boolean) => {
		const {multiselect, deselect} = this.props;
		const {selectedOptions} = this.state;

		let newOptions = Object.assign({}, this.state.selectedOptions);

		if(!multiselect) {
			newOptions = {};
			if(deselect && selectedOptions[key]) delete newOptions[key];
			else newOptions[key] = key;
		}
		else {
			if(!val) delete newOptions[key];
			else newOptions[key] = key;
		}

		this.setState({ selectedOptions: newOptions }, () =>{
			if(this.props.onChange) this.props.onChange(this.state.selectedOptions);
		});
	}

	render(){
		const {children, className, CustomComponent} = this.props;

		const elems = React.Children.map(children, (child:any, i:number)=>{
			return React.cloneElement(child, {onToggle: this.onToggleOption, isOn: this.state.selectedOptions[child.props.value] || false});
		})

		const Component = CustomComponent ? CustomComponent : StyledSelect2;

		return (
			<Component className={`ui-select ${className}`} >
				{elems}
			</Component>
		)
	}
}