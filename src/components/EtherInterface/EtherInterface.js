import React from 'react';
//
import {WEB3_V1} from "../../services/web3-service";
import {AI_CONTRACTS} from "../../data/contracts/AxieInfinity/AxieInfinityContracts";

// css
import {StyledEtherInterface} from "./styles/StyledEtherInterface";
import Contract from "./Contract";

class EtherInterface extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
		}
	}
	componentDidMount() {
		WEB3_V1.connectWeb3();
		WEB3_V1.getDefaultAccount().then(acc => {
			console.log("acc", acc);
		})
	}

	render(){
		const contract = AI_CONTRACTS.core;
		//
		return (
			<StyledEtherInterface>
				<Contract abi={contract.abi} address={contract.address} name={contract.name}>
				</Contract>

			</StyledEtherInterface>
		)
	}

}

export default EtherInterface;