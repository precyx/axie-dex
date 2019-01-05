import React from 'react';
//
import Axie from "../Axie/Axie/Axie";
import {AXIE_DATA_V1} from "../../services/axie-data-service";
import axios from 'axios';
// css
import {StyledAxieGallery} from "./StyledAxieGallery";

class AxieGallery extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			axies: null,
			totalAxies: 0,
		}
	}
	componentDidMount() {
		this.loadAxieData();
	}
	loadAxieData(){
		const params = this.props.params.map((param)=>{
			return "&"+param
		});
		const api = AXIE_DATA_V1.buildAxiesAPI(1, params);
		axios.get(api).then((data)=>{
			console.log("DD", data);
			this.setState({
				axies: data.data.axies,
				totalAxies: data.data.totalAxies,
			});
		});
	}
	

	render(){
		let axies = "";
		if(this.state.axies) {
			console.log(this.state.axies);
			axies = this.state.axies.map((axie)=>
				<Axie data={axie} rendering="image"/>
			);
		}
		let title = this.props.title;
		let totalAxies = this.state.totalAxies;
		return (
			<StyledAxieGallery>
				<div className="title">{title} ({totalAxies})</div>
				<div className="axies">
					{axies}
				</div>
			</StyledAxieGallery>
		)
	}

}

export default AxieGallery;