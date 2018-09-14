import React, { Component } from 'react';
import styled from 'styled-components';

const StyledBasicCenterContainer = styled.div`
	width:90%;
	margin:0 auto; 
`;

class BasicCenterContainer extends Component {
	render() {
		return (
			<StyledBasicCenterContainer>
				{this.props.children}
			</StyledBasicCenterContainer>
		);
	}
}

export default BasicCenterContainer;