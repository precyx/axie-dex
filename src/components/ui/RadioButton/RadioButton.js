import React from 'react';
//import styled, { css } from "styled-components";
// CSS
import {StyledRadioButton} from "./StyledRadioButton";

/**
 * Renders a simple text input and a label
 * @example <RadioButton text={text} active={true | false} html={} onChange={function(){}}/>
 */
class RadioButton extends React.PureComponent {
	toggleActive = () => {
		this.setState((prevState)=>({
			active: !prevState.active,
		}));
	}
	render() {
		const color = this.props.color || "#888888";
		const type = this.props.type;
		const active = this.props.active;
		const onChange = this.props.onChange || new Function();
		const children = this.props.children;
		const value = this.props.value;

		return (
			<StyledRadioButton type={type} color={color} active={active} className={"radioButton " + (active ? "active" : "")} onClick={() => {onChange(value)}}>
				{children}
			</StyledRadioButton>
		);
	}
}

export default RadioButton;