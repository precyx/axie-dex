import React from 'react';
import styled, { css } from "styled-components";


const StyleToggleButton = styled.div`
	display: inline-flex;
	padding:10px;
	background:rgba(0,0,0,0.0);
	border-radius:5px;
	color:#333;
	user-select:none;
	cursor:pointer;

	/* active */
  ${({ active }) => active && css`
    background:rgba(0,0,0,0.1);
  `}
`;

/**
 * Renders a simple text input and a label
 * @example <ToggleButton text={text} active={true | false} html={} />
 */
class ToggleButton extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			active: this.props.active,
		}
	}
	toggleActive = () => {
		this.setState((prevState)=>({
			active: !prevState.active,
		}));
	}
	render() {
		return (
			<StyleToggleButton active={this.state.active} className={this.state.active ? "active" : ""} onClick={this.toggleActive}>
				{this.props.html}
			</StyleToggleButton>
		);
	}
}

export default ToggleButton;