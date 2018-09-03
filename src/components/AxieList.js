import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
// custom
import Axie from "./Axie";
import {buildAxiesByAddressAPI} from "../services/axie-data-service.js";


const AxieListStyle = styled.div`
	display:flex;
	flex-flow: wrap;
	width:1000px;
	margin:0 auto;
	padding:20px;
`;

class AxieList extends Component {
	constructor(props){
		super(props);
		this.state = {
			axies:null
		};
	}

	componentWillMount(){
		this.getAxiesByAddress("0xe293390d7651234c6dfb1f41a47358b9377c004f", 39);
	}

	getAxiesByAddress(address, offset){
		var api = buildAxiesByAddressAPI(address, offset);
		axios.get(api).then(data=>{
			console.log("d", data.data.axies);
			this.setState( {axies : data.data.axies.slice(0,50) } );
		})
	}

	render() {
		if(this.state.axies){
			var axies = this.state.axies.map((axie) => 
				<Axie key={axie.id} data={axie} />
			);

			return(
				<AxieListStyle className="axies">
					{axies}
				</AxieListStyle>
			);
		}
		else{
			var img1 = require('../static/img/4321.png');
			return (
				<div>
					<h1>Loading</h1>
					<img src={img1}/>
				</div>
			);
		}
	}
}

export default AxieList;