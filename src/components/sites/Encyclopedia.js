import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// own
import Textfield from '../ui/Textfield';
import Button from '../ui/Button';
import {AXIE_DATA_V1} from "../../services/axie-data-service.js";
import BasicCenterContainer from "../containers/BasicCenterContainer"; 
import AxieList from '../AxieList';

//CSS
const StyledEncyclopedia = styled.div`
	.getAxieByAddressContainer {width:90%; margin:0 auto; padding:30px; }
`;

// Class
class Encyclopedia extends Component {
	constructor(props){
		super(props);
		this.state = {
			axies: null,
			offset : 0,
			page: 1,
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
		var api = AXIE_DATA_V1.buildAxiesAPI(this.state.page, this.state.additionalParams);
		axios.get(api).then((data)=>{
			console.log("Get axies:", data);
			this.setState({
				axies : data.data.axies
			});
		});
	}

	getAxieSales = () => {
		var saleParam = "sale=1";
		var connector;
		if(this.state.page) connector = "&";
		else connector = "?";
		this.setState({
			additionalParams: connector + saleParam,
		}, this.getAxies);
	}

	getAxieSires = () => {
		var saleParam = "siring=1";
		var connector;
		if(this.state.page) connector = "&";
		else connector = "?";
		this.setState({
			additionalParams: connector + saleParam,
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
					</div>
				</BasicCenterContainer>
				<AxieList axies={this.state.axies}/>
			</StyledEncyclopedia>
		);
	}
}

export default Encyclopedia;