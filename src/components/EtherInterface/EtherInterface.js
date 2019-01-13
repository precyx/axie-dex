import React from 'react';
//
import {WEB3_V1} from "../../services/web3-service";
import {AI_CONTRACTS} from "../../data/contracts/AxieInfinity/AxieInfinityContracts";

// css
import {StyledEtherInterface} from "./styles/StyledEtherInterface";
import Contract from "./Contract";
import ContractFilter from "./ContractFilter";

class EtherInterface extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			contracts: this.getContracts(),
			activeContract: "AxieCore",
		}
	}
	componentDidMount() {
		WEB3_V1.connectWeb3();
		WEB3_V1.getDefaultAccount().then(acc => {
			console.log("acc", acc);
		})
	}

	getContracts(){
		return [
			AI_CONTRACTS.core,
			AI_CONTRACTS.clock_auction,
			AI_CONTRACTS.egg_shop,
			AI_CONTRACTS.egg_lab2,
			AI_CONTRACTS.presale_extended,
		];
	}

	/* queries */
	getContractByName(name){
		var _con = null;
		this.state.contracts.forEach(contract => {
			if(contract.name == name) _con = contract;
		})
		return _con;
	}

	/* event handlers */
	handleChangeContract = (newContract) => {
		this.setState({
			activeContract: newContract,
		})
	}

	render(){
		const contracts = this.state.contracts;
		const activeContractObj = this.getContractByName(this.state.activeContract);
		const contractElems = contracts.map(contract => {
			const active = contract.name == activeContractObj.name;
			if(active) return (
				<Contract key={contract.name} abi={contract.abi} address={contract.address} name={contract.name} />
			);
			else return "";
		});
		//
		return (
			<StyledEtherInterface>

			<div className="mainContainer">
				<div className="contractFilterContainer">
					<ContractFilter contracts={contracts} onChangeOption={this.handleChangeContract}/>
				</div>
				<div className="contractContainer">
					{contractElems}
				</div>
			</div>
			 
			</StyledEtherInterface>
		)
	}
}


export default EtherInterface;