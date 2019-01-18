import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import {StyledContractViewer} from "./styles/StyledContractViewer";
//

//
import EtherInterface from "../EtherInterface/EtherInterface";

class ContractViewer extends React.PureComponent{

	componentDidMount() {
	}
	render(){
		return (
			<BasicCenterContainer>
				<StyledContractViewer>

					<EtherInterface />

				</StyledContractViewer>
			</BasicCenterContainer>
		)
	}

}

export default ContractViewer;