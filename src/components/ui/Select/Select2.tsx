import React, { Component } from 'react';
import {StyledSelect2} from "./styles/StyledSelect2";

export interface Select2Props {
	className?:string,
	options?:Array<string>,
	onChange:Function,
	multiselect?:boolean,
	deselect?:boolean,
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
		const {children, className, onChange} = this.props;

		const elems = React.Children.map(children, (child:any)=>{
			return React.cloneElement(child, {onToggle: this.onToggleOption, isOn: this.state.selectedOptions[child.props.value] || false});
		})

		return (
			<StyledSelect2 className={`ui-select ${className}`} >
				{elems}
			</StyledSelect2>
		)
	}
}