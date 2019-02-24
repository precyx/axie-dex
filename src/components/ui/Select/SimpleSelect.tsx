import React  from "react";
import {StyledSimpleSelect} from "./styles/StyledSimpleSelect";
import {Select2} from "./Select2";
import {Toggle} from "../Toggle/Toggle";

import {StyledToggleBase} from "../Toggle/ToggleBase";

import styled, {css} from 'styled-components';

interface SimpleSelectProps {
	options?:any,
	onChangeOption?:any,
	deselect?:any,
	multiselect?:any,
}

interface SimpleSelectState {
	showList:boolean;
}


export const StyledOption = styled(StyledToggleBase)<{isOn?:boolean}>`
	font-size:14px;
	color:grey;
	padding:12px 15px;
	width:100%;
	
	:hover {
		background:whitesmoke;
	}

	${props => props.isOn && `
		&&{
			color:black;
			font-weight:500;
		}
	`}
`;


const StyledOptionBoard = styled.div`
	position:absolute; 
	top:50px;
	left:0;
	padding:10px 0;
	min-width: 140px;
  z-index: 100;
	background:white;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
	display:flex;
	flex-flow:column;
`; 

export class SimpleSelect extends React.PureComponent<SimpleSelectProps, SimpleSelectState> {

	constructor(props:SimpleSelectProps) {
		super(props);
		this.state = {
			showList: false,
		}
	}

	onClickMenuButton = () => {
		this.setState(prevState => ({
			showList : !prevState.showList,
		}))
	}

	render(){
		const {children, options, deselect, multiselect, onChangeOption} = this.props;
		console.log("o", options);
		return (
			<StyledSimpleSelect>
				<div className="button" onClick={this.onClickMenuButton}>Menu</div>
				{this.state.showList &&
					<Select2 CustomComponent={StyledOptionBoard} options={options} deselect={deselect} multiselect={multiselect} onChange={onChangeOption} >
						{children}
					</Select2>
				}
			</StyledSimpleSelect>
		)
	}

}