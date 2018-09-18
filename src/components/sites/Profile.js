import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// own
import AxieList from '../AxieList';
import Textfield from '../ui/Textfield';
import Button from '../ui/Button';
import {buildAxiesByAddressAPI} from "../../services/axie-data-service.js";
import BasicCenterContainer from "../containers/BasicCenterContainer";

//CSS
const StyledProfile = styled.div`
`;

// Class
class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			address: "0xe293390d7651234c6dfb1f41a47358b9377c004f",
			offset: 0,
			limit: 12,
			axies: null,
		}
	}

	componentWillMount(){
		this.getAxiesByAddress();
	}

	/**
	 * Gets Axies by a specific user {address}
	 */
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
			<StyledProfile>
				<BasicCenterContainer>
					<div className="getAxieByAddressContainer">
					<h2>Get Axies By Address</h2>
					<div className="controlBar">
					<Textfield id="profile_getAxiesByAddress_address" value={this.state.address} name="Address" placeholder="Address" onChange={this.handleChange("address")} />
					<Textfield id="profile_getAxiesByAddress_offset" value={this.state.offset} name="Offset" placeholder="Offset" onChange={this.handleChange("offset")} />
					<Textfield id="profile_getAxiesByAddress_limit" value={this.state.limit} name="Limit" placeholder="Limit" onChange={this.handleChange("limit")} />
						<Button onClick={this.getAxiesByAddress} name={"Load Axies"} />
						<div>
							<Button className="prev" onClick={this.loadPrevPage} name={"Prev"} />
							<Button className="next" onClick={this.loadNextPage} name={"Next"} />
						</div>
					</div>
				</div>
				</BasicCenterContainer>
				<AxieList axies={this.state.axies}/>
			</StyledProfile>
		);
	}
}

export default Profile;