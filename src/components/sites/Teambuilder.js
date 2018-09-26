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
import BasicCenterContainer from "../containers/BasicCenterContainer";
import {AXIE_DATA} from "../../services/axie-data-service.js";
import {AXIE_PIXI} from "../../services/axie-pixi-service";
import {Grid} from "../classes/Grid";
import {Axie} from "../classes/Axie";
import AxieTitle from "../AxieTitle";
import AxieBadges from "../AxieBadges";
import AxieScores from "../AxieScores";
import AxieComponent from "../Axie";
import Button from "../ui/Button";
import Textfield from "../ui/Textfield";
import AxieTeams from '../AxieTeams';

//CSS
const StyledTeamBuilder = styled.div`
	/* view */
	.teambuilder_view {display:flex; }
	/* component */
	margin-top:10px;
	canvas { width:100%; height:100%;}
	h1 {margin-bottom:15px;}
	h3 { color: grey; font-weight: normal; font-size: 18px; margin-bottom: 10px;}
	.titlebar {display:flex;}
	.addressBar {}
	.count { margin-left: 30px; color: grey;}
	.spinner {position: absolute; left:50%; top:50%; margin-top:-30px; margin-left:-30px;}
	/* container */
	#axie_teambuilder_container {position:relative; width:80vw; height:calc(100vh - 250px); border: 1px solid #e2e2e2; overflow: hidden; margin-right:20px;}
	/* axie teams */
	.axieTeams {margin-left:20px;}
	/* overlay ui */
	.overlayUI {position:absolute; left:10px; top:10px; /*pointer-events: none;*/ display:flex; align-items:center;}
	.overlayUI .axieTitle { display:none; background: white; padding: 2px 8px; border-radius: 10px;}
	.overlayUI .axieTitle .name { display:none; }
	.overlayUI .axieTitle .id { font-size:14; font-weight:bold; color:grey; }
	/* selected axie */
	.selectedAxie {position:absolute; }
	.selectedAxie .axie { margin: 0; box-shadow: 0 2px 22px #0000004a; border:none;}
	/* blackscreen */
	.blackscreen {position:absolute; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.25); user-select: none; pointer-events: none;}
`;

// class
class Teambuilder extends Component {
	// vars
	drag = false;
	pixiApp = null;
	pixiBg = null; //pixi.Graphics
	axieContainer = null; //pixi.Container,

	// teambuilder config
	config = { //@unused
		// axie
		axieW: 100,
		axieGapX: 100,
		axieGapY: 200,
		axieCrispMultiplier: 1.6,
		// grid
		gridRows: 8,
		gridCols: 400,
	}
	//
	constructor(props) {
		super(props);
		this.state = {
			grid: new Grid(500, 15),
			containerID: "axie_teambuilder_container",
			canvasID: "axie_teambuilder_canvas",
			canvasW: 1400,
			canvasH: 2500,
			CRISP_MULTIPLIER: 1.6,
			// axie
			AXIE_BASE_W: 570,
			AXIE_SIZE_RATIO: 1.41,
			axieW: 120, // 120 = good
			axieH: null, // @warning should be calculated
			axies: null,
			axie_spines: null,
			axies_with_spine: null,
			// ui
			address: "0x5ea1d56d0dde1ca5b50c277275855f69edefa169",
			offset: 0,
			hide_UI: false,
			selectedAxie: null,
			//
			loading_complete: false,
		}
	}

	
	componentDidMount() {
		this.setupPixiApp();
	}
	componentWillUnmount(){
		this.reset();
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
		//
		/*var camera = new PIXI.Container();
		pixiApp.stage.addChild(camera);*/
		// create bg
		var pixiBg = new PIXI.Graphics();  
		pixiBg.beginFill(0xffffff);  //0xdddddd
		pixiBg.drawRect(0,0,w * this.state.CRISP_MULTIPLIER, h * this.state.CRISP_MULTIPLIER);  
		pixiBg.endFill();  
		pixiApp.stage.addChild(pixiBg);
		// create axie container
		var axieContainer = new PIXI.Container();
		pixiApp.stage.addChild(axieContainer);
		//pixiApp.start();
		this.pixiApp = pixiApp;
		this.pixiBg = pixiBg;
		this.axieContainer = axieContainer;
		//
		this.setState({
			canvasW: w,
			canvasH: h,
			axieH: this.state.axieW / this.state.AXIE_SIZE_RATIO,
		}, 
		this.getAllAxies);
	}
	/**
	 * Gets Axies ordered highest to lowest ID and limited to 12
	 * @memberof AxieList
	 */
	getAxies = () => {
		AXIE_DATA.getAxiesByAddress(this.state.address, this.state.offset).then((data)=>{
			//console.log("axies", data);
			this.setState({
				axies : data.axies,
			}, this.loadAxieSpines);
		});
	}
	getAllAxies = () => {
		AXIE_DATA.getAllAxiesByAddress(this.state.address).then((axies)=>{
			//console.log("many axies", axies);
			this.setState({
				axies : axies,
			}, this.loadAxieSpines);
		});
	}
	loadAxieSpines(){
		AXIE_PIXI.getSpinesOfAxies(this.state.axies).then((axieSpines)=>{
			this.setState({
				axie_spines: axieSpines
			}, this.createAxies);
		});
	}
	createAxies(){
		var axiesWithSpine = [];
		if(this.state.axies.length !== this.state.axie_spines.length) throw new Error("axies and axie spines need to be of equal element number to be mapped correctly.");
		for(let i = 0; i < this.state.axies.length; i++){
			axiesWithSpine.push(new Axie(this.state.axies[i], this.state.axie_spines[i]));
		}
		//console.log("sup", axiesWithSpine);
		this.setState({
			axies_with_spine: axiesWithSpine,
		}, this.renderAxies);
	}

