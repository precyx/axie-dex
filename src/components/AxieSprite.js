import React, { Component } from 'react';
import styled from 'styled-components';
//pixi
import * as PIXI from 'pixi.js';
import 'pixi-spine';
//axios
import axios from 'axios';

//CSS
const StyledAxieSprite = styled.div`
  img {width:200px;}
  canvas {}
  button {background: #efefef; border: 1px solid #bdbdbd; border-radius: 3px; margin-left: 5px;}
  input {border-radius:3px;}
  .scale {margin-bottom:10px;}
`;

/**
 * Displays an Axie Sprite in a Canvas with PIXI.js. Supports WebGL and Canvas rendering.
 * @example <AxieSprite />
 * @class AxieSprite
 * @extends {Component}
 */
class AxieSprite extends Component {
	constructor(props) {
		super(props);
		this.pixiApp = null;
		this.state = {
			scale_factor:  0.2, 
			axieData:   this.props.axieData,
			axieImg:    this.props.axieData.figure.images[this.props.axieData.id + ".png"],
			axieAtlas:  this.props.axieData.figure.atlas,
			axieModel:  this.props.axieData.figure.model,
			axieID:     "axie_"+this.props.axieData.id,
			canvasID:   "canvas"+this.props.axieData.id,
			canvasW:    0,
			canvasH:    0,
			axie:       null,
		};
	}

	render() {
		return (
			<StyledAxieSprite>
				<div className="scale" style={{display:"none"}}>
					<input type="number" value={this.state.scale_factor} onChange={this.changeScale()} min="0.1" max="1" step="0.05" name="Scale"/>
					<button onClick={() => this.setScale()}>Change Scale</button>
				</div>
				<canvas style={{width: this.state.canvasW, height: this.state.canvasH }} id={this.state.canvasID}>No Canvas support.</canvas>
			</StyledAxieSprite>
		);
	}

	
  componentDidMount(){
    this.setupPixi();
    this.renderAxie();
	}
	
	componentWillUnmount() {
		this.pixiApp.destroy(true);
	}
	

  setupPixi(){
    this.pixiApp = new PIXI.Application({
      view:document.getElementById(this.state.canvasID),
      width:480,
      height:340,
      transparent:true,
      //forceCanvas:true,
    });
  }

  renderAxie(){
    var newDateParam = this.getRandomDateURLParam();
    axios.get(this.state.axieModel + newDateParam).then((axieModel)=> {
      axios.get(this.state.axieAtlas + newDateParam).then((axieAtlas)=> {
        const rawAtlasData = axieAtlas.data;
        const spineAtlas = new PIXI.spine.core.TextureAtlas(rawAtlasData, (line, callback)=> {
            callback(PIXI.BaseTexture.from(this.state.axieImg + newDateParam));
        });
        const spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas);
        const spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);
        const spineData = spineJsonParser.readSkeletonData(axieModel.data);
        this.axie = new PIXI.spine.Spine(spineData);
        //this.axie.state.setAnimation(0, "walking", true);
        //this.pixiApp.start();
        //console.log("ww", this.axie.children[5].position.y);
      
        // Axie Website Canvas Ratio: 480x340px = 1.411764705882353
        //console.log("cc", this.pixiApp.view.height);
        //console.log("bb", this.axie.height);
        //console.log("aa", this.axie);
        this.pixiApp.stage.addChild(this.axie);
        this.setScale();
      });
    });
  }

  getRandomDateURLParam(){
    return "?" + new Date().getTime();
  }


  changeScale = scale_factor => event => {
    this.setState({
      scale_factor: event.target.value,
    });
  };

  setScale(s){
    var SCALE_FACTOR = this.state.scale_factor;
    //console.log("factor", SCALE_FACTOR);
    //var PADDING_FACTOR = 1;
    //
    this.axie.scale.set(SCALE_FACTOR);
    this.setState({
      canvasW: 480 *0.5,//this.axie.width * PADDING_FACTOR, 
      canvasH: 340 *0.5//this.axie.height * PADDING_FACTOR
    })
    this.pixiApp.renderer.resize(
      this.state.canvasW,
      this.state.canvasH
    );
    this.axie.position.set(
      this.pixiApp.view.width/2 + this.axie.width/10, 
      this.pixiApp.view.height/2 + this.axie.height/1.8
    );
  }

}


export default AxieSprite;