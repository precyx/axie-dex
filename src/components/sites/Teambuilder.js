import React from 'react';
import styled from "styled-components";
//spinner
import Spinner from 'react-spinner-material';
//axios
//import axios from 'axios';
//web3
import web3 from 'web3';
//pixi
import * as PIXI from 'pixi.js';
import 'pixi-spine';
import "pixi-filters";
import { OutlineFilter } from '@pixi/filter-outline';
// tooltip
import ReactTooltip from 'react-tooltip'
// own
import {calcBadges} from "../../services/axie-part-and-stats-transform";
import BasicCenterContainer from "../containers/BasicCenterContainer";
import {AXIE_DATA, AXIE_DATA_V1} from "../../services/axie-data-service.js";
import {AXIE_PIXI} from "../../services/axie-pixi-service";
//import AxieTitle from "../AxieTitle";
import AxieBadges from "../AxieBadges";
//import AxieScores from "../AxieScores";
//import AxieParts from "../AxieParts";
import AxieComponent from "../Axie/Axie/Axie";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import Textfield from "../ui/Textfield";
import AxieTeams from '../AxieTeams';
import AxiePartList from '../AxiePartList';
//import AxiePartClasses from '../AxiePartClasses';
// classes
import {Grid} from "../classes/Grid";
import {Axie} from "../classes/Axie";
import AxiePartClass from "../classes/AxiePart"

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
	/* addressContainer */
	.addressContainer {position:relative; z-index:120; margin-left:30px;}
	.addressContainer h3 {margin-top:10px;}
	.addressContainer .button {color: rgba(0, 0, 0, 0.85); border-radius: 30px; padding: 10px 15px; font-weight: bold; border: 1px solid #d4d4d4;}
	.addressBar {position: absolute; z-index: 100; background: white; padding: 20px; box-shadow: 0 3px 15px rgba(0, 0, 0, 0.4); border-radius: 8px; top: 55px;}
	.addressBar .demoAddresses {font-size:10px; display:flex; display: flex; flex-flow: column; color: #9c9c9c; margin-top: 10px;}
	.addressBar .demoAddresses .address b {margin-left:5px;}
	.count { margin-left: 30px; color: grey;}
	/* spinner */
	.spinnerContainer {position: absolute; left:50%; top:50%; margin-top:-30px; margin-left:-30px; display: flex; flex-flow: column; align-items: center;}
	.spinnerContainer .text {color:grey; margin-top:20px; display:flex; align-items:center; justify-content:center; font-size:14px;}
	/* container */
	#axie_teambuilder_container {position:relative; width:100%; height:calc(100vh - 210px); overflow: hidden; }
	/* axie teams */
	/* overlay ui */
	.overlayUI, .overlayUI2 {position:absolute; left:10px; top:-20px;    margin-top: -25px; /*pointer-events: none;*/ display:flex; align-items:normal; }
	.overlayUI .axieTitle { display:none; background: white; padding: 2px 8px; border-radius: 10px;}
	.overlayUI .axieTitle .name { display:none; }
	.overlayUI .axieTitle .id { font-size:14; font-weight:bold; color:grey; }
	.overlayUI .id { font-size: 12px; font-weight: normal; color: #464646; margin-top: 5px; background: #565656; color: white!important; padding: 4px 10px; border-radius: 30px; display:inline-flex;}
	.overlayUI .outer { display:flex; flex-flow:column; align-items: end; }
	.overlayUI .saleData {font-size: 15px; font-weight: bold; color: #464646; margin-top: 5px;}
	/* no axies found */
	.no_results_hint {font-size:24px; color:grey; display:flex; width:100%; height:100%; background:white; align-items:center; justify-content:center;}
	/* selected axie */
	.selectedAxie {position:absolute; }
	.selectedAxie .axie { margin: 0; box-shadow: 0 2px 22px #0000004a; border:none;}
	/* blackscreen */
	.blackscreen {position:absolute; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.25); user-select: none; pointer-events: none;}
	/* close btn */
	.closeButton {position:relative; top: 40px; left:200px; z-index:10;}
	/* filtering */
	.filterBar {display:inline-flex; border: 1px solid #e8e8e8; margin-bottom:10px; border-radius:8px; background:white;}
	.filterGroup {display:flex; position:relative;  border-right: 1px solid #e8e8e8; /*margin-right:10px;*/ padding:10px 15px;   }
	.filterGroup:last-child {border:none; margin:0; }
	.filterGroup > div { margin-right:5px;}
	.filterGroup .btx {cursor: pointer; display: flex; align-items: center; font-size: 12px; color: #a146ef; margin: 0 5px; padding: 0 10px; border-radius: 50px;}
	.filterGroup .btx:hover {background: #efefef;}
	/* all parts */
	.axiePartList {	position: absolute; top:55px; right:0; }
	.toggleAllPartsButton {width:100px;}
	.partList .part {user-select:none; cursor:pointer;}
`;

// class
class Teambuilder extends React.PureComponent {
	// vars
	drag = false;
	pixiApp = null;
	pixiBg = null; //pixi.Graphics
	axieContainer = null; //pixi.Container,
	address_pool = [
		"0x5ea1d56d0dde1ca5b50c277275855f69edefa169",
		"0x2643796cb6b4e715140f09c352ea26afff1a7d93",
		"0x4ce15b37851a4448a28899062906a02e51dee267",
		"0x1e3934ea7e416f4e2bc5f7d55ae9783da0061475",
		"0xf521bb7437bec77b0b15286dc3f49a87b9946773",
		"0xa6bcec585f12cefba9709a080ce2efd38f871024",
		"0x730952cc677b1f432893d53cbf528baccbbf2441",
		"0x21099184e7b0be245e3eed492288a07de2c64fd7",
		"0xe293390d7651234c6dfb1f41a47358b9377c004f",
	];
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
			// statistics
			parts: {},
			partArray: [],
			// ui
			address: this.address_pool[Math.floor(Math.random() * this.address_pool.length)],
			offset: 0,
			hide_UI: false,
			selectedAxie: null,
			showAddressUI: false,
			showAllParts: false,
			// loading
			is_loading: false,
			loading_complete: false,
			loading_status: "",
			numStaticImagesLoaded: 0,
			numSpinesLoaded: 0,
		}
	}

	
	componentDidMount() {
		this.initData(false);
	}
	componentWillUnmount(){
		this.reset();
	}

	initData(continueWithThePlan){
		this.setState({
			// axies
			axies: null,
			axie_spines: null,
			static_axie_images: null,
			axies_with_spine: null,
			axie_groups: {},
			// statistics
			parts: {},
			partArray: [],
			//loading
			is_loading: false,
			loading_complete: false,
			loading_status: "Building Pixi...",
			numStaticImagesLoaded: 0,
			numSpinesLoaded: 0,
		}, ()=>{
			if(continueWithThePlan) {
				this.setupPixiApp();
			}
		});
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
	getAllAxies = () => {
		this.setState({
			loading_status: "Loading Images",
			is_loading: true,
		}, ()=>{
			AXIE_DATA.getAllAxiesByAddress(this.state.address).then((axies)=>{
				//console.log("many axies", axies);
				this.setState({
					axies : axies,
				}, this.loadStaticAxieImages);
			});
		});
	}
	loadStaticAxieImages(){
		AXIE_DATA_V1.getStaticImagesByAxies(this.state.axies, (axie)=>{
			//console.log(axie.id);
			this.setState((prevState) => ({
				numStaticImagesLoaded: prevState.numStaticImagesLoaded + 1,
				loading_status: "Loading Images " + this.state.numStaticImagesLoaded + " / " + this.state.axies.length,
			}));
		}).then((static_axie_images)=>{
			this.setState({
				static_axie_images : static_axie_images,
				loading_status: "Loading Spine Data",
			}, this.loadAxieSpines);
		});
	}
	loadAxieSpines(){
		AXIE_PIXI.getSpinesOfAxies(this.state.axies, (axie) =>{
			//console.log(axie);
			this.setState((prevState) => ({
				numSpinesLoaded: prevState.numSpinesLoaded + 1,
				loading_status: "Loading Spine Data " + this.state.numSpinesLoaded + " / " + this.state.axies.length,
			}));
		}).then((axieSpines)=>{
			this.setState({
				axie_spines: axieSpines,
				loading_status: "Complete",
			}, this.createAxies);
		});
	}

	createAxies(){
		var axiesWithSpine = [];
		if(this.state.axies.length !== this.state.axie_spines.length) throw new Error("axies and axie spines need to be of equal element number to be mapped correctly.");
		for(let i = 0; i < this.state.axies.length; i++){
			var newAxie = new Axie(this.state.axies[i], this.state.axie_spines[i]);
			newAxie.ratings = calcBadges(this.state.axies[i]);
			newAxie.image = this.state.static_axie_images[i];
			axiesWithSpine.push(newAxie);
		}
		var newAxieGroups = Object.assign(this.state.axie_groups, {"all": axiesWithSpine});
		this.setState({
			axies_with_spine: axiesWithSpine,
			axie_groups: newAxieGroups,
		}, this.countParts);
	}

	countParts(){
		//var partTypes = ["back", "ears", "eyes", "horn", "mouth", "tail"];
		var parts = {};
		this.state.axies_with_spine.forEach((axie)=>{
			if(!axie.axieData.parts) return;
			axie.axieData.parts.forEach((part)=>{
				var partID = part.id;
				if(!parts[partID]) {
					var p = new AxiePartClass(part); 
					p.count = 1;
					parts[partID] = p;
				}
				else {
					parts[partID].count ++;
				}
			});
		});
		var partArray = Object.values(parts);
		console.log("num Parts:", partArray.length);
		this.setState({
			parts: parts,
			partArray: partArray,
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
		console.log("loading complete");
		this.setState({
			hide_UI: false,
			is_loading: false,
			loading_complete: true,
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
		var ROW_SHIFT = (y % 2 !== 0) ? gapX : 0;
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
		//var outlineFilter2 = new OutlineFilter(8, 0xbbdd33);
		// handle events
		axie.spineData.on('pointerover', (e)=>{
			e.target.filters = [outlineFilter];
		});
		axie.spineData.on("pointerout", (e)=>{
			axie.spineData.filters = null;
		});
		axie.spineData.on("click", (e)=>{
			e.target.filters = [outlineFilter];
			this.setState({
				selectedAxie: axie,
			});
		});
	}
	}





	/* 
		Class Member Functions 
	*/

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
		console.log("loading complete", this.state.loading_complete);
		console.log("is loading", this.state.is_loading);
		var w = document.getElementById(this.state.containerID).clientWidth;
		var h = document.getElementById(this.state.containerID).clientHeight;
		this.setCanvasSize(w,h);
	}

	reset(){
		// remove listeners
		this.removeResizeListener();
		// clean up canvas children
		this.removeAxiesFromContainer();
		if(this.pixiApp){
		this.pixiApp.stage.destroy(true);
		this.pixiApp.stage = null;
		}
		// reset objects
		this.pixiApp = null;
		this.pixiBg = null; //pixi.Graphics
		this.axieContainer = null; //pixi.Container
	}

	removeAxiesFromContainer() {
		if(!this.axieContainer) return;
		for (var i = this.axieContainer.children.length - 1; i >= 0; i--) {	
			this.axieContainer.removeChild(this.axieContainer.children[i]);
		}
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
		}, this.renderAxies);
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
		}, this.renderAxies);
	}
	/**
	 * @event {onClickPartList}
	 */
	onClickPartList = (clickedPart) => {
		this.showAxiesByPart(clickedPart.partData.id);
	}
	/**
	 * @event {onViewTeam}
	 */
	onViewTeam = (teamToView) => {
		// create new axies
		var newAxies = [];
		teamToView.members.forEach((teamMember)=>{
			newAxies.push(teamMember.axie);
		});
		this.setState({
			axies_with_spine: newAxies,
			hide_UI: true,
		}, this.renderAxies);
	}



	/* 
	 Listeners
	*/
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
		if(event.deltaY > 0){
			this.zoomOut();
		}
		else if(event.deltaY < 0){
			this.zoomIn();
		}
	}


	areAxiesLoaded = () => {
		var axies = this.state.axie_groups['all'];
		if (typeof axies === 'undefined') return false;
		else return true;
	}
	/**
	 * Filtering 
	 */
	showAllAxies = () => {
		var newAxies = [...this.state.axie_groups["all"]];
		this.setState((prevState)=>({
			axies_with_spine: newAxies,
			hide_UI: true,
		}), this.renderAxies);
	}
	showAxiesByPricing = () =>{
		var newAxies = [];
		this.state.axie_groups["all"].forEach((axie) =>{
			if(axie.axieData.auction !== null){
				if(axie.axieData.auction.type === 'sale'){
					newAxies.push(axie);
					newAxies.sort((a, b) =>{
						return b.axieData.id - b.axieData.id;
					});
				}
			}
		});
		this.setState((prevState)=>({
			axies_with_spine: newAxies,
			hide_UI: true,
		}), this.renderAxies);
	}

	showAxiesByRating = (ratingType, ratingLevel) => {
		var newAxies = [];
		this.state.axie_groups["all"].forEach((axie)=>{
			if(!axie.ratings) return;
			if(axie.ratings[ratingType].level >= ratingLevel) newAxies.push(axie);
		});
		newAxies.sort((a, b) => {
			return b.ratings[ratingType].score - a.ratings[ratingType].score;
		});
		this.setState((prevState)=>({
			axies_with_spine: newAxies,
			hide_UI: true,
		}), this.renderAxies);
	}
	showAxiesByClass = (classType) => {
		var newAxies = [];
		this.state.axie_groups["all"].forEach((axie)=>{
			if(axie.axieData.class === classType) newAxies.push(axie);
		});
		this.setState((prevState)=>({
			axies_with_spine: newAxies,
			hide_UI: true,
		}), this.renderAxies);
	}
	showAxiesByTag = (tagName) => {
		var newAxies = [];
		this.state.axie_groups["all"].forEach((axie)=>{
			if(axie.axieData.title === tagName) newAxies.push(axie);
		});
		this.setState((prevState)=>({
			axies_with_spine: newAxies,
			hide_UI: true,
		}), this.renderAxies);
	}
	showAxiesByMystics = (mysticCount) => {
		var newAxies = [];
		this.state.axie_groups["all"].forEach((axie)=>{
			var parts = axie.axieData.parts;
			if(!parts) return;
			var numMystic = 0;
			axie.axieData.parts.forEach((part)=>{
				if(part.mystic) numMystic++;
			});
			if(numMystic >= mysticCount) newAxies.push(axie);
		});
		this.setState((prevState)=>({
			axies_with_spine: newAxies,
			hide_UI: true,
		}), this.renderAxies);
	}
	showAxiesByPart = (partID) => {
		var newAxies = [];
		this.state.axie_groups["all"].forEach((axie)=>{
			var parts = axie.axieData.parts;
			if(!parts) return;
			var partFound = false;
			axie.axieData.parts.forEach((part)=>{
				if(part.id === partID) partFound = true;
			});
			if(partFound) newAxies.push(axie);
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
        this.setState((prevState) => ({
            hide_UI: true,
            ZOOM: Math.max( prevState.ZOOM - prevState.ZOOM_CHANGE, 0 ),
        }), this.renderAxies);
    }
	toggleAddress = () => {
		this.setState((prevState) => ({
			showAddressUI: !prevState.showAddressUI,
		}));
	}
	toggleAllParts = () => {
		this.setState((prevState) => ({
			showAllParts: !prevState.showAllParts,
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
		this.initData(true);
	}



		/* 
		Helpers 
	*/

	/**
	 * Calculates the {x, y} positions of a specific {axie_spine} inside the canvas, you can also choose which {position} you want to retrieve like:
	 * Used to render UI on top of {canvas}
	 * @param {AxieSpine} axie_spine 
	 * @param {String} position choose a position (top_left, top, bottom_right, left) etc... default is (top_left)
	 * @returns {Object} 
	 */
	getPositionOfAxie(axie_spine, position){
		//var CM = this.state.CRISP_MULTIPLIER;
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
				offset.x = this.state.axieW/2 * ZOOM;
				offset.y = 0;
			break;
			case "top_right" : 
				offset.x = this.state.axieW * ZOOM;
				offset.y = 0;
			break;
			case "right" :
				offset.x = this.state.axieW * ZOOM;
				offset.y = this.state.axieH/2 * ZOOM;
			break;
			case "bottom_right" :
				offset.x = this.state.axieW * ZOOM;
				offset.y = this.state.axieH * ZOOM;
			break;
			case "bottom" :
				offset.x = this.state.axieW/2 * ZOOM;
				offset.y = this.state.axieH * ZOOM;
			break;
			case "bottom_left" :
				offset.x = 0;
				offset.y = this.state.axieH * ZOOM;
			break;
			case "left" :
				offset.x = 0;
				offset.y = this.state.axieH/2 * ZOOM;
			break;
			case "center" :
				offset.x = this.state.axieW/2 * ZOOM;
				offset.y = this.state.axieH/2 * ZOOM;
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
	

	render() {
		//console.log("render...");

		/* Overlay UI */
		var axie_overlays = "";
		if(this.state.axies_with_spine && 
			 this.state.axies_with_spine.length < 101 && 
			 this.state.ZOOM > 0.8 &&
			 this.state.loading_complete && 
			 !this.state.hide_UI){
			axie_overlays = this.state.axies_with_spine.map((axie) => { 
				var nowPrice;
				var endPrice;
				if(axie.axieData.auction !== null){
					var nowPrice = web3.utils.fromWei(axie.axieData.auction.buyNowPrice, 'ether');
					var endPrice = web3.utils.fromWei(axie.axieData.auction.endingPrice, 'ether');
					var msg;
					if(nowPrice === endPrice) msg = Math.round(nowPrice * 100) / 100 + 'eth';
					else msg = Math.round(nowPrice * 100) / 100 + 'eth => ' + endPrice + 'eth';
				}
				else {
					endPrice = '';
					nowPrice = '';
				}
	
					return (axie.spineData) ? 
					<div 
					className="overlayUI" 
					key={axie.axieData.id} 
					style={{ 
						left:this.getPositionOfAxie(axie.spineData, "top_left").x - 35*this.state.ZOOM + "px", 
						top: this.getPositionOfAxie(axie.spineData, "top_left").y - 50*this.state.ZOOM + "px"
					}}
					>

					{/* //pseudo code
					var grid = new Grid(10,10);
					for(var i = 0; i < grid.rows.lenght){
						this.getPositionOfRow(i).x - 100,
						this.getPositionOfRow(i).y + 50,
					}
				*/}
						
							<AxieBadges axieData={axie.axieData} size="normal"/>
							<div className = "outer">
							<a className="id" target="_blank" href={"https://axieinfinity.com/axie/" + axie.axieData.id}>#{axie.axieData.id}</a>
							<a className="saleData" target="_blank" href={"https://axieinfinity.com/axie/" + axie.axieData.id}>{msg}</a>
							</div>

					</div>
					: ""
				}
			);
		}

		var axie_overlays2 = "";
		/*if(this.state.axies_with_spine && 
			this.state.axies_with_spine.length < 20 && 
			this.state.ZOOM > 0.8 &&
			this.state.loading_complete && 
			!this.state.hide_UI) {
				axie_overlays2 = this.state.axies_with_spine.map((axie) => { 
					return (axie.spineData) ? 
					<div 
					className="overlayUI2" 
					key={axie.axieData.id} 
					style={{ 
						left:this.getPositionOfAxie(axie.spineData, "bottom_right").x  + "px", 
						top: this.getPositionOfAxie(axie.spineData, "bottom_right").y  + "px"
					}}
					>
						<AxieParts parts={axie.axieData.parts} />
					</div>
					: ""
				}
			);
		}*/

		return (
			<StyledTeamBuilder>
				<BasicCenterContainer>
					{/* TitleBar */}
					<div className="titlebar">
						<h2>Axie Team Builder</h2>
						<h2 className="count">
							{this.state.axies_with_spine ? this.state.axies_with_spine.length : 0} 
							{this.state.axie_groups["all"] ? " / " + this.state.axie_groups["all"].length : ""} 
						</h2>
						
						<div className="addressContainer">
								<Button name="Toggle Address" onClick={this.toggleAddress}/>
								{ this.state.showAddressUI ? 
								<div className="addressBar">
									<Textfield id="teambuilder_address" value={this.state.address} name="Address" placeholder="Address" onChange={this.handleChange("address")} />
									<h3>{this.state.address}</h3>
									<Button onClick={this.changeAddress} name={"Load Axies"} />
									<div className="demoAddresses">
										<div className="address"><span>0x2643796cb6b4e715140f09c352ea26afff1a7d93</span><b>(~24)</b></div>
										<div className="address"><span>0x5ea1d56d0dde1ca5b50c277275855f69edefa169</span><b>(~18)</b></div>
										<div className="address"><span>0xf521bb7437bec77b0b15286dc3f49a87b9946773</span><b>(~110)</b></div>
									</div>
								</div>
								: ""}
							</div>
					</div>

					{/* FilterBar */}
					<div className="filterBar">
						<div className="filterGroup">
							<Button name={"Reset"} onClick={this.showAllAxies} />
						</div>
						<div className="filterGroup">
						<ReactTooltip id={"tb_attack_level_1"} type='dark' effect='solid' place="top">ATK Level 1</ReactTooltip>
						<ReactTooltip id={"tb_attack_level_2"} type='dark' effect='solid' place="top">ATK Level 2</ReactTooltip>
						<ReactTooltip id={"tb_attack_level_3"} type='dark' effect='solid' place="top">ATK Level 3</ReactTooltip>
						<ReactTooltip id={"sale_filter"} type='dark' effect='solid' place="top">Sale filter</ReactTooltip>


							<div data-tip data-for={"tb_attack_level_1"}> 
								<IconButton active="true" color={"#4e4e4e"} icon={"./img/icons/statLevels/attack_level_1.svg"} onClick={() => this.showAxiesByRating("attack", 1)}/> 
							</div>

							<div data-tip data-for={"tb_attack_level_2"}> 
								<IconButton color={"#4e4e4e"} icon={"./img/icons/statLevels/attack_level_2.svg"} onClick={() => this.showAxiesByRating("attack", 2)} />
							</div>
							<div data-tip data-for={"tb_attack_level_3"}>
								<IconButton color={"#4e4e4e"} icon={"./img/icons/statLevels/attack_level_3.svg"} onClick={() => this.showAxiesByRating("attack", 3)} />
							</div>
							<div data-tip data-for={"sale_filter"}>
								<IconButton color={"#4e4e4e"} icon={"./img/icons/statLevels/attack_level_3.svg"} onClick={() => this.showAxiesByPricing()} />
							</div>
						</div>
						<div className="filterGroup">
							<ReactTooltip id={"tb_tank_level_1"} type='dark' effect='solid' place="top">TNK Level 1</ReactTooltip>
							<ReactTooltip id={"tb_tank_level_2"} type='dark' effect='solid' place="top">TNK Level 2</ReactTooltip>
							<ReactTooltip id={"tb_tank_level_3"} type='dark' effect='solid' place="top">TNK Level 3</ReactTooltip>
							<div data-tip data-for={"tb_tank_level_1"}>
								<IconButton color={"#4e4e4e"} icon={"./img/icons/statLevels/defense_level_1.svg"} onClick={() => this.showAxiesByRating("tankiness", 1)} />
							</div>
							<div data-tip data-for={"tb_tank_level_2"}>
								<IconButton color={"#4e4e4e"} icon={"./img/icons/statLevels/defense_level_2.svg"} onClick={() => this.showAxiesByRating("tankiness", 2)} />
							</div>
							<div data-tip data-for={"tb_tank_level_3"}>
								<IconButton color={"#4e4e4e"} icon={"./img/icons/statLevels/defense_level_3.svg"} onClick={() => this.showAxiesByRating("tankiness", 3)} />
							</div>
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
							<div className="btx" onClick={() => this.showAxiesByTag("Origin")}>Origin</div>
							<div className="btx" onClick={() => this.showAxiesByTag("MEO Corp")}>MEO</div>
							<div className="btx" onClick={() => this.showAxiesByTag("MEO Corp II")}>MEO II</div>
						</div>
						<div className="filterGroup">
							<div className="btx" onClick={() => this.showAxiesByMystics(1)}>Mystic</div>
						</div>
						<div className="filterGroup">
							<Textfield name="Search Part" placeholder="Search Part"/> 
							<Button className="toggleAllPartsButton" name={"All Parts"} onClick={this.toggleAllParts} />
							{this.state.partArray &&
							this.state.partArray.length &&
							this.state.showAllParts ? 
								<AxiePartList
								className="partList"
								parts={this.state.partArray}
								onClickPart={this.onClickPartList}
								/> 
							: ""}
						</div>
					</div>

					{/* TeamBuilderView */}
					<div className="teambuilder_view">
						<div id="axie_teambuilder_container">
							{this.state.axies_with_spine &&
							 this.state.axies_with_spine.length === 0 ? 
							<div className="no_results_hint">
								No Axies found...
							</div> 
							: ""}

							{(this.state.is_loading && !this.state.loading_complete) ? (
								<div className="spinnerContainer">
									<Spinner className="spinner" size={30} spinnerColor={"#a146ef"} spinnerWidth={3} visible={true}/>
									<div className="text">{this.state.loading_status}</div>
								</div>
							) : ""}



							<canvas style={{width: this.state.canvasW, height: this.state.canvasH }} id={this.state.canvasID}>No Canvas support.</canvas>

							<div className="overlays">
								{axie_overlays}
							</div>

							<div className="overlays2">
								{axie_overlays2}
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

						{/* AxieTeams */}
						<AxieTeams 
							className="axieTeams" 
							selectedAxie={this.state.selectedAxie} 
							onAxieDeposit={this.onDepositAxieInTeamBuilder}
							onTeamDelete={this.onTeamDelete}
							onTeamMemberDelete={this.onTeamMemberDelete}
							onViewTeam={this.onViewTeam} 
						/>
					</div>
				</BasicCenterContainer>	
			</StyledTeamBuilder>
		);
	}
}

export default Teambuilder;