import React from 'react';
//
import {WEB3_V1} from "../../services/web3-service";
import {AI_CONTRACTS} from "../../data/contracts/AxieInfinity/AxieInfinityContracts";

// css
import {StyledEtherInterface} from "./styles/StyledEtherInterface";
import Contract from "./Contract";
import ContractFilter from "./ContractFilter";
import Web3 from 'web3';

class EtherInterface extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			contracts: this.getContracts(),
			activeContract: "AxieCore",
			layout: "normal",
		}
	}
	componentDidMount() {
		WEB3_V1.connectWeb3();
		WEB3_V1.getDefaultAccount().then(acc => {
			console.log("acc", acc);
		})
		this.getEvents();
	}


	async getEvents(){

		try {
			let block = await WEB3_V1.getBlock();
			console.log("b", block);
		}
		catch(err){
			console.log(err);
		}
		//window.web3.eth.getBlockNumber().then(console.log);

		/*window.web3.eth.getBlockNumber().then((block)=>{
			var contract = AI_CONTRACTS.clock_auction;
			var clockAuctionContract = WEB3_V1.getContract(contract.abi, contract.address);
			console.log(clockAuctionContract);
			clockAuctionContract.getPastEvents('AuctionSuccessful', {// Using an array means OR: e.g. 20 or 23
					fromBlock: block-1000,
					toBlock: block
			}, function(error, events){ console.log(events); })
			.then(function(events){
					console.log(events) // same results as the optional callback above
			});
		});*/

		/*var contract = AI_CONTRACTS.clock_auction;
		var clockAuctionContract = WEB3_V1.getContract(contract.abi, contract.address);
		console.log(clockAuctionContract);
		clockAuctionContract.getPastEvents('AuctionSuccessful', {// Using an array means OR: e.g. 20 or 23
				fromBlock: 0,
				toBlock: 'latest'
		}, function(error, events){ console.log(events); })
		.then(function(events){
				console.log(events) // same results as the optional callback above
		});*/
	}

	getContracts(){
		return [
			AI_CONTRACTS.core,
			AI_CONTRACTS.clock_auction,
			AI_CONTRACTS.egg_shop,
			AI_CONTRACTS.egg_lab2,
			AI_CONTRACTS.presale_extended,
			AI_CONTRACTS.land_sale,
			AI_CONTRACTS.exp_sync,
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

	handleContractFilterChange = (newFilters) => {
		let layout = "normal";
		if(newFilters["tag"] == "event") layout = "big";
		this.setState({
			layout: layout,
		})
	}

	render(){
		const contracts = this.state.contracts;
		const activeContractObj = this.getContractByName(this.state.activeContract);
		const contractElems = contracts.map(contract => {
			const active = contract.name == activeContractObj.name;
			if(active) return (
				<Contract key={contract.name} abi={contract.abi} address={contract.address} name={contract.name} onFilterChange={this.handleContractFilterChange}/>
			);
			else return "";
		});
		const layout = this.state.layout;
		//
		return (
			<StyledEtherInterface layout={layout}>

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