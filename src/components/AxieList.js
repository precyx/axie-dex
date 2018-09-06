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
			offset: 50,
			limit: 12
		};
	}

	componentWillMount(){
		this.getAxiesByAddress();
	}

	getAxiesByAddress = () => {
		//this.setState({axies: null});
		var api = buildAxiesByAddressAPI(this.state.address, this.state.offset);
		axios.get(api).then(data=>{
			console.log("d", data.data.axies);
			this.setState({
				axies : data.data.axies.slice(0,this.state.limit),
			});
		})
	}

	loadPrevPage(){
		this.setState(
			(prevState) => ({offset: +prevState.offset-12}),
			this.getAxiesByAddress
		);
	}
	loadNextPage(){
		this.setState(
			(prevState) => ({offset: +prevState.offset+12}),
			this.getAxiesByAddress
		);
	}


	changeAddress = (event) =>{
    this.setState({address: event.target.value});
  }
  changeOffset = (event) =>{
    this.setState({offset: event.target.value});
  }
  changeLimit = (event) =>{
    this.setState({limit: event.target.value});
  }

	render() {
		if(this.state.axies){
			var axies = this.state.axies.map((axie) => 
				<Axie key={axie.id} data={axie} />
			);

			return(
				<div>
					<input type="text" value={this.state.address} onChange={this.changeAddress} className="address" placeholder="Address" />
					<input type="text" value={this.state.offset} onChange={this.changeOffset} className="offset"  placeholder="Offset" />
					<input type="text" value={this.state.limit} onChange={this.changeLimit} className="limit"  placeholder="Limit" />
					<button onClick={this.getAxiesByAddress}>Load Axies</button>
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