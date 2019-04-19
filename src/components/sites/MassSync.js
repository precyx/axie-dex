import React from 'react';
import Spinner from 'react-spinner-material';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import Axie from "../Axie/Axie/Axie";
import AxieCheck from "../MassSync/AxieCheck";
import SyncContoller from "../MassSync/SyncController";
import StartScreen from "../MassSync/StartScreen";
import ConfirmationBox from "../MassSync/ConfirmationBox";
import AxieCardOptions from "../MassSync/AxieCardOptions";
import Button from "../ui/Button";
//import Axie from "../Axie/Axie/Axie";
import {AXIE_DATA_V1, AXIE_DATA_TRANSFORM} from "../../services/axie-data-service";
import {ExpSyncContract} from "../../data/contracts/ExpSyncContract";
import {breedingCosts} from "../../data/axie-data";
//
import axios from "axios";
//
import {WEB3_V1} from "../../services/web3-service";
import {AXIE_WEB3} from "../../services/axie-contract-service";
//
import {StyledMassSync} from "./styles/StyledMassSync";
//
import { Grid, AutoSizer, WindowScroller } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { AxieV2 } from '../../services/axie-data-service2';

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
			axiesCache: null,
			axies: null,
			// axie card options
			axieFeatures: "breeding",  
			axieSize: "normal",
		}

		this.firstAxieDomRef = React.createRef();

		this.axieCardSizes = {
			parts: 446,
			stats: 440,
			breeding: 282,
			minimal: 260,
		}

		this._columnYMap = [];
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
	 * Sets axies & axieGrid
	 * @param {array} axies 
	 * @param {boolean} initial_load 
	 * @param {function} axies 
	 */
	setAxieState(axies, initial_load, callback){
		const columns = 6;
		const rows = Math.ceil(axies.length / columns);
		let axieGrid = [];
		let axiesClone = axies.slice(0);
		for(let i=0; i < rows; i++){
			axieGrid.push(axiesClone.splice(0, columns));
		}
		if(axies.length == 0){
			axieGrid = null;
		}

		this.setState({axieGrid: null},() => {
			this.setState(prevState => ({
				axiesCache: initial_load ? axies : prevState.axiesCache,
				axies: axies,
				axieGrid: axieGrid,
			}), () => { if(callback) callback(); });
		})
	}


	/**
	 * Loads axies from {address} and merges data from V0, V2 and Blockchain API
	 * @param {Boolean} initialLoad 
	 */
	loadAxiesPages(initialLoad){
		this.setState({status: {code:"loading", msg:"Loading Axies"} });
		// get axies
		//	AxieV2.getAxiesByAddress(this.state.address, {"offset": this.state.offset, "stage":4})
		AxieV2.getAxiesByAddress(this.state.address, this.state.offset, "&stage=4").then((axieData)=>{
			this.setState({ status: {code:"loading", msg:"Loading Axies V2"} });
			// get axies from V2 API
			var ids = axieData.axies.map(axie => axie.id);
			//AxieV2.getAxiesByIds(ids)
			AxieV2.getAxiesByIds(ids).then((axies2)=>{
				//
				this.setState({ status: {code:"loading", msg:"Loading Exp"} });
				// add exp field
				AXIE_DATA_TRANSFORM.mergeXPDataIntoV2API(axies2, axieData.axies);
				AXIE_DATA_TRANSFORM.getAndMergePendingBlockchainXPIntoV2API(axies2, this.expSyncContract).then(()=>{
					this.setAxieState(axies2, true);
					this.setState({
						status: {code:"loading-complete", msg:""}
					})
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
		this.setState({status: {code: "loading", msg: "loading all axies"}});
		// load all axies by address
		/*AxieV2.getAllAxiesByAddress(this.state.address, {"stage":4}, (progress => {
			this.setState({
				status: {code: "loading", msg: "loaded: " + progress.loaded + " / " + progress.total }
			})
		}))*/

		AxieV2.getAllAxiesByAddress(this.state.address, {"stage":4}, (progress => {
			this.setState({
				status: {code: "loading", msg: "loaded: " + progress.loaded + " / " + progress.total }
			})
		})).then((axies)=>{
			this.setState({ status: {code:"loading", msg:"Loading Axies V2"} });
			// load axies V2
			var ids = axies.map(axie => axie.id);
			AxieV2.getAxiesByIds(ids, progress=>{
				this.setState({
					status: {code: "loading", msg: "v2 loaded: " + progress.loaded + " / " + progress.total }
				})
			}).then((_axies2)=>{
				// filter out CORRUPTED undefined axies
				let axies2 = _axies2.filter(axie => axie);
				this.setState({ status: {code:"loading", msg:"Loading Exp"} });
				// add exp field
				AXIE_DATA_TRANSFORM.mergeXPDataIntoV2API(axies2, axies);
				AXIE_DATA_TRANSFORM.getAndMergePendingBlockchainXPIntoV2API(axies2, this.expSyncContract).then(()=>{
					this.setAxieState(axies2, true);
					this.setState({
						status: {code:"loading-complete", msg:""}
					}, () => {
						this.selectBreedableAxies();
					})
				})
			});
		});
	}

	selectBreedableAxies(){
		let selectedAxies = {};
		this.state.axies.forEach(axie => {
			const expForBreeding = breedingCosts[axie.breedCount+1];
			let hasEnoughXpPendingToBreed = (axie.pendingExp - axie.pendingExp2 + axie.exp) > expForBreeding;
			let hasEnoughXpAlreadyToBreed = axie.exp > expForBreeding;

			console.log("ko", expForBreeding,hasEnoughXpPendingToBreed, hasEnoughXpAlreadyToBreed);
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
		//console.log("handle check", check, axieData);
		let newSelectedAxies = Object.assign({}, this.state.selectedAxies);
		if(check) 			newSelectedAxies[axieData.id] = axieData
		else if(!check)	delete newSelectedAxies[axieData.id];
		this.setState({
			selectedAxies: newSelectedAxies,
		}, () => {
			//console.log(this.state.selectedAxies);
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
				this.setState({
					syncTxHash: data,
					showSuccessBox: true,
				})
			}).catch(err => {
				window.alert("Transaction cancelled.");
			});
		})
	}


	 /* Handlers */
	handleClickLoadPages = () => {
		this.setState({
			view: "axie-pages",
		});
		this.loadAxiesPages(true);
	}

	handleClickLoadBreedableAxies = () => {
		console.log("xd")
		this.setState({
			view: "breedable-axies"
		});
		this.loadAllBreedableAxies();
	}

	handleChangeAddress = (newAddress) => {
		this.setState({
			address: newAddress,
		})
	}

	handleClickOkSuccessBox = () => {
		this.setState({
			selectedAxies: {},
			showSuccessBox: false,
			syncTxHash: "",
		})
	}

	handleClickRemoveOneSelectedAxie = (axieToRemove) => {
		let newSelectedAxies = Object.assign({}, this.state.selectedAxies);
		delete newSelectedAxies[axieToRemove.id];
		this.setState({
			selectedAxies: newSelectedAxies,
		})
	}

	handleChangeFeatures = (features) => {
		this.setState({
			axieFeatures: features
		}, () => {
			this.setAxieState(this.state.axies, false, () => {
			})
		})
	}


	/**
	 * Virtuas Scroll cell render
	 */
	cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
		const axie = this.state.axieGrid[rowIndex][columnIndex];
		if(!axie) return;
		const isFirst = (columnIndex == 0 && rowIndex == 0) ? true : false;
		let realPendingExp = (axie.pendingExp2||0) - (axie.pendingExp||0);
		const axieFeatures = this.state.axieFeatures;
		return (
			<div key={key} style={style}>
				<AxieCheck data={axie} onCheck={this.handleCheckAxie} disable={realPendingExp != 0} >
					<Axie ref={isFirst ? this.firstAxieDomRef : null} data={axie} rendering="image" img={axie} features={axieFeatures}/>
				</AxieCheck>
			</div>
		)
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
		// axie options
		const axieFeatures = this.state.axieFeatures;
		const axieSize = this.state.axieSize;
		// axies
		/*const axies = this.state.axies ? this.state.axies.map(axie => {
			let realPendingExp = (axie.pendingExp2||0) - (axie.pendingExp||0);
 			return (
				<AxieCheck key={axie.id} data={axie} onCheck={this.handleCheckAxie} disable={realPendingExp != 0} >
					<Axie data={axie} rendering="image" img={axie} features={axieFeatures}/>
					{axieFeatures}
				</AxieCheck>
			 )
			}
		) : null;*/

		/*const axies2 = this.state.axieGrid ? this.state.axieGrid.map((axieRow, i) => {
			return (
				<div key={i} className="row"> 
					{axieRow.map(axie => {
						let realPendingExp = (axie.pendingExp2||0) - (axie.pendingExp||0);
						return (
							<AxieCheck key={axie.id} data={axie} onCheck={this.handleCheckAxie} disable={realPendingExp != 0} >
								<Axie data={axie} rendering="image" img={axie} features={axieFeatures}/>
								{axieFeatures}
							</AxieCheck>
						)
					})}
				</div>
			)
		}) : null;*/

		const spinner = (
			<div className="spinnerContainer"> 
				<Spinner className="spinner" size={30} spinnerColor={"#a146ef"} spinnerWidth={3} visible={true}/>
				<p className="text">{status.msg}</p>
			</div>
		);

		return (
			<WindowScroller>
				{({ height, isScrolling, onChildScroll, scrollTop }) => (
			<BasicCenterContainer>
				<StyledMassSync>

					{showSuccessBox &&
						<ConfirmationBox 
							syncTxHash={this.state.syncTxHash}
							selectedAxies={selectedAxies}
							onClickOkSuccessBox={this.handleClickOkSuccessBox}
						/>
					}

					<div className="headerBox">
						<div className="titleBox">
							<div className="topActionBar">
								<h1>Mass Sync </h1>
							</div>
							<div className="addressBar">
								<h3>{address}</h3>
							</div>
							{ view == "axie-pages" && 
							<div>
								<div className="pageBar">
									<Button disable={currentPage <= 1} name="Prev" type="outline" color="#a146ef" onClick={this.handleClickPrevPage}/>
									<h2> Page {currentPage} / {totalPages}  </h2>
									<Button disable={currentPage >= totalPages} name="Next" type="outline" color="#a146ef" onClick={this.handleClickNextPage}/>
								</div>
							</div>}
							{ this.state.axies && 
								<div>
									<div className="infoBar">
										<h2 className="v2">Showing {this.state.axies.length} {this.totalAxies ? " of " + this.total : ""} Axies</h2>
									</div>
									<AxieCardOptions features={axieFeatures} onChangeFeatures={this.handleChangeFeatures}/>	
								</div>
							}
						</div>
						{hasSelectedAxies &&
							<SyncContoller axies={selectedAxies} 
								onClickClearAll={this.handleClickClearAll}
								onClickSync={this.handleClickSyncSelectedAxies}
								onClickRemoveOne={this.handleClickRemoveOneSelectedAxie}
								> 
							</SyncContoller>
						}
					</div>

					<div className="axieList">
						{view == "start-screen" && 
							<StartScreen 
							address={address} 
							onClickLoadAll={this.handleClickLoadBreedableAxies} 
							onClickLoadPages={this.handleClickLoadPages}
							onChangeAddress={this.handleChangeAddress} />
						}
						{status.code == "loading" && spinner}
				
						{this.state.axieGrid &&

							<AutoSizer>
								{({ width }) => (
									<Grid
										cellRenderer={this.cellRenderer}
										columnCount={this.state.axieGrid[0].length}
										columnWidth={234}
										rowHeight={this.axieCardSizes[axieFeatures] + 10 }
										rowCount={this.state.axieGrid.length}
										overscanRowCount={1}
										autoHeight
										height={height}
										isScrolling={isScrolling}
										onScroll={onChildScroll}
										scrollTop={scrollTop}
										width={width}
									/>
								)}
							</AutoSizer>
						}


					</div>

				</StyledMassSync>
			</BasicCenterContainer>
			)}
			</WindowScroller>
		)
	}

}


export default MassSync;