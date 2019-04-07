import React from 'react';
import styled from 'styled-components';
// own
import Axie from './Axie/Axie/Axie';
import BasicCenterContainer from './containers/BasicCenterContainer';

//CSS
const StyledAxieList = styled.div`
	display:flex;
	flex-flow: wrap;
	justify-content:left;
`;

/**
 * Displays list of <Axie>'s
 * @example <AxieList axies={axies} features={"minimal" | "parts" | "stats" | "all"}/>
 * @class Axie
 * @extends {React.PureComponent}
 */
class AxieList extends React.PureComponent {
	render() {
		console.log("features", this.props.features);
		if(this.props.axies){
			var axies = this.props.axies.map((axie) => 
				<Axie key={axie.id} data={axie} rendering={"image"} features={this.props.features || null} size={this.props.size || "normal"}/>
			);
		}
		return (

			<StyledAxieList>
					{axies}
			</StyledAxieList>

		);
	}
}

export default AxieList;