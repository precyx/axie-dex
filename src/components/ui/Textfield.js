import React from 'react';
import styled from "styled-components";


const StyledTextfield = styled.div`
	display: flex;
	align-items: center;
	width:100%;
	label {width:100px;}
	input {width:250px; border: 1px solid #dcdcdc; border-radius:3px; padding: 12px 10px; outline: none;}
`;

/**
 * Renders a simple text input and a label
 * @example <Textfield id="name198" value="Bog" name="Bob" placeholder="Bob" onChange="onChangeFunction" />
 */
class Textfield extends React.PureComponent {
	render() {
		return (
			<StyledTextfield className="textfield">
				<label htmlFor={this.props.id}>{this.props.name}</label>
				<input id={this.props.id} type="text" value={this.props.value} onChange={this.props.onChange} placeholder={this.props.placeholder} />
			</StyledTextfield>
		);
	}
}

export default Textfield;