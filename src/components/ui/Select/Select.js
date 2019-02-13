import React from 'react';
//import styled, { css } from "styled-components";
// CSS
import {StyledSelect} from "./styles/StyledSelect";
import RadioButton from "../RadioButton/RadioButton";
import PropTypes from "prop-types";

/**
 * Renders an RadioGroup with RadioButtons
 * @example <RadioGroup options{Array} active_option{String} />
 */
class Select extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			active: this.props.active || {},
		}
	}

	handleClickOption = (option) => {
		let newActive = Object.assign({}, this.state.active);
		if(newActive[option]) delete newActive[option];
		else newActive[option] = true;

		this.setState({
			active: newActive,
		});
		if(this.props.onChange) this.props.onChange(option);
	}

	render() {
		const options = this.props.options.map((option) => {
			const active = this.state.active[option.value] ? true : false;
			return (
				<RadioButton 
					active={active} 
					onChange={()=>{this.handleClickOption(option.value)}} 
					key={option.value} 
					value={option.value}
				>
				{option.label}
				</RadioButton>
			)
		}

		);
		const label = this.props.label;
		const classNames = this.props.class;
		const color = this.props.color;
		const type = this.props.type;
		return (
			<StyledSelect className={"select " + classNames} type={type} color={color}>
				{label && <div className="label">{label}</div> }
				{options}
			</StyledSelect>
		);
	}
}

Select.propTypes = {
	active: PropTypes.array.isRequired,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func,
	type: PropTypes.oneOf(['modern', 'default', 'simple', 'chip']),
	color: PropTypes.string,
}

export default Select;



