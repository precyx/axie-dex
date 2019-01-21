import React from 'react';
//
import {WEB3_V1} from "../../services/web3-service";
import Method from "./Method";
import Event from "./Event";
import MethodFilter from "./MethodFilter";
// 
import {StyledContract} from "./styles/StyledContract";
import PropTypes from 'prop-types';
//

class Contract extends React.PureComponent{
	constructor(props){
		super(props);
		//
		this.methodsSave = this.props.abi;
		//
		this.state = {
			filters : {},
			methods: this.props.abi,
		}
	}
	componentDidMount() {
		const addr = this.props.address;
		const abi = this.props.abi;
		this.contract = WEB3_V1.getContract(abi, addr);
	}

	/* Event Handler */
	handleChangeFilter = (filter) => {
		this.setFilter("tag", filter);
	}
	handleSendMethod = (method, values, callback) => {
		const vals = Object.values(values);
		this.contract.methods[method](...vals).call().then(data => {
			callback(data);
		})
	}
	handleClickEvent = async (event, timeframe, callback) => {
		const latestBlock = await WEB3_V1.getBlock();
		//console.log("getEvents", this.contract, event);
		let fromBlock = 0;
		switch(timeframe){
			case "5m" : fromBlock = 30; break;
			case "1h" : fromBlock = 250; break;
			case "1d" : fromBlock = 6000; break;
			case "1w" : fromBlock = 42000; break;
			case "1m" : fromBlock = 168000; break;
			case "all": fromBlock = latestBlock; break;
		}
		this.contract.getPastEvents(event.name,{
			fromBlock: (latestBlock - fromBlock),
    	toBlock: latestBlock
		}).then(events => {
			callback(events);
		})
	}

	/* Sets filter */
	setFilter(filterName, value) {
		let newFilters = Object.assign({}, this.state.filters);
		newFilters[filterName] = value;
		if(this.props.onFilterChange) this.props.onFilterChange(newFilters);
		this.setState({
			filters: newFilters
		}, this.filterList)
	}

	/* filters list */
	filterList(){
		let newMethods = [...this.methodsSave];
		//if(this.state.filters["constant"]) newMethods = newMethods.filter(method => method.constant);
		console.log(this.state.filters);
		switch(this.state.filters["tag"]){
			case "all" : break;
			case "constant" : newMethods = newMethods.filter(method => method.constant); break;
			case "event" : 		newMethods = newMethods.filter(method => method.type === "event"); break;
			case "payable" : 	newMethods = newMethods.filter(method => method.payable); break;
		}
		this.setState({
			methods: newMethods,
		})
	}

	

	render(){
		const methods = this.state.methods.map((method, i) => {
			if(method.type == "event"){
				return (<Event key={i} data={method} onClickEvent={this.handleClickEvent} />)
			}
			else{
				return ( <Method key={i} data={method} onSend={this.handleSendMethod}/>	)
			}
		})
		console.log("render contract");
		return (
			<StyledContract>
				<h1>{this.props.name}</h1>
				<MethodFilter 
					onChangeFilter={this.handleChangeFilter}
				/>
				<div className="methods">
					<div className="header">{methods.length} Methods</div>
					{methods}
				</div>
			</StyledContract>
		)
	}
}

Contract.propTypes = {
	name: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	abi: PropTypes.array.isRequired,
	onFilterChange: PropTypes.func,
}

export default Contract;