	/**
	 * Renders multiple {axies} in a {2d grid}
	 */
	renderAxies(){
		let grid = this.state.grid;
		// fill axies into {2d grid}
		grid.insertElems(this.state.axies_with_spine);
		// render axies in a grid
		//console.log(grid);
		for(let i = 0; i < grid.rows; i++){
			for(let j = 0; j < grid.cols; j++){
				var axie = grid.elems[i][j];
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
	renderAxie(axie, x, y){
		if(!axie.spineData) return; // needs spine to be rendered
		var EXTRA_GAP_X = 130; //60 //100
		var EXTRA_GAP_Y = 150; //50 //150
		var gapX = this.state.axieW + EXTRA_GAP_X;
		var gapY = this.state.axieW / this.state.AXIE_SIZE_RATIO + EXTRA_GAP_Y;
		var startX = 0//120; //120
		var startY = 0//180; //180
		var SCALE = this.state.axieW / this.state.AXIE_BASE_W;
		var ROW_SHIFT = (y % 2 != 0) ? gapX : 0;
		// set scale
		axie.spineData.scale.set(SCALE * this.state.CRISP_MULTIPLIER);
		// set position
		axie.spineData.x = 50;
		axie.spineData.y = 50;
		axie.spineData.position.set(
			(x * gapX + startX) * this.state.CRISP_MULTIPLIER + ROW_SHIFT,
			(y * gapY + startY) * this.state.CRISP_MULTIPLIER,
		);
		// set animation
		//axie.spineData.state.setAnimation(0, "walking", true);
		// add child
		this.axieContainer.addChild(axie.spineData);
		// handle events
		var outlineFilter = new OutlineFilter(8, 0x7cc9ff);
		var outlineFilter2 = new OutlineFilter(8, 0xbbdd33);
		axie.spineData.interactive = true;
		axie.spineData.on('pointerover', (e)=>{
			e.target.filters = [outlineFilter];
		});
		axie.spineData.on("pointerout", (e)=>{
			axie.spineData.filters = null;
		});
		axie.spineData.on("click", (e)=>{
			//console.log("Click", axie);
			this.setState({
				selectedAxie: null,
			}, ()=>{
				this.setState({
					selectedAxie: axie,
				})
			});
		});
	}

	startPixi(){
		// Resize Canvas to display crisp sprites
		this.setCanvasSize(
			Math.round(this.state.canvasW),
			Math.round(this.state.canvasH)
		);
		//console.log(this.state.grid);
		this.pixiApp.start();
		this.setState({loading_complete:true});
		//
		this.pixiBg.interactive = true;
		/*this.pixiBg.on("click", (e) =>{
			console.log("click", e);
			this.axieContainer.y -= 20;
		});*/
		//console.log(this.state.axies_with_spine);

		this.pixiApp.stage.on("mousedown", (e) => {
			this.drag = this.axieContainer;
			this.setState({
				hide_UI : true
			});
		});
		this.pixiApp.stage.on("mouseup", (e) => {
			this.drag = false;
			this.setState({
				hide_UI : false
			});
		});
		this.pixiApp.stage.on("mousemove", (e) =>{
			if(this.drag){
				this.drag.position.x += e.data.originalEvent.movementX *this.state.CRISP_MULTIPLIER;
				this.drag.position.y += e.data.originalEvent.movementY *this.state.CRISP_MULTIPLIER;
			}
		});
		//
		this.addResizeListener();
		//setInterval(() => {this.resizeCanvasToContainer()}, 1000);
	}

	/**
	 * Helper function to size canvas
	 * @param {Number} w canvas width
	 * @param {Number} h canvas height
	 */
	setCanvasSize(w,h){
		this.pixiApp.renderer.resize(w * this.state.CRISP_MULTIPLIER, h * this.state.CRISP_MULTIPLIER);
		this.pixiBg.width = w * this.state.CRISP_MULTIPLIER;
		this.pixiBg.height = h * this.state.CRISP_MULTIPLIER;
		this.setState((prevState) => ({
			canvasW: w,
			canvasH: h,
		}));
	}

	/**
	 * @experimental
	 */
	resizeCanvasToContainer(){
		//console.log(this.state);
		var w = document.getElementById(this.state.containerID).clientWidth;
		var h = document.getElementById(this.state.containerID).clientHeight;
		//console.log(w, h);
		this.setCanvasSize(w,h);
	}

	
	/**
	 * @unused
	 */
	/*getPositionOfAxie(axie_spine){
		return {
			x: (axie_spine.x + this.axieContainer.x - this.state.axieW*2+50) / this.state.CRISP_MULTIPLIER,
			y: (axie_spine.y + this.axieContainer.y - this.state.axieW/this.state.AXIE_SIZE_RATIO*3+60) / this.state.CRISP_MULTIPLIER,
		}
	}*/

	/**
	 * Calculates the {x, y} positions of a specific {axie_spine} inside the canvas, you can also choose which {position} you want to retrieve like:
	 * Used to render UI on top of {canvas}
	 * @param {AxieSpine} axie_spine 
	 * @param {String} position choose a position (top_left, top, bottom_right, left) etc... default is (top_left)
	 * @returns {Object} 
	 */
	getPositionOfAxie(axie_spine, position){
		var CM = this.state.CRISP_MULTIPLIER;
		var TOP_LEFT = {
			"x": (axie_spine.x + this.axieContainer.x) -this.state.axieW / this.state.AXIE_SIZE_RATIO * CM,
			"y": (axie_spine.y + this.axieContainer.y) -this.state.axieW / this.state.AXIE_SIZE_RATIO * CM,
		}
		var offset = {x:0, y:0};
		//
		switch(position){
			case "top_left" : 
				offset.x = 0;
				offset.y = 0;
			break;
			case "top" : 
				offset.x = this.state.axieW/2 * CM;
				offset.y = 0;
			break;
			case "top_right" : 
				offset.x = this.state.axieW * CM;
				offset.y = 0;
			break;
			case "right" :
				offset.x = this.state.axieW * CM;
				offset.y = this.state.axieH/2 * CM;
			break;
			case "bottom_right" :
				offset.x = this.state.axieW * CM;
				offset.y = this.state.axieH * CM;
			break;
			case "bottom" :
				offset.x = this.state.axieW/2 * CM;
				offset.y = this.state.axieH * CM;
			break;
			case "bottom_left" :
				offset.x = 0;
				offset.y = this.state.axieH * CM;
			break;
			case "left" :
				offset.x = 0;
				offset.y = this.state.axieH/2 * CM;
			break;
			case "center" :
				offset.x = this.state.axieW/2 * CM;
				offset.y = this.state.axieH/2 * CM;
			break;
			default:
				offset.x = 0;
				offset.y = 0;
		}
		//
		return {
			x: (TOP_LEFT.x + offset.x) / this.state.CRISP_MULTIPLIER,
			y: (TOP_LEFT.y + offset.y) / this.state.CRISP_MULTIPLIER
		}
	}


	closeSelectedAxie = () => {
		this.setState({
			selectedAxie: null
		}, this.resizeCanvasToContainer);
	}

	
	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	changeAddress = () => {
		this.setState({
			grid: new Grid(500, 15),
			axies: null,
			axie_spines: null,
			axies_with_spine: null,
			loading_complete: false
		}, this.reset);
	}

	reset(){
		// remove listeners
		this.removeResizeListener();
		// clean up canvas children
		for (var i = this.pixiApp.stage.children.length - 1; i >= 0; i--) {	this.pixiApp.stage.removeChild(this.pixiApp.stage.children[i]);};
		this.pixiApp.stage.destroy(true);
		this.pixiApp.stage = null;
		// reset objects
		this.pixiApp = null;
		this.pixiBg = null; //pixi.Graphics
		this.axieContainer = null; //pixi.Container
		this.setupPixiApp();
	}


	addResizeListener() {
		window.addEventListener('resize', this.handleResize );
	}
	removeResizeListener(){
		window.addEventListener('resize', this.handleResize );
	}
	handleResize = () => {
		this.resizeCanvasToContainer();
	}

	render() {

		var axie_overlays = "";
		if(this.state.loading_complete && !this.state.hide_UI){
			axie_overlays = this.state.axies_with_spine.map((axie) => { 
					return (axie.spineData) ? 
					<div 
					className="overlayUI" 
					key={axie.axieData.id} 
					style={{ 
						left:this.getPositionOfAxie(axie.spineData, "top_left").x - 20 + "px", 
						top: this.getPositionOfAxie(axie.spineData, "top_left").y - 40 + "px"
					}}
					>
						<AxieTitle  
						className="inner" 
						id={axie.axieData.id} 
						name={axie.axieData.name} 
						class={axie.axieData.class} />
						<AxieBadges axieData={axie.axieData} />
					</div>
					: ""
				}
			);
		}

		/*if(this.state.loading_complete){
			console.log("tt", this.axieContainer.x);
			this.state.axies_with_spine.forEach(axie => {
				if(axie.spineData) console.log("#"+axie.id, axie.spineData.x);
			});
		}*/


		return (
			<StyledTeamBuilder>

				<BasicCenterContainer>


					<div className="addressBar">
						<Textfield id="teambuilder_address" value={this.state.address} name="Address" placeholder="Address" onChange={this.handleChange("address")} />
						<Button onClick={this.changeAddress} name={"Load Axies"} />
					</div>
					<h3>{this.state.address}</h3>
					<div className="titlebar">
						<h2>Axie Team Builder</h2>
						<h2 className="count">{this.state.axies ? this.state.axies.length : 0}</h2>
					</div>

					<div className="teambuilder_view">
						<div id="axie_teambuilder_container">
							{!this.state.loading_complete ? (
								<Spinner className="spinner" size={60} spinnerColor={"#a146ef"} spinnerWidth={4} visible={true}/>
							) : ""}
							<canvas style={{width: this.state.canvasW, height: this.state.canvasH }} id={this.state.canvasID}>No Canvas support.</canvas>

							<div className="overlays">
								{axie_overlays}
							</div>
							{this.state.selectedAxie ?
								<div className="blackscreen">
								</div>
							: ""}
							{this.state.selectedAxie && !this.state.hide_UI ? 
								<div className="selectedAxie"
								style={{ 
									left:this.getPositionOfAxie(this.state.selectedAxie.spineData, "left").x - 300 + "px", 
									top: this.getPositionOfAxie(this.state.selectedAxie.spineData, "left").y - 250 + "px"
								}}>
									<Button name="Close" onClick={this.closeSelectedAxie} />
									<AxieComponent data={this.state.selectedAxie.axieData}/>
								</div>
							: ""}

						</div>
						<AxieTeams className="axieTeams" selectedAxie={this.state.selectedAxie}/>
					</div>


				</BasicCenterContainer>	
			</StyledTeamBuilder>
		);
	}
}

export default Teambuilder;