import React from "react";

import {Select2} from "./Select2";
import {Toggle} from "../Toggle/Toggle";

import styled, {css} from 'styled-components';

const StyledOptionBoard:any = css`
	background:white;
	box-shadow: 0 2px 2px black;
	display:flex;
	flex-flow:column;
`; 

interface OptionBoardProps {
	onChange:(options:{[key:string]:string}) => void,
	deselect?:boolean,
	multiselect?:boolean,
}

export class OptionBoard extends React.PureComponent<OptionBoardProps>{
	constructor(props:OptionBoardProps){
		super(props);
	}
	
	changeOption = (options:any) => {
		const {onChange} = this.props; 
		if(onChange) onChange(options);
	}
	
	render():JSX.Element{
		const {children, deselect, multiselect} = this.props;
		console.log("m", multiselect);
		return (
			<Select2 style={StyledOptionBoard} deselect={deselect} multiselect={multiselect} onChange={this.changeOption}>
				{children}
			</Select2>
	)}
} 