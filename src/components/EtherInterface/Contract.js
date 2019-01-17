import React from 'react';
//
import {WEB3_V1} from "../../services/web3-service";
import Method from "./Method";
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

	/* Sets filter */
	setFilter(filterName, value) {
		let newFilters = Object.assign({}, this.state.filters);
		newFilters[filterName] = value;
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
			return (
				<Method key={i} data={method} onSend={this.handleSendMethod}/>	
			)
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
}

export default Contract;