import React from "react";

import RadioGroup from '../ui/../RadioGroup/RadioGroup';
import RadioButton from '../ui/../RadioButton/RadioButton';
import {SimpleSelect, ListOption} from '../ui/../Select/SimpleSelect';
import ExpansionPanel from '../ui/../ExpansionPanel/ExpansionPanel';
import Button from '../../ui/Button';
import {TextField} from '../../ui/TextField/TextField';

import {bodyparts} from "../../../data/axie-body-parts";

import styled, {css} from "styled-components";


const StyledAxieFilter:any = styled.div`
  background: white; z-index:100; width:380px; padding: 20px; box-shadow: 0 2px 2px #0000002e; border-radius: 10px; position:absolute; left:0; top:20px;}
	.headbar {display:flex; justify-content:space-between; border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
	.headbar > .radiogroup {border:none;}
	.radiogroup { flex-flow: wrap; border-bottom: 1px solid rgba(0, 0, 0, 0.1); padding: 8px 0; }

	.tfield {margin-top:10px;}
`;

enum FilterViewMode {
  Axie = "axie",
  Genes = "genes",
  User = "user"
}

enum FilterType {
  Color = "color",
  Class = "class",
  Stage = "stage",
  Pattern = "pattern",
  Pureness = "pureness",
  Title = "title",
  Auction = "auction",
  Owner = "owner",
}

enum PartType {
  Eyes = "eyes",
  Ears = "ears",
  Mouth = "mouth",
  Horn = "horn",
  Back = "back",
  Tail = "tail",
}


interface Filter {
  [filtername:string] : string,
}

interface GeneFilter {
  [filtername:string] : string
}

/*
interface Filter {
  color:string,
  class:string,
  stage:string,
  pattern:string,
  pureness:string,
  tag:string,
}

interface GeneFilter {
  eyes:string,
  ears:string,
  mouth:string,
  horn:string,
  back:string,
  tail:string,
}*/

interface AxieFilterProps {
  onLoadData?(filter:Filter, geneFilter:Filter, sorting:string):Function,
  onChangeFilter?(filter:Filter):any,
  onChangeGeneFilter?(filter:Filter):any,
  onChangeSorting?(sorting:string):any,
}

interface AxieFilterState{
  viewMode:FilterViewMode,
  filter:Filter,
  geneFilter:Filter,
  sorting: string,
  address: string,
}


export class AxieFilter extends React.PureComponent<AxieFilterProps, AxieFilterState>{

  constructor(props:AxieFilterProps){
    super(props);
    this.state = {
      viewMode: FilterViewMode.Axie,
      filter: {},
      geneFilter: {},
			sorting : "",
			address: "",
    }
  }

  
	onChangeFilter = (filterType:FilterType, option:string) =>{
		console.log("change filter", filterType, option);
		let newFilter = Object.assign({}, this.state.filter);
		if(this.state.filter[filterType] == option) delete newFilter[filterType];
		else newFilter[filterType] = option;
		this.setState({
			filter: newFilter,
		}, () => { 
      console.log("filter", this.state.filter) 
      if(this.props.onChangeFilter) this.props.onChangeFilter(this.state.filter);
    }) 
	}

	onChangeGeneFilter = (partType:PartType, option:string) => {
		
		let newGeneFilter = Object.assign({}, this.state.geneFilter);
		if(newGeneFilter[partType] && newGeneFilter[partType] == option) delete newGeneFilter[partType];
		else newGeneFilter[partType] = option;

		this.setState({
			geneFilter: newGeneFilter,
		}, () => {
      console.log("change gene filter", this.state.geneFilter);
      if(this.props.onChangeGeneFilter) this.props.onChangeGeneFilter(this.state.geneFilter);
		})
	}

	onSelectOption = (option:{[V:string]:string}) => {
		this.setState({
			sorting: option.value,
		}, () => {
      if(this.props.onChangeSorting) this.props.onChangeSorting(this.state.sorting);
    })
	}

	handleChangeViewMode = (viewMode:FilterViewMode) => {
		this.setState({ viewMode: viewMode })
  }
  
  handleClickLoadButton = () => {
    if(this.props.onLoadData) this.props.onLoadData(
      this.state.filter,
      this.state.geneFilter, 
			this.state.sorting,
    );
	}
	
	handleChangeAddress = (value:string) => {
		this.setState({ address: value}, () => {

		});
	}
  
