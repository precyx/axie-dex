import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// own
import Textfield from '../ui/Textfield';
import Button from '../ui/Button';
import {AXIE_DATA_V1, AXIE_ICU} from "../../services/axie-data-service.js";
import BasicCenterContainer from "../containers/BasicCenterContainer"; 
import AxieListControl from '../AxieListControl';
import StatusBox from "../StatusBox";
import RadioGroup from '../ui/RadioGroup/RadioGroup';
import RadioButton from '../ui/RadioButton/RadioButton';
import Select from '../ui/Select/Select';
import {SimpleSelect, ListOption} from '../ui/Select/SimpleSelect';
import ExpansionPanel from '../ui/ExpansionPanel/ExpansionPanel';

import {bodyparts} from "../../data/axie-body-parts";

//CSS
const StyledEncyclopedia = styled.div`
	position:relative;

	h1 {margin-top:15px;}
	.count {font-weight: normal; color: grey; font-size: 14px;}

	.filterSwitch {}
	.filterSwitch .radioButton { width:50%;}

	.getAxieByAddressContainer {width:90%; margin:0 auto; padding:30px; }
	.center {display:flex; justify-content:center;}
	.button {margin:5px;}

	.filterBoard { background: white; z-index:100; width:380px; padding: 20px; box-shadow: 0 2px 2px #0000002e; border-radius: 10px; position:absolute; left:0; top:20px;}
	.filterBoard .headbar {display:flex; justify-content:space-between; border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
	.filterBoard .headbar > .radiogroup {border:none;}
	.filterBoard .radiogroup { flex-flow: wrap; border-bottom: 1px solid rgba(0, 0, 0, 0.1); padding: 8px 0; }
	.loadDataButton {}

	.headerBar {display:flex; justify-content:center; flex-flow: column; align-items: center;}
	.pageBar {display:inline-flex; margin-bottom:30px; justify-content: center; align-items: center; font-size: 14px; color: #757575;}
	.pageBar label {display:none;}
	.pageBar input {width: 60px; text-align: center; margin: 0 10px;}
	.pageBar .button {width: 60px; text-align: center; margin: 0 10px;}
	.pageBar .text {white-space:pre;}

	.partGroup {border-bottom: 1px solid #e6e6e6;}
	.partGroup .panel-label {display: flex; cursor:pointer; align-items: center; justify-content: space-between;}
	.partGroup .label {display:flex; font-weight: 500; font-size: 14px; color: #9e9e9e; text-transform: uppercase; padding:20px 0px; }
	.partGroup .panel-label:hover .label-text {color:#333; }
	.partGroup .label .count {margin-left:5px; color:#bdbdbd;}
	.partGroup .parts {}
	.partGroup .radiogroup {border:none;}

	.axieList { margin-left: 370px; justify-content: flex-start; width: 1300px;}
`;

// Class
class Encyclopedia extends Component {
	constructor(props){
		super(props);
		this.state = {
			axies: null,
			offset : 0,
			page: 1,
			totalAxies: 0,
			saleSiringParam : "",
			stageParam: "&stage=4",
			additionalParams : "",
			filter : {},
			sorting : "",
			geneFilter: {},
			filterView: "axie",
			query: "",
		}
	}

	componentWillMount(){
		//this.getAxies();

		this.getAxies2();
	}


	getAxies2 = async () => {
		this.setState({ status: {type:"loading", code:"loading_axies", msg: "loading axies..."} });

		const query = this.buildAxieQuery();
		const AXIES_PER_PAGE = 10;
		const skip = Math.max(0, this.state.page * AXIES_PER_PAGE - AXIES_PER_PAGE);
		let axiesData = await AXIE_ICU.getAxies(`skip=${skip}${query}`);
		let axies = axiesData.results;
		console.log("ax", axiesData);

		this.setState({
			axies: axies,
			totalPages: Math.ceil(axiesData.total / AXIES_PER_PAGE),
			totalAxies: axiesData.total,
			status: {type:"completed", code:"all_loaded", msg: "loading complete!"},
		});
	}

