import React from 'react';
import styled, {css} from 'styled-components';


//CSS
const StyledButton = styled.button`
	border: 1px solid #cccccc;
	border-radius: 3px;
	background: #f3f3f3;
	color: #404040;
	:hover {background: #E8E8E8;}

	${({ type }) => type === "color" && css`
		{background: ${props => props.color}; }
		color:white;
		border:none;
		opacity: 0.95;
		:hover {background: ${props => props.color}; }
		:hover {opacity:0.8;}
	`}
`;

class Button extends React.PureComponent {
	render() {
		const className = "button " + this.props.className;
		const type = this.props.type;
		const color = this.props.color;
		return (
			<StyledButton className={className} onClick={this.props.onClick} type={type} color={color}>
				{this.props.name}
			</StyledButton>
		);
	}
}

export default Button;