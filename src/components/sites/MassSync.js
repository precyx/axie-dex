import React from 'react';
import Spinner from 'react-spinner-material';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import Axie from "../Axie/Axie/Axie";
import AxieCheck from "../MassSync/AxieCheck";
import SyncContoller from "../MassSync/SyncController";
import Button from "../ui/Button";
//import Axie from "../Axie/Axie/Axie";
import {AXIE_DATA_V1, AXIE_DATA_TRANSFORM} from "../../services/axie-data-service";
import {ExpSyncContract} from "../../data/contracts/ExpSyncContract";
import {BigNumber} from 'bignumber.js';
import {checkpointForMulti} from "../../services/axie-contract-service";
//
import styled from 'styled-components';
//
import {WEB3_V1} from "../../services/web3-service";

//CSS
export const StyledMassSync = styled.div`
	font-family: "Roboto";

	.headerBox {max-width: 1500px; margin:0 auto; display:flex; justify-content:space-between; align-items:baseline;}
	.titleBox {margin-top:20px; text-align: left; width:auto; }
	.axieList {margin-top:20px; position:relative; display: flex; flex-flow: wrap; max-width: 1500px; margin: 0 auto; margin-top: 40px; }
	.spinnerContainer {position:absolute; z-index: 200; background:rgba(255,255,255,0.8); width: 100%; 
		margin: 0 auto;  height: 100%; min-height:40vh; color: #a146ef; font-weight: normal; align-items: center; justify-content:center; display: flex; font-size: 12px; flex-flow: column;}
	.spinnerContainer .text {margin-top:10px;}
	.pageBar {display:inline-flex; align-items:center; margin-bottom:20px;}
	.pageBar .button {margin: 0 20px;}
	.addressBar {margin-bottom:30px; }

	/* sync controller */
	.syncController {width:600px; }


	h1 {font-size: 38px; margin-bottom:20px; margin-top:0; text-align:left;}
	h2 {margin:0;}
	h2.v2 {font-weight:normal; font-size:14px; color:#9e9e9e;}
	h3 {color: #9c9c9c; font-size: 18px; font-weight:400;} 
`;

class MassSync extends React.PureComponent{

	constructor(props){
		super(props);
		this.state = {
			address : "",
			currentAxies: 0,
			totalAxies: 0,
			offset: 0,
			currentPage: 0,
			totalPages: 0,
			status: {code:"", msg:""},
			selectedAxies: {},
		}
	}

	componentDidMount(){
		WEB3_V1.connectWeb3();
		this.loadAcc();
		this.setupContract();
	}

	setupContract(){
		this.expSyncContract = WEB3_V1.getContract(ExpSyncContract.abi, ExpSyncContract.address);
		//
		/*console.log("exp sync", expSyncContract);
		expSyncContract.methods.getCheckpoint("20708").call((err, res)=>{
			//var a = new BigNumber(res[0]);
			//var b = new BigNumber(res[1]);
			console.log("check", res[0], res[1]);
		})*/
		//expSyncContract.methods.checkpointForMulti()

		/*var a = checkpointForMulti(
			["8972", "2957", "9717"], 
			["8252", "2529", "2950"], 
			"0x288bf6134BeB79D63173A13d65bc92F4EBD718B2", 
			"0x288bf6134BeB79D63173A13d65bc92F4EBD718B2"
		).then((d)=>{
			console.log("d", d);
		})*/

	}

	loadAcc(){
		WEB3_V1.getDefaultAccount().then(acc => {
			this.setState({
				address: acc,
			}, () => {
				this.loadAxies(true);
			});
		});
	}

	loadAxies(initialLoad){
		this.setState({
			status: {code:"loading", msg:"Loading Axies"}
		})
		console.log("load axies");
		// get axies
		AXIE_DATA_V1.getAxiesByAddress(this.state.address, this.state.offset, "&stage=4").then((axieData)=>{
			
			this.setState({ status: {code:"loading", msg:"Loading Axies V1"} });
			// get axies from V1 API
			var ids = axieData.axies.map(axie => axie.id);
			AXIE_DATA_V1.getAxiesByIds(ids).then((axies2)=>{
				//
				this.setState({ status: {code:"loading", msg:"Loading Exp"} });
				// add exp field
				AXIE_DATA_TRANSFORM.mergeXPDataIntoV1API(axies2, axieData.axies);
				AXIE_DATA_TRANSFORM.getAndMergePendingBlockchainXPIntoV1API(axies2, this.expSyncContract).then(()=>{
					this.setState({
						axies: axies2,
						status: {code:"loading-complete", msg:""}
					})
					console.log("axieData2", axies2);
				})
			});

			if(initialLoad){
				this.setState({
					currentPage: 1,
					currentAxies: 12,
					totalAxies: axieData.totalAxies,
					totalPages: axieData.totalPages,
				})
			}
		})
	}



