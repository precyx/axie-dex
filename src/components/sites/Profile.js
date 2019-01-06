import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// own
import AxieListControl from '../AxieListControl';
import Textfield from '../ui/Textfield';
import Button from '../ui/Button';
import {AXIE_DATA} from "../../services/axie-data-service.js";
import BasicCenterContainer from "../containers/BasicCenterContainer";
import StatusBox from "../StatusBox";
import RadioGroup from '../ui/RadioGroup/RadioGroup';

//CSS
const StyledProfile = styled.div`
	.center {display:flex; justify-content:center;}
	.button {margin:3px;}
`;

// Class
class Profile extends Component {

	address_pool = [
		"0x5ea1d56d0dde1ca5b50c277275855f69edefa169",
		"0x2643796cb6b4e715140f09c352ea26afff1a7d93",
		"0x4ce15b37851a4448a28899062906a02e51dee267",
		"0x1e3934ea7e416f4e2bc5f7d55ae9783da0061475",
		"0xf521bb7437bec77b0b15286dc3f49a87b9946773",
		"0xa6bcec585f12cefba9709a080ce2efd38f871024",
		"0x730952cc677b1f432893d53cbf528baccbbf2441",
		"0x21099184e7b0be245e3eed492288a07de2c64fd7",
		"0xe293390d7651234c6dfb1f41a47358b9377c004f",
	];

	constructor(props){
		super(props);
		this.state = {
			address: this.address_pool[Math.floor(Math.random() * this.address_pool.length)],
			offset: 0,
			limit: 12,
			additionalParams: "",
			axies: null,
		}
	}

	componentWillMount(){
		this.getAxiesByAddress();
	}

	/**
	 * Gets Axies by a specific user {address}
	 */
	getAxiesByAddress = (evt) => {
		this.setState({
			status: {type:"loading", code:"loading_axies", msg: "loading axies..."},
		});
		var api = AXIE_DATA.buildAxiesByAddressAPI(this.state.address, this.state.offset, this.state.additionalParams);
		console.log("Api", api);
		axios.get(api).then(data=>{
			console.log("d", data.data.axies);
			this.setState({
				axies : data.data.axies.slice(0,this.state.limit),
				status: {type:"complete", code:"all_loaded", msg: "loading complete!"},
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

	onStageChange = (stage) => {
		this.setState({
			additionalParams: "&stage="+stage,
		});
	}

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
							<Button className="prev" type="color" color="#a146ef" onClick={this.loadPrevPage} name={"Prev"} />
							<Button className="next" type="color" color="#a146ef" onClick={this.loadNextPage} name={"Next"} />
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
				</div>
				</BasicCenterContainer>
				<AxieListControl axies={this.state.axies} />
			</StyledProfile>
		);
	}
}

export default Profile;