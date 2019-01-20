import React from 'react';
// css
import {StyledContractFilter} from "./styles/StyledContractFilter";
//
import RadioGroup from "../ui/RadioGroup/RadioGroup";

class ContractFilter extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
		}
	}
	componentDidMount() {
	}
	handleChangeOption = (newOption) => {
		this.props.onChangeOption(newOption);
	}

	render(){
		//
		const contractArr = this.props.contracts;
		const contracts = contractArr.map(contract => {
			return {
				label: contract.name, 
				value: contract.name,
			}
		});
		const active_option = contracts[0].value;
		return (
			<StyledContractFilter>
				<RadioGroup onChange={this.handleChangeOption} type="simple" color="#1ab9d1" active_option={active_option} options={contracts}/>
			</StyledContractFilter>
		)
	}

}

export default ContractFilter;