	buildAxieQuery = () => {
		const filter = this.state.filter;
		const sorting = this.state.sorting;
		const geneFilter = this.state.geneFilter;
		console.log("sort", sorting);
		let query = "";

		if(this.validFilter(filter["color"])) query += `&gene_detail.color.d=${filter["color"]}`;
		if(this.validFilter(filter["pattern"])) query += `&gene_detail.pattern.d=${filter["pattern"]}`;
		if(this.validFilter(filter["class"])) query += `&class=${filter["class"]}`;
		if(this.validFilter(filter["stage"])) query += `&stage=${filter["stage"]}`;
		if(this.validFilter(filter["pureness"])) query += `&pureness.purest.count=${filter["pureness"]}`;
		if(this.validFilter(filter["title"])) query += `&title=${filter["title"]}`;
		if(this.validFilter(filter["auction"])) query += `&auction.type=${filter["auction"]}`;

		Object.keys(geneFilter).forEach(geneKey => {
			const partKey = geneFilter[geneKey];
			console.log("kl", partKey);
			if(this.validFilter(partKey)) query+= `&parts.${geneKey}.id=${partKey}`;
		})

		if(sorting) {
			const sortingValue = sorting.split("_")[0]
			const sortingType = sorting.split("_")[1].toUpperCase();
			switch(sortingValue){
				case "id" : query += `&sort.id=${sortingType}`; break;
				case "price" : query += `&sort.auction.buyNowPrice=${sortingType}`; break;
				case "exp" : query += `&sort.exp=${sortingType}`; break;
			}
		}

		this.setState({
			query: query,
		})

		return query;
	}

	validFilter = (filter) => {
		return filter && filter != "null";
	}


	/**
	 * Gets Axies ordered highest to lowest ID and limited to 12
	 * @memberof AxieList
	 */
	getAxies = () => {
		this.setState({
			status: {type:"loading", code:"loading_axies", msg: "loading axies..."},
			additionalParams : this.state.saleSiringParam + this.state.stageParam + "&sorting=highest_id",
		}, () => {
			var api = AXIE_DATA_V1.buildAxiesAPI(this.state.page, this.state.additionalParams);
			console.log("api", api);
			axios.get(api).then((data)=>{
				console.log("Get axies:", data);
				this.setState({
					axies : data.data.axies,
					status: {type:"completed", code:"all_loaded", msg: "loading complete!"},
				});
			});
		});
	}

	getAxieSales = () => {
		this.setState({
			saleSiringParam: "&sale=1",
		}, this.getAxies);
	}

	getAxieSires = () => {
		this.setState({
			saleSiringParam: "&siring=1",
		}, this.getAxies);
	}

	
	loadPrevPage = () => {
		this.setState((prevState) => ({
			page: Math.max(1, +prevState.page-1),
		}),this.getAxies2);
	}
	loadNextPage = () => {
		this.setState((prevState) => ({
			page: Math.max(1, +prevState.page+1),
		}), this.getAxies2);
	}

	/**
	 * Generic handle change function that updates specific property of state
	 * @memberof AxieList
	 */
	handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
	
	onStageChange = (stage) => {
		this.setState(()=>({
			stageParam: "&stage="+stage,
		}));
	}

	onChangeFilter = (filterType, option) =>{
		console.log("change filter", filterType, option);
		let newFilter = Object.assign({}, this.state.filter);
		if(this.state.filter[filterType] == option) delete newFilter[filterType];
		else newFilter[filterType] = option;
		this.setState({
			page: 1,
			filter: newFilter,
		}, () => { console.log("filter", this.state.filter) }) 
	}

	onChangeGeneFilter = (partType, option) => {
		
		let newGeneFilter = Object.assign({}, this.state.geneFilter);
		if(newGeneFilter[partType] && newGeneFilter[partType] == option) delete newGeneFilter[partType];
		else newGeneFilter[partType] = option;

		this.setState({
			geneFilter: newGeneFilter,
		}, () => {
			console.log("change gene filter", this.state.geneFilter);
		})
	}

	onSelectOption = (option) => {
		this.setState({
			sorting: option.value,
		})
	}

	handleChangeFilterView = (newOption) => {
		this.setState({
			filterView: newOption,
		})
	}

