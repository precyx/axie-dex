import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
//
import styled from 'styled-components';

//CSS
export const StyledTeams = styled.div`

`;

class PartTierlist extends React.PureComponent{

	render(){
		return (
			<BasicCenterContainer>
				<StyledTeams>
					<h1>Teams</h1>
				</StyledTeams>
			</BasicCenterContainer>
		)
	}

}


export default PartTierlist;