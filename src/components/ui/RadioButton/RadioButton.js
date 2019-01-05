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
		return (
			<StyledRadioButton active={this.props.active} className={"radioButton " + (this.props.active ? "active" : "")} onClick={() => {this.props.onChange(this.props.value)}}>
				{this.props.children}
			</StyledRadioButton>
		);
	}
}

export default RadioButton;