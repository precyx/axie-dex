import React, { Component } from 'react';
import styled from "styled-components";
//spinner
import Spinner from 'react-spinner-material';
//axios
import axios from 'axios';
//pixi
import * as PIXI from 'pixi.js';
import 'pixi-spine';
import "pixi-filters";
import { OutlineFilter } from '@pixi/filter-outline';
// own
import {buildAxiesByAddressAPI, getAxiesByAddress, getAllAxiesByAddress} from "../../services/axie-data-service.js";
import BasicCenterContainer from "../containers/BasicCenterContainer";
import {getAxieSpine, getSpinesOfAxies} from "../../services/axie-pixi-service";
import {Grid} from "../classes/Grid";
import AxieTitle from "../AxieTitle";

//CSS
const StyledTeamBuilder = styled.div`
	h1 {margin-bottom:15px;}
	h3 { color: grey; font-weight: normal; font-size: 18px; margin-bottom: 10px;}
	canvas { border: 1px solid #e2e2e2; width:100%; height:100%;}

	#axie_teambuilder_container {position:relative; width:100%; height:calc(100vh - 200px); border: 1px solid #e2e2e2;}
	.spinner {position: absolute; left:50%; top:50%; margin-top:-30px; margin-left:-30px;}
`;

// class
class Teambuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: new Grid(),
			pixiApp: null,
			containerID: "axie_teambuilder_container",
			canvasID: "axie_teambuilder_canvas",
			canvasW: 1400,
			canvasH: 2500,
			CRISP_MULTIPLIER: 1.6,
			// axie
			AXIE_BASE_W: 570,
			AXIE_SIZE_RATIO: 1.41,
			axieW: 120, // 120 = good
			axies: null,
			axie_spines: null,
			// ui
			address: "0xe293390d7651234c6dfb1f41a47358b9377c004f",
			offset: 0,
			//
			loading_complete: false,
		}
	}

	
	componentDidMount() {
		this.setupPixiApp();
	}
	
	setupPixiApp(){
		var w = document.getElementById(this.state.containerID).clientWidth;
		var h = document.getElementById(this.state.containerID).clientHeight;
		//
		var pixiApp = new PIXI.Application({
      view: document.getElementById(this.state.canvasID),
      width: w * this.state.CRISP_MULTIPLIER, // double canvas size to ensure crisp sprite render
      height: h * this.state.CRISP_MULTIPLIER, // double canvas size to ensure crisp sprite render
			transparent: true,
      //forceCanvas:true,
		});
		pixiApp.stage.interactive = true;
		pixiApp.stage.buttonMode = true;
		//pixiApp.start();
		this.setState({
			pixiApp:pixiApp,
			canvasW: w,
			canvasH: h
		}, 
		this.getManyAxies);
	}
	/**
	 * Gets Axies ordered highest to lowest ID and limited to 12
	 * @memberof AxieList
	 */
	getAxies = () => {
		getAxiesByAddress(this.state.address, this.state.offset).then((data)=>{
			console.log("axies", data);
			this.setState({
				axies : data.axies,
			}, this.loadAxieSpines);
		});
	}
	getManyAxies = () => {
		getAllAxiesByAddress(this.state.address).then((axies)=>{
			console.log("many axies", axies);
			this.setState({
				axies : axies,
			}, this.loadAxieSpines);
		});
	}
	loadAxieSpines(){
		getSpinesOfAxies(this.state.axies).then((axieSpines)=>{
			console.log("Spines", axieSpines);
			this.setState({
				axie_spines: axieSpines
			}, 
			this.renderAxies);
		})
	}

	/**
	 * Renders multiple {axies} in a {2d grid}
	 */
	renderAxies(){
		let grid = this.state.grid;
		// fill axies into {2d grid}
		grid.insertElems(this.state.axie_spines);
		// render axies in a grid
		console.log(grid);
		for(let i = 0; i < grid.rows; i++){
			for(let j = 0; j < grid.cols; j++){
				let axie = grid.elems[i][j];
				if(axie) this.renderAxie(axie, j, i);
			}
		}
		this.startPixi();
	}
	/**
	 * Renders a single {axiespine}
	 * @param {AxieSpine} axieSpine
	 * @param {Number} x
	 * @param {Number} y
	 */
	renderAxie(axieSpine, x, y){
		var EXTRA_GAP_X = 100; //60
		var EXTRA_GAP_Y = 150; //50
		var gapX = this.state.axieW + EXTRA_GAP_X;
		var gapY = this.state.axieW / this.state.AXIE_SIZE_RATIO + EXTRA_GAP_Y;
		var startX = 120; //120
		var startY = 180; //180
		var SCALE = this.state.axieW / this.state.AXIE_BASE_W;
		var ROW_SHIFT = (y%2 == 0) ? gapX : 0;
		// set scale
		axieSpine.scale.set(SCALE * this.state.CRISP_MULTIPLIER);
		// set position
		axieSpine.x = 50;
		axieSpine.y = 50;
		axieSpine.position.set(
			(x * gapX + startX) * this.state.CRISP_MULTIPLIER + ROW_SHIFT,
			(y * gapY + startY) * this.state.CRISP_MULTIPLIER,
		);
		// set animation
		axieSpine.state.setAnimation(0, "walking", true);
		// add child
		this.state.pixiApp.stage.addChild(axieSpine);
		// handle events
		var outlineFilter = new OutlineFilter(8, 0x7cc9ff);
		var outlineFilter2 = new OutlineFilter(8, 0xbbdd33);
		axieSpine.interactive = true;
		axieSpine.on('pointerover', (e)=>{
			e.target.filters = [outlineFilter];
		});
		axieSpine.on("pointerout", (e)=>{
			axieSpine.filters = null;
		});
	}

	startPixi(){
		// Resize Canvas to display crisp sprites
		this.setCanvasSize(
			Math.round(this.state.canvasW),
			Math.round(this.state.canvasH)
		);
		console.log(this.state.grid);
		this.state.pixiApp.start();
		this.setState({loading_complete:true});
	}

	/**
	 * Helper function to size canvas
	 * @param {Number} w canvas width
	 * @param {Number} h canvas height
	 */
	setCanvasSize(w,h){
		this.state.pixiApp.view.width = w * this.state.CRISP_MULTIPLIER;
		this.state.pixiApp.view.height = h * this.state.CRISP_MULTIPLIER;
		this.setState({
			canvasW: w,
			canvasH: h,
		});
	}

	render() {

		var axie_overlays = "";
		if(this.state.loading_complete){
			axie_overlays = this.state.axies.map((axie) => (
				<AxieTitle id={axie.id} name={axie.name} class={axie.class} />
				)
			);
		}

		return (
			<StyledTeamBuilder>

				<BasicCenterContainer>

					<h2>Axie Team Builder</h2>
					<h3>{this.state.address}</h3>
					<div id="axie_teambuilder_container">
						{!this.state.loading_complete ? (
							<Spinner  className="spinner" size={60} spinnerColor={"#a146ef"} spinnerWidth={4} visible={true}/>
						) : ""}

						<canvas style={{width: this.state.canvasW, height: this.state.canvasH }} id={this.state.canvasID}>No Canvas support.</canvas>

						<div className="overlays">
							{axie_overlays}
						</div>
					</div>

				</BasicCenterContainer>	
			</StyledTeamBuilder>
		);
	}
}

export default Teambuilder;