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
import {calcBadges} from "../../services/axie-part-and-stats-transform";
import BasicCenterContainer from "../containers/BasicCenterContainer";
import {AXIE_DATA, AXIE_DATA_V1} from "../../services/axie-data-service.js";
import {AXIE_PIXI} from "../../services/axie-pixi-service";
import {Grid} from "../classes/Grid";
import {Axie} from "../classes/Axie";
import AxieTitle from "../AxieTitle";
import AxieBadges from "../AxieBadges";
import AxieScores from "../AxieScores";
import AxieComponent from "../Axie";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import Textfield from "../ui/Textfield";
import AxieTeams from '../AxieTeams';

//CSS
const StyledTeamBuilder = styled.div`
	/* view */
	.teambuilder_view {display:flex; border: 1px solid #e2e2e2;}
	/* component */
	margin-top:20px;
	canvas { width:100%; height:100%;}
	h2 {margin-bottom:15px; font-size:32px; color:#444;}
	h3 { color: grey; font-weight: normal; font-size: 18px; margin-bottom: 10px;}
	.titlebar {display:flex; justify-content:center;}
	.buttonbar {display:flex; margin-bottom:10px;}
	.buttonbar > div {margin-right:10px;}
	.addressContainer {position:relative;}
	.addressBar {position: absolute; z-index: 100; background: white; padding: 20px; box-shadow: 0 4px 12px #00000066; border-radius: 8px; top: 36px;}
	.count { margin-left: 30px; color: grey;}
	/* spinner */
	.spinnerContainer {position: absolute; left:50%; top:50%; margin-top:-30px; margin-left:-30px; display: flex; flex-flow: column; align-items: center;}
	.spinnerContainer .text {color:grey; margin-top:15px; display:flex; align-items:center; justify-content:center; font-size:14px;}
	/* container */
	#axie_teambuilder_container {position:relative; width:80vw; height:calc(100vh - 210px); overflow: hidden; }
	/* axie teams */
	.axieTeams {border-left: 1px solid #e2e2e2;}
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
	/* close btn */
	.closeButton {position:relative; top: 40px; left:200px;}
	/* filtering */
	.filterBar {display:inline-flex; border: 1px solid #e8e8e8; margin-bottom:10px; border-radius:8px; background:white;}
	.filterGroup {display:flex; border-right: 1px solid #e8e8e8; /*margin-right:10px;*/ padding:10px 15px;   }
	.filterGroup:last-child {border:none; margin:0; }
	.filterGroup > div { margin-right:5px;}
`;

// class
class Teambuilder extends React.PureComponent {
	// vars
	drag = false;
	pixiApp = null;
	pixiBg = null; //pixi.Graphics
	axieContainer = null; //pixi.Container,
	//
	constructor(props) {
		super(props);
		this.state = {
			// grid
			GRID_ROWS: 500,
			GRID_COLS: 8,
			// canvas
			containerID: "axie_teambuilder_container",
			canvasID: "axie_teambuilder_canvas",
			canvasW: 1400,
			canvasH: 2500,
			CRISP_MULTIPLIER: 1.6,
			ZOOM : 1,
			ZOOM_CHANGE: 0.1,
			// axie
			AXIE_BASE_W: 570,
			AXIE_SIZE_RATIO: 1.41,
			axieW: 180, // 120 = good
			axieH: null, // is calculated
			axies: null,
			axie_spines: null,
			static_axie_images: null,
			axies_with_spine: null,
			axie_groups: {},
			// ui
			address: "0x2643796cb6b4e715140f09c352ea26afff1a7d93",
			offset: 0,
			hide_UI: false,
			selectedAxie: null,
			showAddressUI: false,
			// loading
			loading_complete: false,
			loading_status: "",
		}
	}

	
	componentDidMount() {
		this.initData();
	}
	componentWillUnmount(){
		this.reset();
	}

