import React from 'react';
import styled from 'styled-components';

const StyledBasicCenterContainer = styled.div`
	width:90%;
	margin:0 auto; 
`;

class BasicCenterContainer extends React.PureComponent {
	render() {
		return (
			<StyledBasicCenterContainer>
				{this.props.children}
			</StyledBasicCenterContainer>
		);
	}
}

export default BasicCenterContainer;