import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
//
import styled from 'styled-components';

//CSS
export const StyledPartTierList = styled.div`
	h1 {font-size:38px; text-align:center; margin-top:40px;}
`;

class Comps extends React.PureComponent{

	render(){
		return (
			<BasicCenterContainer>
				<StyledPartTierList>
					<h1>Components</h1>
				</StyledPartTierList>
			</BasicCenterContainer>
		)
	}

}


export default Comps;