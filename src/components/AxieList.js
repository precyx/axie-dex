import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
// custom
import Axie from "./Axie";
import {buildAxiesByAddressAPI} from "../services/axie-data-service.js";

//CSS
const AxieListStyle = styled.div`
	display:flex;
	flex-flow: wrap;
	width:90%;
	margin:0 auto;
	padding:20px;
`;

/**
 * Displays a list of Axies 
 * @class AxieList
 * @extends {Component}
 */
class AxieList extends Component {
	constructor(props){
		super(props);
		this.state = {
			axies:null,
			address: "0xe293390d7651234c6dfb1f41a47358b9377c004f",
			offset: 20
		};
	}

	componentWillMount(){
		this.getAxiesByAddress(this.state.address, this.state.offset);
	}

	getAxiesByAddress(address, offset){
		var api = buildAxiesByAddressAPI(address, offset);
		axios.get(api).then(data=>{
			console.log("d", data.data.axies);
			this.setState({
				axies : data.data.axies.slice(0,12),
				address: address,
				offset: offset
			});
		})
	}

	loadNextPage(){
		console.log("next page");
		/*this.setState((prevState, props) => ({
			offset: prevState.offset + 12,
			axies: null
		})); */
		this.getAxiesByAddress(this.state.address, this.state.offset+12);
	}
	loadPrevPage(){
		this.getAxiesByAddress(this.state.address, this.state.offset-12);
	}

	render() {

		if(this.state.axies){
			var axies = this.state.axies.map((axie) => 
				<Axie key={axie.id} data={axie} />
			);

			return(
				<div>
					<div>
						<button className="prev" onClick={() => this.loadPrevPage()}>Prev</button>
						<button className="next" onClick={() => this.loadNextPage()}>Next</button>
					</div>
					<AxieListStyle className="axies">
						{axies}
					</AxieListStyle>
				</div>
			);
		}
		else{
			//var img1 = require('../static/img/4321.png');
			return (
				<div>
					<h1>Loading</h1>
				</div>
			);
		}
	}
}

export default AxieList;