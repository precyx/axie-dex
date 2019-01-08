import React from 'react';
import Spinner from 'react-spinner-material';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import Axie from "../Axie/Axie/Axie";
import AxieCheck from "../MassSync/AxieCheck";
import SyncContoller from "../MassSync/SyncController";
import Button from "../ui/Button";
import Textfield from "../ui/Textfield";
import Overlay from "../ui/Overlay/Overlay";
import Modal from "../ui/Modal/Modal";
//import Axie from "../Axie/Axie/Axie";
import {AXIE_DATA_V1, AXIE_DATA_TRANSFORM} from "../../services/axie-data-service";
import {ExpSyncContract} from "../../data/contracts/ExpSyncContract";
//
import axios from "axios";
//
import {WEB3_V1} from "../../services/web3-service";
import {AXIE_WEB3} from "../../services/axie-contract-service";
//
import {StyledMassSync} from "./styles/StyledMassSync";

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
			view: "",
			selectedAxies: {},
		}
	}

	componentDidMount(){
		WEB3_V1.connectWeb3();
		this.loadAcc();
		this.setupContract();
		this.setState({
			view: "start-screen",
		})
	}

	setupContract(){
		this.expSyncContract = WEB3_V1.getContract(ExpSyncContract.abi, ExpSyncContract.address);
	}

	loadAcc(){
		WEB3_V1.getDefaultAccount().then(acc => {
			this.setState({
				address: acc,
			});
		});
	}


	/**
	 * Loads axies from {address} and merges data from V0, V1 and Blockchain API
	 * @param {Boolean} initialLoad 
	 */
	loadAxiesPages(initialLoad){
		this.setState({status: {code:"loading", msg:"Loading Axies"} });
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


	/**
	 * Loads all axies from an {account}
	 * @param {Boolean} initialLoad 
	 */
	loadAllBreedableAxies(){
		this.setState({status: {code: "loading", msg: "loading axies"}});
		// load all axies by address
		AXIE_DATA_V1.getAllAxiesByAddress(this.state.address, "&stage=4", (progress => {
			this.setState({
				status: {code: "loading", msg: "loaded: " + progress.loaded + " / " + progress.total }
			})
		})).then((axies)=>{
			console.log("axies loaded", axies);
			this.setState({ status: {code:"loading", msg:"Loading Axies V1"} });
			// load axies V1
			var ids = axies.map(axie => axie.id);
			AXIE_DATA_V1.getAxiesByIds(ids, progress=>{
				this.setState({
					status: {code: "loading", msg: "v1 loaded: " + progress.loaded + " / " + progress.total }
				})
			}).then((_axies2)=>{
				// filter out CORRUPTED undefined axies
				let axies2 = _axies2.filter(axie => axie);
				this.setState({ status: {code:"loading", msg:"Loading Exp"} });
				// add exp field
				AXIE_DATA_TRANSFORM.mergeXPDataIntoV1API(axies2, axies);
				AXIE_DATA_TRANSFORM.getAndMergePendingBlockchainXPIntoV1API(axies2, this.expSyncContract).then(()=>{
					this.setState({
						axies: axies2,
						status: {code:"loading-complete", msg:""}
					}, () => {
						this.selectBreedableAxies();
					})
				})
			});
		})
	}

	selectBreedableAxies(){
		let selectedAxies = {};
		this.state.axies.forEach(axie => {
			console.log(axie.exp)
			let hasEnoughXpPendingToBreed = (axie.pendingExp - axie.pendingExp2 + axie.exp) > axie.expForBreeding;
			let hasEnoughXpAlreadyToBreed = axie.exp > axie.expForBreeding;
			//
			if(hasEnoughXpPendingToBreed && !hasEnoughXpAlreadyToBreed) selectedAxies[axie.id] = axie;
		});
		console.log("selectedAxies", selectedAxies);
		this.setState({
			selectedAxies: selectedAxies,
		})
	}



	handleClickNextPage = () => {
		this.setState((prevState) => ({
			offset: prevState.offset +12,
			currentPage: prevState.currentPage + 1
		}), () => {
			this.loadAxiesPages(false);
		});
	}

	handleClickPrevPage = () => {
		this.setState((prevState) => ({
			offset: prevState.offset -12,
			currentPage: prevState.currentPage -1
		}), () => {
			this.loadAxiesPages(false);
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

	/**
	 * Sends a sync multiple TX to the ExpSyncContract
	 */
	handleClickSyncSelectedAxies = () => {
		let idList = [];
		let expList = [];
		let createdAtList = [];
		let signatureList = [];
		const selectedAxies = this.state.selectedAxies;
		// prepare arrays
		Object.keys(selectedAxies).forEach(axieKey=>{
			const axie = selectedAxies[axieKey];
			idList.push(parseInt(axieKey));
			expList.push(axie.pendingExp);
			createdAtList.push(selectedAxies[axieKey].expSubmittedAt);	
			signatureList.push(axie.expSignature);
		})
		// prepare signature
		let signatures = '0x' + signatureList.map(s => s.slice(2)).join('');
		//
		let params = [idList, expList, createdAtList, signatures];
		window.web3.eth.getAccounts((err, accounts)=>{
			let sender = accounts[0];
			AXIE_WEB3.send(this.expSyncContract, "checkpointForMulti", params, sender).then((data)=>{
				console.log("SUPPP", data)
				this.setState({
					syncTxHash: data,
					showSuccessBox: true,
				})
			}).catch(err => {
				window.alert("Transaction cancelled.");
			});
		})
	}


	handleClickLoadPages = () => {
		this.setState({
			view: "axie-pages",
		});
		this.loadAxiesPages(true);
	}

	handleClickLoadBreedableAxies = () => {
		this.setState({
			view: "breedable-axies"
		});
		this.loadAllBreedableAxies();
	}


	handleChangeAddress = (evt) => {
		this.setState({
			address: evt.target.value
		})
	}

	handleClickOkSuccessBox = () => {
		this.setState({
			selectedAxies: {},
			showSuccessBox: false,
			syncTxHash: "",
		})
	}


	render(){
		const currentPage = this.state.currentPage;
		const totalPages = this.state.totalPages;
		const currentAxies = this.state.currentAxies;
		const totalAxies = this.state.totalAxies;
		const address = this.state.address;
		// status
		const status = this.state.status;
		const view = this.state.view;
		const showSuccessBox = this.state.showSuccessBox;
		// selected axies
		const selectedAxies = this.state.selectedAxies;
		const hasSelectedAxies = Object.keys(selectedAxies).length !== 0;
		// axies
		const axies = this.state.axies ? this.state.axies.map(axie => {
			let realPendingExp = (axie.pendingExp2||0) - (axie.pendingExp||0);
 			return (
				<AxieCheck key={axie.id} data={axie} onCheck={this.handleCheckAxie} disable={realPendingExp != 0} >
					<Axie data={axie} rendering="image" img={axie} features={"breeding"}/>
				</AxieCheck>
			 )
			}

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

					{showSuccessBox &&
						<Overlay className="fullOverlay">
							<Modal className="box successBox">
								<div className="title">Exp Sync TX Sent</div>
								<div className="transaction">
									<a target="_blank" href={"https://etherscan.io/tx/" + this.state.syncTxHash}>View Sync TX on Etherscan</a>
								</div>
								<div className="subtitle">EXP Sync for {Object.keys(selectedAxies).length} Axies:</div>
								<div className="linkList">
									{Object.keys(selectedAxies).map(axieKey => 
										<div className="link" key={axieKey}>
											<a target="_blank" href={"https://axieinfinity.com/axie/" + selectedAxies[axieKey].id}>
												https://axieinfinity.com/axie/{selectedAxies[axieKey].id}
											</a>
										</div>
									 )}
								</div>
								<Button name="OK" type="filled" color="#a146ef" size="normal" onClick={this.handleClickOkSuccessBox}/>
							</Modal>
						</Overlay>
					}

					<div className="headerBox">
						<div className="titleBox">
							<div className="topActionBar">
								<h1>Mass Sync</h1>
							</div>
							<div className="addressBar">
								<h3>{address}</h3>
							</div>
							{ view == "axie-pages" && 
							<div>
								<div className="pageBar">
									<Button name="Prev" type="outline" color="#a146ef" onClick={this.handleClickPrevPage}/>
									<h2> Page {currentPage} / {totalPages}  </h2>
									<Button name="Next" type="outline" color="#a146ef" onClick={this.handleClickNextPage}/>
								</div>
							</div>}
							{ view == "start-screen" && 
								<div className="infoBar">
									<h2 className="v2">Showing {currentAxies} of {totalAxies}</h2>
								</div>	
							}
						</div>
						{hasSelectedAxies &&
							<SyncContoller axies={selectedAxies} 
								onClickClearAll={this.handleClickClearAll}
								onClickSync={this.handleClickSyncSelectedAxies}> 
							</SyncContoller>
						}
					</div>

					<div className="axieList">
						{view == "start-screen" && 
							<div className="startScreen">
								<Textfield name="address" value={address} onChange={this.handleChangeAddress}/>
								<div className="bar">
									<Button onClick={this.handleClickLoadBreedableAxies} className="loadBreedingAxiesButton" name="Load All Fitting Axies" type="filled" color="#a146ef" /> 
									<Button onClick={this.handleClickLoadPages} className="loadAxiePages" name="Load Pages" type="filled" color="#a146ef" />
								</div>
							</div>
						}
						{status.code == "loading" && spinner}
						{axies}
					</div>

				</StyledMassSync>
			</BasicCenterContainer>
		)
	}

}


export default MassSync;