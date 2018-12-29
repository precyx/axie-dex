import React from 'react';
import styled, { css } from "styled-components";
// CSS
import {StyledRadioGroup} from "./StyledRadioGroup";
import RadioButton from "../RadioButton/RadioButton";

/**
 * Renders an RadioGroup with RadioButtons
 * @example <RadioGroup options{Array} active_option{String}/>
 */
class RadioGroup extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			active_option: this.props.active_option,
		}
	}
	handleClickOption = (option) => {
		this.setState({
			active_option: option,
		});
		this.props.onChange(option);
	}
	render() {
		const radios = this.props.options.map((option) => 
			<RadioButton 
				active={this.state.active_option === option.value ? true : false} 
				onChange={()=>{this.handleClickOption(option.value)}} 
				key={option.value} 
				value={option.value}
			>
			{option.label}
			</RadioButton>
		);
		return (
			<StyledRadioGroup className={this.props.class}>
				{radios}
			</StyledRadioGroup>
		);
	}
}

export default RadioGroup;



