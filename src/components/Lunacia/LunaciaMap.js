import React, { Component } from 'react';
import Web3 from "web3";
import {WEB3_V1} from "../../services/web3-service"; 
import {AI_CONTRACTS, AI_ABIS} from "../../data/contracts/AxieInfinity/AxieInfinityContracts";
import {LAND_BUYERS_1} from "../Lunacia/data/data";
import {LAND_DATA} from "../../services/land-data"
import Plot from "./Plot";
import StatusBox from "../StatusBox";
import Button from "../ui/Button";
import Draggable from 'react-draggable';
import TimeAgo from 'react-timeago';
import {randomHex, shadeColor2} from "../../services/utils";
import {randomColor} from "randomcolor";
// css
import {StyledLunacia} from "./styles/StyledLunacia";

class LunaciaMap extends React.PureComponent {

	constructor(props){
		super(props);

		this.LAND_SALE_GENESIS_BLOCK = 7108917;
		this.LAND_SALE_V2_GENESIS_BLOCK = 7115901;

		this.state = {
			totalPlots: 17217,
			plotsPurchased: 0,
			lastUpdated: 1548357929,
			BASE_MAP_SIZE: 602,
			mapSize: 602,
			numPlots: 301,
			zoom: 1,
			plots: [],
			uniqueBuyers: [],
			plotsPerPlayer : [],
			status: {},
		}
	}

	componentDidMount() {
		WEB3_V1.connectWeb3();
		this.getChestEvents();
		//this.loadPlotsOfAddress(); 
		//this.loadPlotsOfAddresses(LAND_BUYERS_1); 
	}

	async loadPlotsOfAddress() {
		const landBuyers = LAND_BUYERS_1;
		const demoAddr = "0xE293390d7651234c6DFB1f41a47358B9377C004F";
		const land = await LAND_DATA.getLandOfAddress(demoAddr);
		console.log("land", land);
		this.setState({
			plots: land
		})
	}

	async loadPlotsOfAddresses(_addresses) {
		this.setState({status: {msg: "rendering plots..."}});
		const promises = [];
		_addresses.forEach(addr => {
			promises.push(LAND_DATA.getLandOfAddress(addr));
		})
		Promise.all(promises).then(lands => {
			console.log("lands", lands);
			let numLand = 0;
			lands.forEach(player => player.forEach(land => numLand++));
			this.setState({
				plotsPurchased: numLand,
				plotsPerPlayer: lands,
				status: "",
			})
		})
	}


	async getChestEvents (){

		let uniqueBuyers = [];
		const uniqueBuyers1 = await this.getUniqueBuyersOfContract(AI_CONTRACTS.land_sale, this.LAND_SALE_GENESIS_BLOCK)
		const uniqueBuyers2 = await this.getUniqueBuyersOfContract(AI_CONTRACTS.land_sale_v2, this.LAND_SALE_V2_GENESIS_BLOCK)
		uniqueBuyers = Array.from(new Set(uniqueBuyers1.concat(uniqueBuyers2)));

		console.log("uniqueBuyers", uniqueBuyers);

		this.loadPlotsOfAddresses(uniqueBuyers); 
		this.setState({
			uniqueBuyers: uniqueBuyers,
		})
		
		//console.log("buyers", buyers);
		//console.log("uniqueBuyers", uniqueBuyers);
	}

	async getUniqueBuyersOfContract(_contractData, _fromBlock){
		const addr = _contractData.address;
		const abi = _contractData.abi;
		const contract = new window.web3.eth.Contract(abi, addr);

		this.setState({status: {msg: "loading addresses.."}});
		const latestBlock = await window.web3.eth.getBlockNumber();
		const events = await contract.getPastEvents("ChestPurchased", {
			fromBlock: _fromBlock,
			toBlock: latestBlock
		});
		console.log("evt", events);

		const buyers = events.map(event => { return event.returnValues["_owner"] });
		const uniqueBuyers = Array.from(new Set(buyers));
		return uniqueBuyers;
	}

	renderPlots(){
		const plots= this.state.plots;
		const mapSize= this.state.mapSize;
		const numPlots= this.state.numPlots;
		return (
			plots.map((plotData,i) => <Plot key={i} data={plotData} mapSize={mapSize} numPlots={numPlots}/>)
		)
	}

	renderPlotsPerPlayer(){
		console.log(this.state.zoom);
		const plotsPerPlayer = this.state.plotsPerPlayer;
		const mapSize= Math.round(this.state.mapSize * this.state.zoom);
		const numPlots= this.state.numPlots;
		return (
			plotsPerPlayer.map((plots) => {
					let color = randomColor({
						luminosity: 'dark',
					});
					return plots.map((plotData,i) => <Plot key={i} color={color} data={plotData} mapSize={mapSize} numPlots={numPlots}/>)
				}
			)
		)
	}

	renderUniqueBuyers(){
		const uniqueBuyers = this.state.uniqueBuyers;
		return (
			uniqueBuyers.map((address,i) => 
				<a key={i} target="_blank" href={`https://etherscan.io/address/${address}`} className="addr">{address}</a>
			)
		)
	}


	/* Event Handlers */
	handleZoomIn = () => {
		this.setState(prevState =>({
			zoom: Math.min(prevState.zoom+0.5, 3), 
		}));
	}
	handleZoomOut = () => {
		this.setState(prevState =>({
			zoom: Math.max(prevState.zoom-0.5, 0.5), 
		}));
	}

	render() {
		const zoom = this.state.zoom;
		const BASE_MAP_SIZE = this.state.BASE_MAP_SIZE;
		const mapSize = Math.round(this.state.mapSize * this.state.zoom);
		const dragLimitY = Math.round((BASE_MAP_SIZE - mapSize)/2);
		console.log("mapsize", mapSize);
		const status = this.state.status;
		const lastUpdated = this.state.lastUpdated;
		const uniqueBuyers = this.state.uniqueBuyers;

		const plotsPurchased = this.state.plotsPurchased;
		const totalPlots = this.state.totalPlots;
		const plotsPurchasedPercentage = (plotsPurchased / totalPlots * 100).toFixed(2)
		return (
			<StyledLunacia mapSize={mapSize + "px"} >
				<div className="mapGroup">
				<div className="mapOuterContainer">
					{status && <StatusBox className="status" status={status}/>}
					<Draggable bounds={{left: 0, top: dragLimitY}}>
						<div className="mapContainer">
							{this.renderPlotsPerPlayer()}
							<img className="map" src="./img/lunacia/lunacia_map.png" />
						</div>
					</Draggable>
					<div className="zoomButtons">
						<Button name="-" type="filled" color="#4f288c" onClick={this.handleZoomOut}/>
						<Button name="+" type="filled" color="#4f288c" onClick={this.handleZoomIn}/>
					</div>
				</div>
				<div className="uniqueBuyers">
					<h2>Land Owners <span className="count">{uniqueBuyers.length}</span></h2>
					<div className="list">
						{this.renderUniqueBuyers()}
					</div>
				</div>
				</div>
				<div className="plotCount"> Plots purchased: {plotsPurchasedPercentage}% ({plotsPurchased} / {totalPlots} plots)</div>
			</StyledLunacia>
		);
	}
}

export default LunaciaMap;