import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// own
import Textfield from '../ui/Textfield';
import Button from '../ui/Button';
import {AXIE_DATA_V1, AXIE_ICU} from "../../services/axie-data-service.js";
import AxieListControl from '../AxieListControl';
import StatusBox from "../StatusBox";
import {AxieFilter} from '../ui/Filter/AxieFilter';


//CSS
const StyledEncyclopedia = styled.div`
	position:relative;
	display:flex;
	margin-top:-20px;

	.col {
		position:relative;
	}
	.col-left {
		flex-basis: 20%;
    min-width: 400px;
	}
	.col-right {
		flex-basis: 80%;
		margin-left:20px;
		margin-right:20px;
	}
	

	h1 {margin-top:15px; margin-bottom:10px; text-align:left;}
	.count {font-weight: normal; color: grey; font-size: 14px;}

	.filterSwitch {}
	.filterSwitch .radioButton { width:50%;}

	.getAxieByAddressContainer {width:90%; margin:0 auto; padding:30px; }
	.center {display:flex; justify-content:center;}
	.button {margin:5px;}
	.loadDataButton {    
		top: 52px;
		right: -20px;
	}

	.statusBox {position:absolute; right:20px; top:20px;}

	.headerBar {display:flex; flex-flow:column;}

	.pageBar {display:flex; justify-content:center; margin-bottom:20px; font-size: 14px; color: #757575;}
	.pager {display:flex; align-items:center; }
	.pageBar label {display:none;}
	.pageBar input {width: 60px; text-align: center; margin: 0 10px;}
	.pageBar .button {width: 60px; text-align: center; margin: 0 10px;}
	.pageBar .text {white-space:pre;}

	.bottomBar {margin-top:20px; margin-bottom:20px; display:flex; align-items:center; justify-content:center;}

	.partGroup {border-bottom: 1px solid #e6e6e6;}
	.partGroup .panel-label {display: flex; cursor:pointer; align-items: center; justify-content: space-between;}
	.partGroup .label {display:flex; font-weight: 500; font-size: 14px; color: #9e9e9e; text-transform: uppercase; padding:20px 0px; }
	.partGroup .panel-label:hover .label-text {color:#333; }
	.partGroup .label .count {margin-left:5px; color:#bdbdbd;}
	.partGroup .parts {}
	.partGroup .radiogroup {border:none;}

	.axieList {
		justify-content: left;
		background: #f9f9f9;
    border-radius: 20px;
		padding: 20px;
	}
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
			geneFilter: {},
			sorting : "",
			address: "",
			query: "",
		}
	}

	componentWillMount(){
		//this.getAxies();

		this.getAxies2();
	}


	getAxies2 = async (filter, geneFilter, sorting) => {
		this.setState({ status: {type:"loading", code:"loading_axies", msg: "loading axies..."} });

		const query = this.buildAxieQuery(filter, geneFilter, sorting);
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
		const address = this.state.address;
		let query = "";

		if(this.validFilter(filter["color"])) query += `&gene_detail.color.d=${filter["color"]}`;
		if(this.validFilter(filter["pattern"])) query += `&gene_detail.pattern.d=${filter["pattern"]}`;
		if(this.validFilter(filter["class"])) query += `&class=${filter["class"]}`;
		if(this.validFilter(filter["stage"])) query += `&stage=${filter["stage"]}`;
		if(this.validFilter(filter["pureness"])) query += `&pureness.purest.count=${filter["pureness"]}`;
		if(this.validFilter(filter["title"])) query += `&title=${filter["title"]}`;
		if(this.validFilter(filter["auction"])) query += `&auction.type=${filter["auction"]}`;
		if(this.validFilter(filter["owner"])) query += `&owner=${filter["owner"].toLowerCase()}`;
		if(this.validFilter(filter["breeding"])) query += `&canBreed=true`;
		if(this.validFilter(filter["mystics"])) query += `&mysticCount=${filter["mystics"]}`;

		Object.keys(geneFilter).forEach(geneKey => {
			const partKey = geneFilter[geneKey]["part"];
			console.log("kl", partKey);
			const geneRange = geneFilter[geneKey]["gene_range"];
			if(this.validFilter(geneRange) && this.validFilter(partKey)) {
				geneRange.map(geneVal => {
					query+= `&gene_detail.${geneKey}.${geneVal}.id=${partKey}`;
				})
			}
			if(this.validFilter(partKey)) query+= `&parts.${geneKey}.id=${partKey}`;
			/*if(this.validFilter(partKey)){

			}*/
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

	loadData = () => {

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

	onChangeFilter = (filter) =>{
		console.log("f", filter);
		/*console.log("change filter", filterType, option);
		let newFilter = Object.assign({}, this.state.filter);
		if(this.state.filter[filterType] == option) delete newFilter[filterType];
		else newFilter[filterType] = option;
		this.setState({
			page: 1,
			filter: newFilter,
		}, () => { console.log("filter", this.state.filter) }) */
	}

	onChangeGeneFilter = (filter) => {
		console.log("gen f", filter);
		
		/*let newGeneFilter = Object.assign({}, this.state.geneFilter);
		if(newGeneFilter[partType] && newGeneFilter[partType] == option) delete newGeneFilter[partType];
		else newGeneFilter[partType] = option;

		this.setState({
			geneFilter: newGeneFilter,
		}, () => {
			console.log("change gene filter", this.state.geneFilter);
		})*/
	}

	onChangeSorting = (sorting) => {
		console.log("s", sorting);
		/*this.setState({
			sorting: option.value,
		})*/
	}

	onChangeAddress = (address) => {}

	onLoadData = (filter, geneFilter, sorting, address) => {
		console.log("appply filter", filter, geneFilter, sorting, address);
		this.setState({
			filter: filter,
			geneFilter: geneFilter,
			sorting: sorting,
			address, address,
		}, () => {
			this.getAxies2();
		});
		
	}

		render() {
			const totalAxies = this.state.totalAxies;
			const totalPages = this.state.totalPages;
			return (
					<StyledEncyclopedia>

					<div className="col col-left">
						<AxieFilter 
								onChangeFilter={this.onChangeFilter}
								onChangeGeneFilter={this.onChangeGeneFilter}
								onChangeSorting={this.onChangeSorting}
								onLoadData={this.onLoadData}
							/>
					</div>
					<div className="col col-right">

						<div className="headerBar">
							<h1>Encyclopedia</h1>
							<h2 className="count">{totalAxies} Axies</h2>
						</div>


						<div className="pageBar">
								<div className="pager">
									<Button type="color" color="#a146ef" className="prev" onClick={this.loadPrevPage} name={"Prev"} />
									<div>Page</div>
									<Textfield id="market_getaxies_page" value={this.state.page} name="" placeholder="Page" onChange={this.handleChange("page")} />
									<div className="text">of {totalPages}</div>
									<Button type="color" color="#a146ef" className="next" onClick={this.loadNextPage} name={"Next"} />
								</div>
						</div>

						{this.state.status.code !== "all_loaded" ? 
						<div className="statusBox">
							<StatusBox status={this.state.status} />
						</div>
						: "" }
				
					<AxieListControl className="axieList" axies={this.state.axies} />


											
				</div>
			</StyledEncyclopedia>
		);
	}
}

export default Encyclopedia;