	renderAxieFilter = () => {
		const viewMode:FilterViewMode = this.state.viewMode;
		const filter:Filter | undefined = this.state.filter;
		const geneFilter:Filter | undefined = this.state.geneFilter;

		//const axieBodyParts = bodyparts.map(part => ({label: part.name, value: part.id}));
		const bodyPartsByType:{[key:string]:any} = {};
		["eyes", "ears", "mouth", "horn", "back", "tail"].forEach(partType => {
			bodyPartsByType[partType] = bodyparts
				.filter(part => part.type == partType)
				.map(part => ({label: part.name, value: part.id}));
		})
		console.log("xd", bodyPartsByType);
		return (

				<React.Fragment>
					
				<div className="headbar">
					<RadioGroup className="filterSwitch" class={"radiogroup"} color="#f346cc" type="modern" options={[
						{label: "Axie", value: "axie"},
						{label: "Genes", value: "genes"},
						{label: "User", value: "user"},
					]} active_option={"axie"} onChange={this.handleChangeViewMode}>
					</RadioGroup>

					<SimpleSelect options={[
						{label: "Lowest ID first", value: "id_asc"},
						{label: "Highest ID first", value: "id_desc"},
						{label: "Cheapest first", value: "price_asc"},
						{label: "Most expensive first", value: "price_desc"},
					]} onSelectOption={this.onSelectOption}>
					</SimpleSelect>
				</div>

				{viewMode == FilterViewMode.Axie && (
					<React.Fragment>
						<RadioGroup enableDeselect={true} label="color" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "white", value: "ffffff"},
							{label: "black", value: "7a6767"},
							{label: "orange", value: "ffa12a"},
							{label: "yellow", value: "ffec51"},
							{label: "dirt", value: "f0c66e"},
							{label: "purple", value: "ef93ff"},
							{label: "blue", value: "759edb"},
							{label: "sky blue", value: "2de8f2"},
							{label: "cyan", value: "4cffdf"},
							{label: "lime", value: "ccef5e"},
							{label: "red", value: "f74e4e"},
							{label: "pink", value: "ffb4bb"},
							{label: "toxic", value: "43e27d"},
							{label: "star", value: "c0fcfe"},
							{label: "grey", value: "d0dada"},
						]} active_option={filter["color"] || "zero"} onChange={(option:string) => { this.onChangeFilter(FilterType.Color, option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="class" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "beast", value: "beast"},
							{label: "aquatic", value: "aquatic"},
							{label: "plant", value: "plant"},
							{label: "reptile", value: "reptile"},
							{label: "bird", value: "bird"},
							{label: "bug", value: "bug"},
							{label: "nut", value: "hidden_1"},
							{label: "star", value: "hidden_2"},
							{label: "moon", value: "hidden_3"},
						]} active_option={filter["class"] || "zero"} onChange={(option:string) => { this.onChangeFilter(FilterType.Class, option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="stage" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "egg", value: "1"},
							{label: "petite", value: "3"},
							{label: "adult", value: "4"},
						]} active_option={filter["stage"] || "zero"} onChange={(option:string) => { this.onChangeFilter(FilterType.Stage, option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="pattern" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "fluffy", value: "000001"},
							{label: "big yak", value: "110001"},
							{label: "wetdog", value: "100001"},
							{label: "sumo", value: "100010"},
							{label: "curly", value: "011110"},
							{label: "spikey", value: "011101"},
							{label: "trispike", value: "000011"},
						]} active_option={filter["pattern"] || "zero"} onChange={(option:string) => { this.onChangeFilter(FilterType.Pattern, option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="pureness" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "1", value: "1"},
							{label: "2", value: "2"},
							{label: "3", value: "3"},
							{label: "4", value: "4"},
							{label: "5", value: "5"},
							{label: "6", value: "6"},
						]} active_option={filter["pureness"] || "zero"} onChange={(option:string) => { this.onChangeFilter(FilterType.Pureness, option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="tag" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "Origin", value: "Origin"},
							{label: "MEO I", value: "MEO Corp"},
							{label: "MEO II", value: "MEO Corp II"},
							{label: "Agamogenesis", value: "Agamogenesis"},
						]} active_option={filter["title"] || "zero"} onChange={(option:string) => { this.onChangeFilter(FilterType.Title, option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="auction" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "ANY", value: "null"},
							{label: "Sale", value: "sale"},
							{label: "Siring", value: "siring"},
						]} active_option={filter["auction"] || "zero"} onChange={(option:string) => { this.onChangeFilter(FilterType.Auction, option) }}>
						</RadioGroup>
						
						{this.renderLoadButton()}
					
					</React.Fragment>)
				}	


				{viewMode == FilterViewMode.Genes &&
					<React.Fragment>
						{/*<Select multiple type="chip" color="#b8a9b7" options={axieBodyParts} active={geneFilter} onChange={this.onChangeGeneFilter }/>*/}

						{Object.keys(bodyPartsByType).map((partTypeKey, i) => {
							return (
									<div className="partGroup" key={i}>

										<ExpansionPanel 
											label={
												<React.Fragment>
													<div className="label">{partTypeKey} <p className="count">{bodyPartsByType[partTypeKey].length}</p></div>
													
												</React.Fragment>
											} 
											closedContent={
												<>
													{geneFilter[partTypeKey] && 
														<RadioButton type="chip" active={true}>
															{geneFilter[partTypeKey]}
														</RadioButton> 
													}
												</>
											}
											content={
												<div className="parts">
													<RadioGroup 
														enableDeselect={true}
														type="chip"
														color="#a146ef"
														options={bodyPartsByType[partTypeKey]} 
														active_option={geneFilter[partTypeKey] || ""} 
														onChange={(option:string) => {this.onChangeGeneFilter(partTypeKey as PartType, option)} }
													/>
												</div>
											}
										/>
										
									</div>
								)
							}
						)}
						{this.renderLoadButton()}
					</React.Fragment>
        }
        
				{viewMode == FilterViewMode.User &&
					<>
						<TextField
							className="tfield" 
							label="address"
							value={this.state.filter[FilterType.Owner]}
							onChange={(value:string) => { this.onChangeFilter(FilterType.Owner, value) }}
							/>
							{this.renderLoadButton()}
					</>
        }

				</React.Fragment>
				);
			}
			

			renderLoadButton = () => {
				return <Button className="loadDataButton" onClick={this.handleClickLoadButton} name={"Get Axies"} />
			}
      
  render(){
    return <StyledAxieFilter>
      {this.renderAxieFilter()}
    </StyledAxieFilter> 
    
  }
}