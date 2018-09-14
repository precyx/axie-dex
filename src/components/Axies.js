import React, { Component } from 'react';
import styled from 'styled-components';
// own
import Axie from './Axie';
import BasicCenterContainer from './containers/BasicCenterContainer';

//CSS
const StyledAxies = styled.div`
	display:flex;
	flex-flow: wrap;
`;

class Axies extends Component {
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
				<StyledAxies>
						{axies}
				</StyledAxies>
			</BasicCenterContainer>
		);
	}
}

export default Axies;