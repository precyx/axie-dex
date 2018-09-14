import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
// custom
import Axie from "../Axie";
import {buildAxieByIdAPI} from "../../services/axie-data-service";
import Textfield from "../ui/Textfield";
import Button from "../ui/Button";
import BasicCenterContainer from "../containers/BasicCenterContainer";
import Axies from "../Axies";

//CSS
const StyledDex = styled.div`
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
 * @class Dex
 * @extends {Component}
 */
class Dex extends Component {
	constructor(props){
		super(props);
		this.state = {
			axies:null,
			others: [4688, 4169],
			topTanks: [3784, 1101, 4190, 1660, 2624, 387, 174, 2967, 2277, 2755, 2911, 2597, 858, 595, 313, 13, 1238, 199, 182, 5133],
			topAttackers: [2152, 1126, 1000, 340, 4463, 1413, 2007, 3342, 346, 1766, 4107, 2497, 44],
			axieIdList: [3889, 837, 265, 4026, 3969, 1260],
			// get axie
			axie_id: 10,
		};
	}

	componentWillMount(){
		this.getAxiesByIds();
	}

	/**
	 * Gets Axies by {ids} in a list
	 * @memberof AxieList
	 */
	getAxiesByIds = () => {
		var promises = [];
		this.state.axieIdList.forEach(id => {
			var api = buildAxieByIdAPI(id);
			var p = new Promise((resolve,reject)=>{
				axios.get(api).then((data)=>{
					resolve(data.data);
				});
			});
			promises.push(p);
		});
		Promise.all(promises).then((axies)=>{
			console.log("ax",axies);
			this.setState({
				axies: axies
			})
		});
	}

	/**
	 * Gets an Axie of a specific {id} and prepends it to the list
	 * @memberof AxieList
	 */
	getAxieById = () => {
		var api = buildAxieByIdAPI(this.state.axie_id);
		axios.get(api).then((data) => {
			var newAxie = data.data;
			console.log("X", data);
			this.setState((state) => ({
				axies : [newAxie, ...state.axies]
			}));
		})
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
		if(this.state.axies){
			return(
				<StyledDex>
					<BasicCenterContainer>
						<div className="getAxieByIdContainer">
							<h2>Get Axie By Id</h2>
							<Textfield id="axielist_getaxie_id" value={this.state.axie_id} name="Axie ID" placeholder="Axie ID" onChange={this.handleChange("axie_id")} />
							<Button onClick={this.getAxieById} name={"Get Axie"} />
						</div>
					</BasicCenterContainer>
					<Axies axies={this.state.axies}/>
				</StyledDex>
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

export default Dex;