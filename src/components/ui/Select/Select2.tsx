import React, { Component } from 'react';
import {StyledSelect2} from "./styles/StyledSelect2";

export interface Select2Props {
	className?:string,
	options:Array<any>,
}

interface Select2State {
}

export class Select2 extends React.Component<Select2Props, Select2State> {

	constructor(props:Select2Props){
		super(props);
	}

	render(){
		const className = this.props.className || "";
		const options = this.props.options;
		console.log("options", options);
		return (
			<StyledSelect2 className={`toggle-button${className}`} >
				{options.map((option,i) =>
				<div key={i}>
					{option}
				</div>
				)}
			</StyledSelect2>
		)
	}
}