	renderFilterBoard = () => {
		const filterView = this.state.filterView;
		const filter = this.state.filter;
		const geneFilter = this.state.geneFilter;

		const axieBodyParts = bodyparts.map(part => ({label: part.name, value: part.id}));
		const bodyPartsByType = {};
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
					]} active_option={"axie"} onChange={this.handleChangeFilterView}>
					</RadioGroup>

					<SimpleSelect options={[
						{label: "Lowest ID first", value: "id_asc"},
						{label: "Highest ID first", value: "id_desc"},
						{label: "Cheapest first", value: "price_asc"},
						{label: "Most expensive first", value: "price_desc"},
					]} onSelectOption={this.onSelectOption}>
					</SimpleSelect>
				</div>

				{filterView == "axie" && (
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
						]} active_option={filter["color"] || "zero"} onChange={(option) => { this.onChangeFilter("color", option) }}>
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
						]} active_option={filter["class"] || "zero"} onChange={(option) => { this.onChangeFilter("class", option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="stage" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "egg", value: "1"},
							{label: "petite", value: "3"},
							{label: "adult", value: "4"},
						]} active_option={filter["stage"] || "zero"} onChange={(option) => { this.onChangeFilter("stage", option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="pattern" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "fluffy", value: "000001"},
							{label: "big yak", value: "110001"},
							{label: "wetdog", value: "100001"},
							{label: "sumo", value: "100010"},
							{label: "curly", value: "011110"},
							{label: "spikey", value: "011101"},
							{label: "trispike", value: "000011"},
						]} active_option={filter["pattern"] || "zero"} onChange={(option) => { this.onChangeFilter("pattern", option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="pureness" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "1", value: "1"},
							{label: "2", value: "2"},
							{label: "3", value: "3"},
							{label: "4", value: "4"},
							{label: "5", value: "5"},
							{label: "6", value: "6"},
						]} active_option={filter["pureness"] || "zero"} onChange={(option) => { this.onChangeFilter("pureness", option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="tag" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "Origin", value: "Origin"},
							{label: "MEO I", value: "MEO Corp"},
							{label: "MEO II", value: "MEO Corp II"},
							{label: "Agamogenesis", value: "Agamogenesis"},
						]} active_option={filter["title"] || "zero"} onChange={(option) => { this.onChangeFilter("title", option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="auction" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "ANY", value: "null"},
							{label: "Sale", value: "sale"},
							{label: "Siring", value: "siring"},
						]} active_option={filter["auction"] || "zero"} onChange={(option) => { this.onChangeFilter("auction", option) }}>
						</RadioGroup>
						
						<Button className="loadDataButton" onClick={this.getAxies2} name={"Get Axies"} />
					
					</React.Fragment>)
				}	


				{filterView == "genes" &&
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
														onChange={(option) => {this.onChangeGeneFilter(partTypeKey, option)} }
													/>
												</div>
											}
										/>
										
									</div>
								)
							}
						)}
						<Button className="loadDataButton" onClick={this.getAxies2} name={"Get Axies"} />
					</React.Fragment>
				}

				</React.Fragment>
				);
			}
			
			render() {
				const totalAxies = this.state.totalAxies;
				const totalPages = this.state.totalPages;
				return (
					<StyledEncyclopedia>
					
					<div className="getAxiesContainer">
					<div className="headerBar">
					<h1>Encyclopedia</h1>
					<h2 className="count">{totalAxies} Axies</h2>
					<div className="pageBar">
					<Button type="color" color="#a146ef" className="prev" onClick={this.loadPrevPage} name={"Prev"} />
					<div>Page</div>
								<Textfield id="market_getaxies_page" value={this.state.page} name="" placeholder="Page" onChange={this.handleChange("page")} />
								<div className="text">of {totalPages}</div>
								<Button type="color" color="#a146ef" className="next" onClick={this.loadNextPage} name={"Next"} />
							</div>
							{/* <Textfield id="market_getaxies_additionalParams" value={this.state.additionalParams} name="Params" placeholder="Params" onChange={this.handleChange("additionalParams")} /> */}

						<div className="filterBoard">
							{this.renderFilterBoard()}
						</div>

						</div>

						{/* 
						<Button onClick={this.getAxieSales} name={"Get Sales"} />
						<Button onClick={this.getAxieSires} name={"Get Sires"} />
						
						<RadioGroup class={"radiogroup"} type="simple" options={[
							{label: "Adult", value: "4"},
							{label: "Petite", value: "3"},
							{label: "Larva", value: "2"},
						]} active_option={"4"} onChange={this.onStageChange}>
						</RadioGroup>
						*/}


					</div>
					{this.state.status.code !== "all_loaded" ? 
					<div className="center">
						<StatusBox status={this.state.status} />
					</div>
					: "" }
				
				<AxieListControl className="axieList" axies={this.state.axies} />
			</StyledEncyclopedia>
		);
	}
}

export default Encyclopedia;