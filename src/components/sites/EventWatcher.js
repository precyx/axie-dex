import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import {StyledEventWatcher} from "./styles/StyledEventWatcher";
//
import {WEB3_V1} from "../../services/web3-service";
import Web3 from 'web3';
import {AI_CONTRACTS} from "../../data/contracts/AxieInfinity/AxieInfinityContracts";

import {weiToEth, roundToDecimal} from "../../services/utils";
class EventWatcher extends React.PureComponent{

	constructor(props){
		super(props);
		WEB3_V1.connectWeb3();
		this.getEvents();
		this.state = {
			events: [],
		}
	}

	
	async getEvents(){
		const block = await WEB3_V1.getBlock();
		var contract = AI_CONTRACTS.clock_auction;
		var clockAuctionContract = WEB3_V1.getContract(contract.abi, contract.address);
		clockAuctionContract.getPastEvents('AuctionSuccessful', {// Using an array means OR: e.g. 20 or 23
				fromBlock: block-10000,
				toBlock: block
		}, function(error, events){ console.log(events); })
		.then(async (events) => {
				const transferEvent = contract.abi.filter(method => method.name == "AuctionSuccessful");
				const mappedEvents = await this.mapEvents(transferEvent[0].inputs, events);

				this.combineToUniqueBuyers(mappedEvents);
				this.setState({
					events: mappedEvents,
				})
		});
	}


	mapEvents = async (inputs, events) => {
		let newEventPromises = events.map(async event => {
			let returnVals = [];
			inputs.forEach(input => {
				returnVals.push(event.returnValues[input.name]);
			})
			let block = await WEB3_V1.getBlockOf(event.blockNumber);
			return {
				"returnValues" : [...returnVals],
				"transactionHash" : event.transactionHash,
				"timestamp" : block.timestamp,
			};
		}) 
		return Promise.all(newEventPromises).then(newEvents => {
			console.log("all", newEvents);
			let headerFields = inputs.map(input =>{ return input.name});
			return {
				"header": headerFields,
				"data" : newEvents,
			}
		})
	}


	combineToUniqueBuyers = (mappedEvents) => {
		let uniqueUsers = {};
		mappedEvents.data.map(event => {
			const winner = event.returnValues[3];
			const amount = event.returnValues[2];
			console.log("su", winner, amount);
			if( !uniqueUsers[winner] ) uniqueUsers[winner] = amount;
			else uniqueUsers[winner] += amount;
			console.log("ko", uniqueUsers[winner]);

		})
		console.log("unique", uniqueUsers);
	}



	componentDidMount() {
	}
	render(){

		const tableHeaderData = this.state.events.header || [];
		const tableBodyData = this.state.events.data || [];

		return (
			<BasicCenterContainer>
				<StyledEventWatcher>

					<h1>Event Watcher</h1>


					<div className="table">
						<div className="header">
							{tableHeaderData.map(tableHeader => (
								<div>{tableHeader}</div>
								))}
						</div>
						<div className="body">
							{tableBodyData.map(tableBody => (
								<div className="line">
									<div className="field">{tableBody.returnValues[3]}</div>
									<div className="field">{weiToEth(tableBody.returnValues[2]).toFixed(2)} ETH</div>
									<div className="field">{tableBody.transactionHash}</div>
								</div>
							))}
						</div>
					</div>


				</StyledEventWatcher>
			</BasicCenterContainer>
		)
	}

}

export default EventWatcher;