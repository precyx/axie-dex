import React, { Component } from 'react';
import styled from "styled-components";
//axios
import axios from 'axios';
//pixi
import * as PIXI from 'pixi.js';
import 'pixi-spine';
// own
import {buildAxiesByAddressAPI} from "../../services/axie-data-service.js";
import BasicCenterContainer from "../containers/BasicCenterContainer";
import {getAxieSpine} from "../../services/axie-pixi-service";


//CSS
const StyledTeamBuilder = styled.div`
	h1 {margin-bottom:15px;}
	canvas { border: 1px solid #e2e2e2;}
`;

// class
class Teambuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: new Grid(),
			pixiApp: null,
			canvasID: "axie_teambuilder_canvas",
			canvasW: 1400,
			canvasH: 2500,
			CRISP_MULTIPLIER: 2,
			// axie
			AXIE_BASE_W: 570,
			AXIE_SIZE_RATIO: 1.41,
			axieW: 120, // 120 = good
			axies: null,
			axie_spines: null,
			// ui
			address: "0xe293390d7651234c6dfb1f41a47358b9377c004f",
			offset: 0,
		}
	}

	
	componentDidMount() {
		this.setupPixiApp();
	}
	
	setupPixiApp(){
		var pixiApp = new PIXI.Application({
      view: document.getElementById(this.state.canvasID),
      width: this.state.canvasW * this.state.CRISP_MULTIPLIER, // double canvas size to ensure crisp sprite render
      height: this.state.canvasH * this.state.CRISP_MULTIPLIER, // double canvas size to ensure crisp sprite render
			transparent: true,
      //forceCanvas:true,
		});
		//pixiApp.start();
		this.setState({pixiApp:pixiApp}, this.getManyAxies);
	}

	/**
	 * Gets Axies ordered highest to lowest ID and limited to 12
	 * @memberof AxieList
	 */
	getAxies = () => {
		var api = buildAxiesByAddressAPI(this.state.address, this.state.offset);
		axios.get(api).then(data=>{
			console.log("d", data.data.axies);
			this.setState({
				axies : data.data.axies,
			}, this.loadAxieSpines);
		})
	}

	getManyAxies = () => {
		var axie_count = 100;
		var axies_per_page = 12;
		var num_pages = Math.round(axie_count / axies_per_page);
		var axies = [];
		//
		var promises = [];
		for(let i = 0; i < num_pages; i++){
			var api = buildAxiesByAddressAPI(this.state.address, i * axies_per_page);
			var p = new Promise((resolve,reject)=>{
				axios.get(api).then(data=>{
					axies = [...data.data.axies, ...axies];
					console.log("kkk",axies);
					resolve(axies);
				});
			});
		}
		promises.push(p);
		Promise.all(promises).then((axies)=>{
			console.log("aa",axies);
			this.setState({
				axies : axies[0],
			}, this.loadAxieSpines);
		});
	}

	/**
	 * loads axie spines
	 */
	loadAxieSpines(){
		console.log(this.state.axies);
		var promises = [];
		for(var i=0; i<this.state.axies.length; i++){
			var axie = this.state.axies[i];
			if(axie.figure) promises.push( this.loadAxieSpine(axie) );
		}
		Promise.all(promises).then((axie_spines)=>{
			this.setState({
				axie_spines: axie_spines
			}, 
			this.renderAxies);
		});
	}

	/**
	 * loads a spine of a single {axie}
	 * @param {Axie} axie
	 * @returns {Promise}
	 */
	loadAxieSpine(axie){
		return getAxieSpine(axie).then((aSpine)=>{
			return aSpine;
		});
	}

	/**
	 * Renders multiple {axies} in a {2d grid}
	 */
	renderAxies(){
		let grid = this.state.grid;
		// fill axies into {2d grid}
		grid.insertAxies(this.state.axie_spines);
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
		var EXTRA_GAP_X = 60; //60
		var EXTRA_GAP_Y = 50; //50
		var gapX = this.state.axieW + EXTRA_GAP_X;
		var gapY = this.state.axieW / this.state.AXIE_SIZE_RATIO + EXTRA_GAP_Y;
		var startX = 120; //120
		var startY = 180; //180
		var SCALE = this.state.axieW / this.state.AXIE_BASE_W;
		// set scale
		axieSpine.scale.set(SCALE * this.state.CRISP_MULTIPLIER);
		// set position
		axieSpine.x = 50;
		axieSpine.y = 50;
		axieSpine.position.set(
			(x * gapX + startX) * this.state.CRISP_MULTIPLIER,
			(y * gapY + startY) * this.state.CRISP_MULTIPLIER,
		);
		console.log("SS", axieSpine);
		console.log("X", x);
		console.log("Y", y);
		// set animation
		axieSpine.state.setAnimation(0, "walking", true);
		// add child
		this.state.pixiApp.stage.addChild(axieSpine);
	}

	startPixi(){
		// Resize Canvas to display crisp sprites
		this.setCanvasSize(
			Math.round(this.state.canvasW),
			Math.round(this.state.canvasH)
		);
		console.log(this.state.grid);
		this.state.pixiApp.start();
	}

	setCanvasSize(w,h){
		this.state.pixiApp.view.width = w * this.state.CRISP_MULTIPLIER;
		this.state.pixiApp.view.height = h * this.state.CRISP_MULTIPLIER;
		this.setState({
			canvasW: w,
			canvasH: h,
		});
	}

	render() {
		return (
			<StyledTeamBuilder>

				<BasicCenterContainer>
					<h1>Axie Team Builder</h1>
					<canvas style={{width: this.state.canvasW, height: this.state.canvasH }} id={this.state.canvasID}>No Canvas support.</canvas>
				</BasicCenterContainer>
					
			</StyledTeamBuilder>
		);
	}
}

export default Teambuilder;


class Grid{
	rows = 30;
	cols = 8;
	//
	elems = [];
	//
	constructor(){
		this.createGrid();
	}
	/**
	 * creates {2d array} grid
	 * @memberof Grid
	 */
	createGrid(){
		for(let i=0; i<this.rows; i++){
			this.elems[i] = [];
			for(let j=0; j<this.cols; j++){
				this.elems[i][j] = null;
			}
		}
		console.log(this.elems);
	}
	/**
	 * insert axies into grid
	 * @param {*} axieSpines
	 * @memberof Grid
	 */
	insertAxies(axieSpines){
		var i = 0;
		var c = 0;
		axieSpines.forEach((axieSpine) => {
			this.elems[i][c] = axieSpine;
			c++;
			if(c >= this.cols) {
				i++;
				c = 0;
			}
		});
	}
}

/*class Block{
	axie = null;
	constructor(){}
	setAxie(axie){
		this.axie = axie;
	}
}*/