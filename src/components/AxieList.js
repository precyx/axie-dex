import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
// custom
import Axie from "./Axie";
import {buildAxiesByAddressAPI} from "../services/axie-data-service.js";
import Textfield from "./ui/Textfield";
import Button from "./ui/Button";

//CSS
const AxieListStyle = styled.div`
	display:flex;
	flex-flow: wrap;
	width:90%;
	margin:0 auto;
	padding:20px;
`;
const AxieControlStyled = styled.div`
	width:90%;
	margin:0 auto;
	padding:35px;
	padding-bottom:0;
	h2 {margin-bottom:15px;}
`;
const Error = styled.div`
	font-size:14px; 
	font-style:italic;
	padding:15px 20px;
	border-radius:9px;
	background: #fffaf9;
	border: 1px solid #ecb4b4;
	color: #e07070;
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
		}).catch((error)=>{
			// handle error
			this.setState({
				error:{
					name:"Error: Axie API 'axiesByAddress' down"
				}
			});
			console.log(error);
		})
	}

	loadPrevPage = () => {
		this.setState(
			(prevState) => ({offset: +prevState.offset-12}),
			this.getAxiesByAddress
		);
	}
	loadNextPage = () => {
		this.setState(
			(prevState) => ({offset: +prevState.offset+12}),
			this.getAxiesByAddress
		);
	}


	changeAddress = (event) =>{
		console.log("adr change", event);
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
					<AxieControlStyled>
						<h2>Get Axies By Address</h2>
						<div className="controlBar">

						<Textfield id="axie_list_address" value={this.state.address} name="Address" placeholder="Address" onChange={this.changeAddress} />
						<Textfield id="axie_list_offset" value={this.state.offset} name="Offset" placeholder="Offset" onChange={this.changeOffset} />
						<Textfield id="axie_list_limit" value={this.state.limit} name="Limit" placeholder="Limit" onChange={this.changeLimit} />
							<Button onClick={this.getAxiesByAddress} name={"Load Axies"} />
							<div>
								<Button className="prev" onClick={this.loadPrevPage} name={"Prev"} />
								<Button className="next" onClick={this.loadNextPage} name={"Next"} />
							</div>
						</div>
					</AxieControlStyled>
					<AxieListStyle className="axies">
						{axies}
					</AxieListStyle>
				</div>
			);
		}
		else{
			if(this.state.error){
				return (
					<Error>
						{this.state.error.name}
					</Error>
				)
			}
			else {
				return (
					<div>
						<h1>Loading</h1>
					</div>
				);
			}
			//var img1 = require('../static/img/4321.png');
		}
	}
}

export default AxieList;