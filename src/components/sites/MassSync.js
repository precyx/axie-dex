import React from 'react';
import Spinner from 'react-spinner-material';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import Axie from "../Axie/Axie/Axie";
import Button from "../ui/Button";
//import Axie from "../Axie/Axie/Axie";
import {AXIE_DATA_V1} from "../../services/axie-data-service";
//
import styled from 'styled-components';
//
import {connectWeb3, getDefaultAccount} from "../../services/web3-service";

//CSS
export const StyledMassSync = styled.div`
	font-family: "Roboto";

	.titleBox {margin-top:40px; text-align: center; width: 100%;}
	.axieList {margin-top:40px; position:relative; display: flex; flex-flow: wrap; max-width: 1500px; margin: 0 auto; margin-top: 40px; }
	.spinnerContainer {position:absolute; z-index: 100; background:rgba(255,255,255,0.5); width: 100%; 
		margin: 0 auto;  height: 100%; min-height:40vh; color: #a146ef; font-weight: normal; align-items: center; justify-content:center; display: flex; font-size: 12px; flex-flow: column;}
	.spinnerContainer .text {margin-top:10px;}
	.pageBar {display:inline-flex; align-items:center; margin-bottom:20px;}
	.pageBar .button {margin: 0 20px;}
	.addressBar {margin-bottom:40px; }
	h1 {font-size: 38px; margin-bottom:30px;}
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
		}
	}

	componentDidMount(){
		connectWeb3();
		this.loadAcc();
	}

	loadAcc(){
		getDefaultAccount().then(acc => {
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
			console.log("axieData", axieData);
			// get axies from V1 API
			var ids = axieData.axies.map(axie => axie.id);
			AXIE_DATA_V1.getAxiesByIds(ids).then((axies2)=>{
				this.setState({
					axies: axies2,
					status: {code:"loading-complete", msg:""}
				})
			});

			if(initialLoad){
				this.setState({
					currentPage: 1,
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

	render(){
		const currentPage = this.state.currentPage;
		const totalPages = this.state.totalPages;
		const currentAxies = 12;
		const totalAxies = this.state.totalAxies;
		const address = this.state.address;
		// status
		const status = this.state.status;
		// axies
		const axies = this.state.axies ? this.state.axies.map(axie => 
			<Axie key={axie.id} data={axie} rendering="image" img={axie}/>
		) : null;
		const spinner = (
			<div className="spinnerContainer"> 
				<Spinner className="spinner" size={30} spinnerColor={"#a146ef"} spinnerWidth={3} visible={true}/>
				<p className="text">Loading...</p>
			</div>
		);
		return (
			<BasicCenterContainer>
				<StyledMassSync>

					<div className="titleBox">
						<h1>Mass Sync</h1>
						<div className="addressBar">
							<h3>{address}</h3>
						</div>

						<div className="pageBar">
							<Button name="Prev" type="color" color="#a146ef"/>
							<h2> Page {currentPage} / {totalPages}  </h2>
							<Button name="Next" type="color" color="#a146ef" onClick={this.handleClickNextPage}/>
						</div>
						<h2 className="v2">Showing {currentAxies} of {totalAxies}</h2>


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