	initData(){
		this.setState({
			// axies
			axies: null,
			axie_spines: null,
			static_axie_images: null,
			axies_with_spine: null,
			axie_groups: {},
			//loading
			loading_complete: false,
			loading_status: "Building Pixi...",
		}, this.setupPixiApp);
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
		pixiApp.start();
		pixiApp.stage.interactive = true;
		pixiApp.stage.buttonMode = true;
		// pixi mouse events
		pixiApp.stage.on("mousedown", (e) => {
			this.drag = this.axieContainer;
			this.setState({
				hide_UI : true
			});
		});
		pixiApp.stage.on("mouseup", (e) => {
			this.drag = false;
			this.setState({
				hide_UI : false
			});
		});
		pixiApp.stage.on("mousemove", (e) =>{
			if(this.drag){
				this.drag.position.x += e.data.originalEvent.movementX *this.state.CRISP_MULTIPLIER;
				this.drag.position.y += e.data.originalEvent.movementY *this.state.CRISP_MULTIPLIER;
			}
		});
		// resize listeners
		this.addResizeListener();
		this.addWheelListener();
		//
		/*var camera = new PIXI.Container();
		pixiApp.stage.addChild(camera);*/
		// create bg
		var pixiBg = new PIXI.Graphics();  
		pixiBg.beginFill(0xffffff);  //0xdddddd
		pixiBg.drawRect(0,0,w * this.state.CRISP_MULTIPLIER, h * this.state.CRISP_MULTIPLIER);  
		pixiBg.endFill();  
		pixiApp.stage.addChild(pixiBg);
		pixiBg.interactive = true;
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
				loading_status: "Loading Images...",
			}, this.loadStaticAxieImages);
		});
	}
	getAllAxies = () => {
		AXIE_DATA.getAllAxiesByAddress(this.state.address).then((axies)=>{
			//console.log("many axies", axies);
			this.setState({
				axies : axies,
				loading_status: "Loading Images...",
			}, this.loadStaticAxieImages);
		});
	}
	loadStaticAxieImages(){
		AXIE_DATA_V1.getStaticImagesByAxies(this.state.axies).then((static_axie_images)=>{
			this.setState({
				static_axie_images : static_axie_images,
				loading_status: "Loading Spines...",
			}, this.loadAxieSpines);
		});
	}
	loadAxieSpines(){
		AXIE_PIXI.getSpinesOfAxies(this.state.axies).then((axieSpines)=>{
			this.setState({
				axie_spines: axieSpines,
				loading_status: "Creating Axies...",
			}, this.createAxies);
		});
	}

	createAxies(){
		console.log(this.state.static_axie_images);
		var axiesWithSpine = [];
		if(this.state.axies.length !== this.state.axie_spines.length) throw new Error("axies and axie spines need to be of equal element number to be mapped correctly.");
		for(let i = 0; i < this.state.axies.length; i++){
			var newAxie = new Axie(this.state.axies[i], this.state.axie_spines[i]);
			newAxie.ratings = calcBadges(this.state.axies[i]);
			newAxie.image = this.state.static_axie_images[i];
			//console.log("n",newAxie);
			axiesWithSpine.push(newAxie);
		}
		console.log(axiesWithSpine);
		//console.log("sup", axiesWithSpine);
		var newAxieGroups = Object.assign(this.state.axie_groups, {"all": axiesWithSpine});
		this.setState({
			axies_with_spine: axiesWithSpine,
			axie_groups: newAxieGroups,
		}, this.renderAxies);
	}

	/**
	 * Renders multiple {axies} in a {2d grid}
	 */
	renderAxies = () => {
		this.removeAxiesFromContainer();
		//
		if(!this.state.axies_with_spine.length) return;
		//
		var num_cols = Math.round(Math.sqrt(this.state.axies_with_spine.length));
		var num_rows = num_cols + 150;
		let grid = new Grid(num_rows, num_cols);
		// fill axies into {2d grid}
		grid.insertElems(this.state.axies_with_spine);
		// render axies in a grid
		for(let i = 0; i < grid.rows; i++){
			for(let j = 0; j < grid.cols; j++){
				var axie = grid.elems[i][j];
				if(axie) this.renderAxie(axie, j, i);
			}
		}
		this.setState({
			loading_complete:true,
			loading_status: "3",
			hide_UI: false,
		}, this.resizeCanvasToContainer);
	}
	/**
	 * Renders a single {axiespine}
	 * @param {AxieSpine} axieSpine
	 * @param {Number} x
	 * @param {Number} y
	 */
	renderAxie(axie, x, y){
		if(!axie.spineData) return; // needs spine to be rendered
		var CRISP = this.state.CRISP_MULTIPLIER;
		var ZOOM = this.state.ZOOM;
		//
		var EXTRA_GAP_X = 100 * ZOOM; //60 //100 //90 no ui
		var EXTRA_GAP_Y = 120 * ZOOM; //50 //150 //40 no ui
		var gapX = this.state.axieW / CRISP * ZOOM + EXTRA_GAP_X * ZOOM;
		var gapY = this.state.axieW / this.state.AXIE_SIZE_RATIO / CRISP * ZOOM + EXTRA_GAP_Y;
		var startX = 120//120; //120
		var startY = 180//180; //180
		var SCALE = this.state.axieW / CRISP / this.state.AXIE_BASE_W * ZOOM;
		var ROW_SHIFT = (y % 2 != 0) ? gapX : 0;
		// set scale
		axie.spineData.scale.set(SCALE * CRISP);
		// set position
		/*axie.spineData.x = 50;
		axie.spineData.y = 50;*/
		axie.spineData.position.set(
			(x * gapX + startX) * CRISP + ROW_SHIFT,
			(y * gapY + startY) * CRISP,
		);
		// set animation
		//axie.spineData.state.setAnimation(0, "walking", true);
		//
		// add child
		this.axieContainer.addChild(axie.spineData);
		// check disabled
		if(axie.otherData.disabled) {
			axie.spineData.alpha = 0.2;
			axie.spineData.interactive = false;
			return;
		}
		else{
		// style
		axie.spineData.interactive = true;
		axie.spineData.alpha = 1;
		// set filters
		var outlineFilter = new OutlineFilter(8, 0x7cc9ff);
		var outlineFilter2 = new OutlineFilter(8, 0xbbdd33);
		// handle events
		axie.spineData.on('pointerover', (e)=>{
			e.target.filters = [outlineFilter];
		});
		axie.spineData.on("pointerout", (e)=>{
			axie.spineData.filters = null;
		});
		axie.spineData.on("click", (e)=>{
			//console.log("Click", axie);
			e.target.filters = [outlineFilter];
			this.setState({
				selectedAxie: axie,
			});
		});
	}
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

	resizeCanvasToContainer(){
		//console.log(this.state);
		var w = document.getElementById(this.state.containerID).clientWidth;
		var h = document.getElementById(this.state.containerID).clientHeight;
		//console.log(w, h);
		this.setCanvasSize(w,h);
	}


	/**
	 * Calculates the {x, y} positions of a specific {axie_spine} inside the canvas, you can also choose which {position} you want to retrieve like:
	 * Used to render UI on top of {canvas}
	 * @param {AxieSpine} axie_spine 
	 * @param {String} position choose a position (top_left, top, bottom_right, left) etc... default is (top_left)
	 * @returns {Object} 
	 */
	getPositionOfAxie(axie_spine, position){
		var CM = this.state.CRISP_MULTIPLIER;
		var ZOOM = this.state.ZOOM;
		var TOP_LEFT = {
			"x": (axie_spine.x + this.axieContainer.x) -this.state.axieW / this.state.AXIE_SIZE_RATIO * ZOOM,
			"y": (axie_spine.y + this.axieContainer.y) -this.state.axieW / this.state.AXIE_SIZE_RATIO * ZOOM,
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

	removeAxiesFromContainer() {
		for (var i = this.axieContainer.children.length - 1; i >= 0; i--) {	
			this.axieContainer.removeChild(this.axieContainer.children[i]);
		}
	}

	reset(){
		// remove listeners
		this.removeResizeListener();
		// clean up canvas children
		this.removeAxiesFromContainer();
		this.pixiApp.stage.destroy(true);
		this.pixiApp.stage = null;
		// reset objects
		this.pixiApp = null;
		this.pixiBg = null; //pixi.Graphics
		this.axieContainer = null; //pixi.Container
	}




	/*
	* Events
	*/

	/**
	 * @event {onDepositAxieInTeamBuilder}
	 */
	onDepositAxieInTeamBuilder = (depositedAxie) => {
		this.setState({
			selectedAxie: null
		});
		depositedAxie.otherData.disabled = true;
		this.renderAxies();
		//console.log("d", depositedAxie);
	}
	/**
	 * @event {onTeamDelete}
	 */
	onTeamDelete = (deletedTeam) => {
		var newAxies = [...this.state.axie_groups["all"]];
		deletedTeam.members.forEach((teamMember)=>{
			newAxies.forEach((axie)=>{
				if(teamMember.axie.id === axie.id) axie.otherData.disabled = false;
			});
		});
		this.setState({
			axie_groups: {"all": newAxies},
		}, this.renderAxies());
	}
	/**
	 * @event {onTeamMemberDelete}
	 */
	onTeamMemberDelete = (deletedTeamMember, newTeams) => {
		var newAxies = [...this.state.axie_groups["all"]];
		newAxies.forEach((axie) => {
			if(deletedTeamMember.axie.id === axie.id) axie.otherData.disabled = false;
		});
		this.setState({
			axie_groups: {"all": newAxies},
		}, this.renderAxies());
	}

	addResizeListener() {
		window.addEventListener('resize', this.handleResize );
	}
	removeResizeListener(){
		window.removeEventListener('resize', this.handleResize );
	}
	handleResize = () => {
		this.resizeCanvasToContainer();
	}
	addWheelListener() {
		document.getElementById(this.state.containerID).addEventListener("wheel", this.handleWheel)
	}
	handleWheel = (event) => {
		//console.log(event.deltaY);
		if(event.deltaY > 0){
			this.zoomOut();
		}
		else if(event.deltaY < 0){
			this.zoomIn();
		}
	}


	
/**
 * Filtering 
 */

	reRenderAxies = () => {
		this.setState((prevState)=> ({	
			axies_with_spine: prevState.axies_with_spine.splice(0, prevState.axies_with_spine.length-1),
		}), this.renderAxies);
	}
	showAllAxies = () => {
		var newAxies = [...this.state.axie_groups["all"]];
		//console.log("ll",newAxies);
		this.setState((prevState)=>({
			axies_with_spine: newAxies,
			hide_UI: true,
		}), this.renderAxies);
	}
	showAxiesByRating = (ratingType, ratingLevel) => {
		var newAxies = [];
		this.state.axie_groups["all"].forEach((axie)=>{
			if(!axie.ratings) return;
			if(axie.ratings[ratingType] == ratingLevel) newAxies.push(axie);
		});
		this.setState((prevState)=>({
			axies_with_spine: newAxies,
			hide_UI: true,
		}), this.renderAxies);
	}
	showAxiesByClass = (classType) => {
		var newAxies = [];
		this.state.axie_groups["all"].forEach((axie)=>{
			if(axie.axieData.class == classType) newAxies.push(axie);
		});
		this.setState((prevState)=>({
			axies_with_spine: newAxies,
			hide_UI: true,
		}), this.renderAxies);
	}



	/**
	 * UI
	 */
	zoomIn = () => {
		var correctedX = this.axieContainer.x + (this.axieContainer.x * (1+this.state.ZOOM_CHANGE) - this.axieContainer.x);
		var correctedY = this.axieContainer.y + (this.axieContainer.y * (1+this.state.ZOOM_CHANGE) - this.axieContainer.y);
		this.axieContainer.position.set(correctedX, correctedY);
		this.setState((prevState) => ({
			hide_UI: true,
			ZOOM: prevState.ZOOM + prevState.ZOOM_CHANGE,
		}), this.renderAxies);
	}
	zoomOut = () => {
		var correctedX = this.axieContainer.x - (this.axieContainer.x - this.axieContainer.x * (1 - this.state.ZOOM_CHANGE) );
		var correctedY = this.axieContainer.y - (this.axieContainer.y - this.axieContainer.y * (1 - this.state.ZOOM_CHANGE) );
		this.axieContainer.position.set(correctedX, correctedY);
		//console.log(this.axieContainer.x);
		this.setState((prevState) => ({
			hide_UI: true,
			ZOOM: prevState.ZOOM - prevState.ZOOM_CHANGE,
		}), this.renderAxies);
	}
	toggleAddress = () => {
		this.setState((prevState) => ({
			showAddressUI: !prevState.showAddressUI,
		}));
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
		this.reset();
		this.initData();
	}

	

	render() {
		console.log("render...");
		var axie_overlays = "";
		if(this.state.axies_with_spine && 
			 this.state.axies_with_spine.length < 130 && 
			 this.state.ZOOM > 0.8 &&
			 this.state.loading_complete && 
			 !this.state.hide_UI){
			axie_overlays = this.state.axies_with_spine.map((axie) => { 
					return (axie.spineData) ? 
					<div 
					className="overlayUI" 
					key={axie.axieData.id} 
					style={{ 
						left:this.getPositionOfAxie(axie.spineData, "top_left").x - 35*this.state.ZOOM + "px", 
						top: this.getPositionOfAxie(axie.spineData, "top_left").y - 50*this.state.ZOOM + "px"
					}}
					>
						<AxieTitle  
						className="inner" 
						id={axie.axieData.id} 
						name={axie.axieData.name} 
						class={axie.axieData.class} />
						<AxieBadges axieData={axie.axieData} size="normal"/>
					</div>
					: ""
				}
			);
		}

		return (
			<StyledTeamBuilder>
				<BasicCenterContainer>
					<div className="titlebar">
						<h2>Axie Team Builder</h2>
						<h2 className="count">
							{this.state.axies_with_spine ? this.state.axies_with_spine.length : 0} 
							{this.state.axie_groups["all"] ? " / " + this.state.axie_groups["all"].length : ""} 
						</h2>
					</div>
					<div className="buttonbar">
						<div style={{"display":"none"}} className="zoomButtons">
							<Button name="Zoom In" onClick={this.zoomIn} />
							<Button name="Zoom Out" onClick={this.zoomOut} />
						</div>
						<div style={{"display":"none"}} className="testButtons">
							<Button name="Trigger rerender" onClick={this.reRenderAxies} />
						</div>
					</div>
					<div className="filterBar">
							<div className="filterGroup">
								<Button name={"Reset"} onClick={this.showAllAxies} />
							</div>
							<div className="filterGroup">
								<IconButton color={"#4e4e4e"} icon={"./img/icons/stats/attack.svg"} onClick={() => this.showAxiesByRating("athLevel", 1)} />
								<IconButton color={"#4e4e4e"} icon={"./img/icons/stats/attack.svg"} onClick={() => this.showAxiesByRating("athLevel", 2)} />
								<IconButton color={"#4e4e4e"} icon={"./img/icons/stats/attack.svg"} onClick={() => this.showAxiesByRating("athLevel", 3)} />
							</div>
							<div className="filterGroup">
								<IconButton color={"#4e4e4e"} icon={"./img/icons/stats/defense.svg"} onClick={() => this.showAxiesByRating("tankLevel", 1)} />
								<IconButton color={"#4e4e4e"} icon={"./img/icons/stats/defense.svg"} onClick={() => this.showAxiesByRating("tankLevel", 2)} />
								<IconButton color={"#4e4e4e"} icon={"./img/icons/stats/defense.svg"} onClick={() => this.showAxiesByRating("tankLevel", 3)} />
							</div>
							<div className="filterGroup">
								<IconButton color={"#6BBF00"} icon={"./img/icons/classes/plant_24px.svg"} onClick={() => this.showAxiesByClass("plant")}/>
								<IconButton color={"#00B8CF"} icon={"./img/icons/classes/aquatic_24px.svg"} onClick={() => this.showAxiesByClass("aquatic")}/>
								<IconButton color={"#FFB70F"} icon={"./img/icons/classes/beast_24px.svg"} onClick={() => this.showAxiesByClass("beast")}/>
								<IconButton color={"#A979F8"} icon={"./img/icons/classes/reptile_24px.svg"} onClick={() => this.showAxiesByClass("reptile")}/>
								<IconButton color={"#FF5241"} icon={"./img/icons/classes/bug_24px.svg"} onClick={() => this.showAxiesByClass("bug")}/>
								<IconButton color={"#FF8ABC"} icon={"./img/icons/classes/bird_24px.svg"} onClick={() => this.showAxiesByClass("bird")}/>
							</div>
							<div className="filterGroup">
								<Textfield name="Search Part" placeholder="Search Part"/> 
							</div>
							<div className="filterGroup">
								<div className="addressContainer">
								<Button name="Toggle Address" onClick={this.toggleAddress}/>
								{ this.state.showAddressUI ? 
								<div className="addressBar">
									<Textfield id="teambuilder_address" value={this.state.address} name="Address" placeholder="Address" onChange={this.handleChange("address")} />
									<h3>{this.state.address}</h3>
									<Button onClick={this.changeAddress} name={"Load Axies"} />
								</div>
								: ""}
								</div>
							</div>
						</div>

					<div className="teambuilder_view">
						<div id="axie_teambuilder_container">


							{!this.state.loading_complete ? (
								<div className="spinnerContainer">
									<Spinner className="spinner" size={60} spinnerColor={"#a146ef"} spinnerWidth={4} visible={true}/>
									<div className="text">{this.state.loading_status}</div>
								</div>
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
									left:this.getPositionOfAxie(this.state.selectedAxie.spineData, "center").x - 135 + "px", 
									top: this.getPositionOfAxie(this.state.selectedAxie.spineData, "center").y - 250 + "px"
								}}>
									<Button className="closeButton" name="Close" onClick={this.closeSelectedAxie} />
									<AxieComponent data={this.state.selectedAxie.axieData}  img={this.state.selectedAxie.image}/>
								</div>
							: ""}

						</div>
						<AxieTeams 
							className="axieTeams" 
							selectedAxie={this.state.selectedAxie} 
							onAxieDeposit={this.onDepositAxieInTeamBuilder}
							onTeamDelete={this.onTeamDelete}
							onTeamMemberDelete={this.onTeamMemberDelete} 
						/>
					</div>
				</BasicCenterContainer>	
			</StyledTeamBuilder>
		);
	}
}

export default Teambuilder;