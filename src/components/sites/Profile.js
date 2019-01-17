import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// own
import AxieListControl from '../AxieListControl';
import Textfield from '../ui/Textfield';
import Button from '../ui/Button';
import {AXIE_DATA} from "../../services/axie-data-service.js";
import {AXIE_DATA_V2} from "../../services/axie-data-service";
import BasicCenterContainer from "../containers/BasicCenterContainer";
import StatusBox from "../StatusBox";
import RadioGroup from '../ui/RadioGroup/RadioGroup';
import AxieInputs from '../Profile/AxieInputs';

//CSS
const StyledProfile = styled.div`
	.count {margin-left:5px; color: #969696; font-weight: 400;}
	.center {display:flex; justify-content:center;}
	.button {margin:3px;}

	.controlBar {text-align:center;}
	.controlBar .textfield{ width:auto; margin-right:10px;}
	.controlBar .axieInput {display:inline-flex; align-items:center; }
	.controlBar .pageBar {display:flex; justify-content:center; margin-bottom:20px;}
	.controlBar .stageBar {display:flex; justify-content:center; margin-bottom:10px;}

	.loadingArea {
		position: absolute;
    background: rgba(255,255,255,0.5);
		height: calc(100vh);
		top:0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
		width: 100%;
		border-radius:3px;
	}
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
			stage: "4",
			totalAxies: 0,
			axies: null,
			status: {code:"init"},
		}
	}

	componentWillMount(){
		this.onStageChange(this.state.stage, () => {
			//this.getAxiesByAddress();
			this.getAxiesByAddressV2();

		});

	}

	

	getAxiesByAddressV2 = async () =>  {
		this.setState({ status: {type:"loading", code:"loading_axies", msg: "loading axies V2..."}, });
		const addr = this.state.address;
		const offset = this.state.offset;
		const additionalParams = this.state.additionalParams;
		var axieData = await AXIE_DATA_V2.getAxiesByAddress(addr, offset, additionalParams);
		this.setState({
			axies : axieData.axies.slice(0,this.state.limit),
			totalAxies: axieData.totalAxies,
			status: {type:"complete", code:"all_loaded", msg: "loading complete!"},
		});
	}

	/**
	 * Gets Axies by a specific user {address}
	 */
	getAxiesByAddress = (evt) => {
		this.setState({
			status: {type:"loading", code:"loading_axies", msg: "loading axies V0..."},
		});
		var api = AXIE_DATA.buildAxiesByAddressAPI(this.state.address, this.state.offset, this.state.additionalParams);
		console.log("Api", api);
		axios.get(api).then(data=>{
			console.log("d", data.data.axies);
			this.setState({
				axies : data.data.axies.slice(0,this.state.limit),
				totalAxies: data.data.totalAxies,
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
			this.getAxiesByAddressV2
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

	onStageChange = (stage, callback) => {
		this.setState({
			stage: stage,
			additionalParams: "&stage="+stage,
		}, callback);
	}



	render() {
		const status = this.state.status;
		const axies = this.state.axies;
		const totalAxies = this.state.totalAxies;
		//
		const address = this.state.address;
		const offset = this.state.offset;
		const limit = this.state.limit;
		const stage = this.state.stage;
		return (
			<StyledProfile>
				<BasicCenterContainer>
					<div className="getAxieByAddressContainer">
					<h1>Profile <span className="count">{totalAxies}</span></h1>
					<div className="controlBar">
						<AxieInputs address={address} offset={offset} limit={limit} onChange={this.handleChange} onClickSubmit={this.getAxiesByAddress}/>


						<div className="stageBar">
							<RadioGroup class={"radiogroup"} type="simple" options={[
								{label: "Adult", value: "4"},
								{label: "Petite", value: "3"},
								{label: "Larva", value: "2"},
							]} active_option={stage} onChange={this.onStageChange}>
							</RadioGroup>
						</div>

						<div className="pageBar">
							<Button className="prev" type="color" color="#a146ef" onClick={this.loadPrevPage} name={"Prev"} />
							<Button className="next" type="color" color="#a146ef" onClick={this.loadNextPage} name={"Next"} />
						</div>

					</div>
					{status.code !== "all_loaded" ? 
						<div className="center loadingArea">
							<StatusBox status={status} />
						</div>
					: "" }
				</div>
				</BasicCenterContainer>
				<AxieListControl axies={axies} />
			</StyledProfile>
		);
	}
}

export default Profile;