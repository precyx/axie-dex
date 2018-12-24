import React from 'react';
import styled from 'styled-components';
// own
import Axie from './Axie/Axie/Axie';
import BasicCenterContainer from './containers/BasicCenterContainer';

//CSS
const StyledAxieList = styled.div`
	display:flex;
	flex-flow: wrap;
	justify-content:center;
`;

class AxieList extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
		}
	}
	render() {
		if(this.props.axies){
			var axies = this.props.axies.map((axie) => 
				<Axie key={axie.id} data={axie} />
			);
		}
		return (
			<BasicCenterContainer>
				<StyledAxieList>
						{axies}
				</StyledAxieList>
			</BasicCenterContainer>
		);
	}
}

export default AxieList;