import React  from "react";
import {StyledSimpleSelect} from "./styles/StyledSimpleSelect";

export interface ListOption {
	label:string,
	value:string,
}

interface SimpleSelectProps {
	options:Array<ListOption>,
	onSelectOption:Function,
}

interface SimpleSelectState {
	selectedOption?: ListOption,
	showList:boolean;
}

export class SimpleSelect extends React.PureComponent<SimpleSelectProps, SimpleSelectState> {

	constructor(props:SimpleSelectProps) {
		super(props);
		this.state = {
			selectedOption : this.props.options[0],
			showList: false,
		}
	}

	onClickOption = (option:ListOption) => {
		this.setState({
			selectedOption: option,
			showList : false,
		})
		if(this.props.onSelectOption) this.props.onSelectOption(option);
	}

	onClickMenuButton = () => {
		this.setState(prevState => ({
			showList : !prevState.showList,
		}))
	}

	render(){
		const selectedValue = this.state.selectedOption ? this.state.selectedOption.value : "";
		const selectedLabel = this.state.selectedOption ? this.state.selectedOption.label : "";
		return (
			<StyledSimpleSelect>
				<div className="button" onClick={this.onClickMenuButton}>{selectedLabel || "Menu"}</div>
				{this.state.showList &&
					<div className="list">
						{this.props.options.map((option, i) => {
							const isOptionActive = option.value == selectedValue;
							return <div key={option.value} className={`option ${isOptionActive && "active"}`} onClick={() => { this.onClickOption(option) }}>
								{option.label}
							</div>
						}
						)}
					</div>
				}
			</StyledSimpleSelect>
		)
	}

}