	handleClickNextPage = () => {
		this.setState((prevState) => ({
			offset: prevState.offset +12,
			currentPage: prevState.currentPage + 1
		}), () => {
			this.loadAxies(false);
		});
	}

	handleClickPrevPage = () => {
		this.setState((prevState) => ({
			offset: prevState.offset -12,
			currentPage: prevState.currentPage -1
		}), () => {
			this.loadAxies(false);
		});
	}


	handleCheckAxie = (check, axieData) => {
		console.log("handle check", check, axieData);
		let newSelectedAxies = Object.assign({}, this.state.selectedAxies);
		if(check) 			newSelectedAxies[axieData.id] = axieData
		else if(!check)	delete newSelectedAxies[axieData.id];
		this.setState({
			selectedAxies: newSelectedAxies,
		}, () => {
			console.log(this.state.selectedAxies);
		})
	}

	handleClickClearAll = () => {
		this.setState({
			selectedAxies: {}
		});
	}

	handleClickSyncSelectedAxies = () => {
		let idList = [];
		let expList = [];
		Object.keys(this.state.selectedAxies).forEach(axieKey=>{
			idList.push(axieKey.toString());
			expList.push(this.state.selectedAxies[axieKey].pendingExp.toString())
		})
		
		window.web3.eth.getAccounts().then(async acc => {
			let address = acc[0];
			console.log(idList, expList, address, address, this.expSyncContract);
			checkpointForMulti(idList, expList, address, address, this.expSyncContract);
			//console.log("dd", dd);
		});
	}


	render(){
		const currentPage = this.state.currentPage;
		const totalPages = this.state.totalPages;
		const currentAxies = this.state.currentAxies;
		const totalAxies = this.state.totalAxies;
		const address = this.state.address;
		// status
		const status = this.state.status;
		// selected axies
		const selectedAxies = this.state.selectedAxies;
		const hasSelectedAxies = Object.keys(selectedAxies).length !== 0;
		// axies
		const axies = this.state.axies ? this.state.axies.map(axie => 
			<AxieCheck key={axie.id} data={axie} onCheck={this.handleCheckAxie} disable={axie.pendingExp}>
				<Axie data={axie} rendering="image" img={axie} features={"breeding"}/>
			</AxieCheck>
		) : null;
		const spinner = (
			<div className="spinnerContainer"> 
				<Spinner className="spinner" size={30} spinnerColor={"#a146ef"} spinnerWidth={3} visible={true}/>
				<p className="text">{status.msg}</p>
			</div>
		);
		return (
			<BasicCenterContainer>
				<StyledMassSync>

					<div className="headerBox">
						<div className="titleBox">
							<h1>Mass Sync</h1>
							<div className="addressBar">
								<h3>{address}</h3>
							</div>

							<div className="pageBar">
								<Button name="Prev" type="color" color="#a146ef" onClick={this.handleClickPrevPage}/>
								<h2> Page {currentPage} / {totalPages}  </h2>
								<Button name="Next" type="color" color="#a146ef" onClick={this.handleClickNextPage}/>
							</div>
							<h2 className="v2">Showing {currentAxies} of {totalAxies}</h2>
						</div>
						{hasSelectedAxies &&
							<SyncContoller axies={selectedAxies} 
								onClickClearAll={this.handleClickClearAll}
								onClickSync={this.handleClickSyncSelectedAxies}> 
							</SyncContoller>
						}
					</div>

					<div className="axieList">
						{status.code !== "loading-complete" && spinner}
						{axies}
					</div>

				</StyledMassSync>
			</BasicCenterContainer>
		)
	}

}


export default MassSync;