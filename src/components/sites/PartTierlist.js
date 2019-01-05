import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import TierList from "../AxiePart/TierList";
//
import styled from 'styled-components';

//CSS
export const StyledPartTierList = styled.div`
	.partList {display:flex; flex-flow:wrap;}
	.axiePart {margin-top:10px; margin-left:10px;}
	h1 {font-size:38px; text-align:center; margin-top:40px;}
`;

class PartTierlist extends React.PureComponent{

	render(){
		return (
			<BasicCenterContainer>
				<StyledPartTierList>
				<h1>Tank Part Tierlist</h1>
				<div>
					<TierList />
				</div>
				</StyledPartTierList>
			</BasicCenterContainer>
		)
	}

}


export default PartTierlist;