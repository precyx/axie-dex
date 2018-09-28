import React from 'react';
import styled from 'styled-components';


//CSS
const StyledButton = styled.button`
	border: 1px solid #cccccc;
	border-radius: 3px;
	background: #f3f3f3;
	color: #404040;
	:hover {background: #E8E8E8;}
`;

class Button extends React.PureComponent {
	render() {
		return (
			<StyledButton className="button" onClick={this.props.onClick}>
				{this.props.name}
			</StyledButton>
		);
	}
}

export default Button;