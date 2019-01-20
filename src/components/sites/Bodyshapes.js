import React, { Component } from 'react';
import styled from 'styled-components';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import Axie from "../Axie/Axie/Axie";
import StatusBox from "../StatusBox";
// services
import {AXIE_DATA_V1} from "../../services/axie-data-service";

//CSS
const StyledBodyshapes = styled.div`
	.axies {display:flex;}
`;

// Class
class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

	componentWillMount(){
		this.getBodyShapeData();
	}

	/**
	 * Gets ids of the bodyshapes
	 */
	getBodyShapeData(){
		this.setState({
			status: {type:"loading", code:"loading_bodyshapes", msg: "loading bodyshapes..."},
		})
		AXIE_DATA_V1.getBodyShapes().then((bodyShapes)=>{
			return new Promise((resolve,reject)=>{
				this.setState({
					bodyShapes : bodyShapes,
					status: {type:"completed", code:"loading_bodyshapes", msg: "bodyshapes loaded."},
				}, resolve);
			})
		}).then(()=> {this.getAxieData()});
	}

	/**
	 * Gets Axie data based on ID's
	 */
	getAxieData(){
		//count elems
		var loadedElems = 0;
		var numElems = 0;
		Object.keys(this.state.bodyShapes).forEach((key)=>{
			numElems+= this.state.bodyShapes[key].length;
		});
		//set status
		this.setState({
			status: {type:"loading", code:"loading_axie_data", msg: "loading axies "+ loadedElems +" / " + numElems},
		});
		var promises = [];
		var axieDataPerBodyshape = {};
		console.log("start");
		Object.keys(this.state.bodyShapes).map((key) => {
				axieDataPerBodyshape[key] = [];
				this.state.bodyShapes[key].forEach(axieId => {
					var p = new Promise((resolve,reject)=>{
						AXIE_DATA_V1.getAxieById(axieId).then((data)=>{
							loadedElems++;
							this.setState({status: {type:"completed", code:"loading_axie_data", msg: "loading axies "+ loadedElems +" / " + numElems}});
							axieDataPerBodyshape[key].push(data);
							resolve(data);
						});
					});
					promises.push(p);
				});	
		});
		Promise.all(promises).then(()=>{
			console.log("x", axieDataPerBodyshape);
			this.setState({
				bodyShapesAxies: axieDataPerBodyshape,
				status: {type:"completed", code:"all_loaded", msg: "axie data loaded."},
			});
		});
	}

	render() {
		var axies = "";
		if(this.state.bodyShapesAxies){
			axies = Object.keys(this.state.bodyShapesAxies).map((key) => 
				<div key={key}>
					<h2>{key} ({this.state.bodyShapesAxies[key].length})</h2>
					{this.state.bodyShapesAxies[key].map( (axie) =>
						<Axie data={axie} features={"minimal"} rendering={"image"} />
					)}
				</div>
			)
		}
		return (
			<StyledBodyshapes>
				<BasicCenterContainer>
					{this.state.status.code !== "all_loaded" ? 
						<StatusBox status={this.state.status} />
					: ""}
					<div className="axies">
						{axies}
					</div>
				</BasicCenterContainer>
			</StyledBodyshapes>
		);
	}
}

export default Profile;