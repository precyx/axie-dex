import React from 'react';
import styled, {css} from 'styled-components';


//CSS
const StyledButton = styled.button`
	border: 1px solid #cccccc;
	border-radius: 3px;
	background: #f3f3f3;
	color: #404040;
	:hover {background: #E8E8E8;}
	padding: 8px 15px;
  font-size: 14px;

	${({ type }) => (type === "filled" || type === "color") && css`
		{background: ${props => props.color}; }
		color:white;
		border:none;
		opacity: 0.95;
		:hover {background: ${props => props.color}; }
		:hover {opacity:0.8;}
	`}

	${({ type }) => type === "outline" && css`
		{color: ${props => props.color}; }
		{border: 1px solid ${props => props.color}; }
		background: rgba(255,255,255,0.15);
		:hover {opacity:0.8;}
	`}

	${({ size }) => size === "normal" && css`
		padding: 8px 15px;
    font-size: 14px;
	`}
	${({ size }) => size === "small" && css`
		padding: 7px 10px;
		font-size: 13px;
	`}

	${({ disable }) => disable && css`
		pointer-events: none;
    color: #bdbdbd!important;
    border-color: #d6d6d6!important;
	`}

`;

class Button extends React.PureComponent {
	render() {
		const className = "button " + this.props.className;
		const type = this.props.type;
		const color = this.props.color;
		const size = this.props.size;
		const disable = this.props.disable;
		//
		return (
			<StyledButton className={className} onClick={this.props.onClick} type={type} color={color} size={size} disable={disable}>
				{this.props.name}
			</StyledButton>
		);
	}
}

export default Button;