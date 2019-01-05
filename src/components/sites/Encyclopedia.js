import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// own
import Textfield from '../ui/Textfield';
import Button from '../ui/Button';
import {AXIE_DATA_V1} from "../../services/axie-data-service.js";
import BasicCenterContainer from "../containers/BasicCenterContainer"; 
import AxieListControl from '../AxieListControl';
import StatusBox from "../StatusBox";
import RadioGroup from '../ui/RadioGroup/RadioGroup';

//CSS
const StyledEncyclopedia = styled.div`
	.getAxieByAddressContainer {width:90%; margin:0 auto; padding:30px; }
	.center {display:flex; justify-content:center;}
`;

// Class
class Encyclopedia extends Component {
	constructor(props){
		super(props);
		this.state = {
			axies: null,
			offset : 0,
			page: 1,
			saleSiringParam : "",
			stageParam: "&stage=4",
			additionalParams : "",
		}
	}

	componentWillMount(){
		this.getAxies();
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
			page: Math.max(1, prevState.page-1),
		}),this.getAxies);
	}
	loadNextPage = () => {
		this.setState((prevState) => ({
			page: Math.max(1, prevState.page+1),
		}), this.getAxies);
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

	render() {
		return (
			<StyledEncyclopedia>
				<BasicCenterContainer>
					<div className="getAxiesContainer">
						<h2>Get Axies</h2>
						<Textfield id="market_getaxies_page" value={this.state.page} name="Page" placeholder="Page" onChange={this.handleChange("page")} />
						<Textfield id="market_getaxies_additionalParams" value={this.state.additionalParams} name="Params" placeholder="Params" onChange={this.handleChange("additionalParams")} />
						<Button onClick={this.getAxies} name={"Get Axies"} />
						<Button onClick={this.getAxieSales} name={"Get Sales"} />
						<Button onClick={this.getAxieSires} name={"Get Sires"} />
						<div>
							<Button className="prev" onClick={this.loadPrevPage} name={"Prev"} />
							<Button className="next" onClick={this.loadNextPage} name={"Next"} />
						</div>
						<RadioGroup class={"radiogroup"} options={[
							{label: "Adult", value: "4"},
							{label: "Petite", value: "3"},
							{label: "Larva", value: "2"},
						]} active_option={"4"} onChange={this.onStageChange}>
						</RadioGroup>
					</div>
					{this.state.status.code !== "all_loaded" ? 
					<div className="center">
						<StatusBox status={this.state.status} />
					</div>
					: "" }
				</BasicCenterContainer>
				<AxieListControl axies={this.state.axies} />
			</StyledEncyclopedia>
		);
	}
}

export default Encyclopedia;