import React from 'react';
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
class AxieSprite extends React.PureComponent {
	constructor(props) {
    super(props);
    //console.log("ddd", this.props.axieData);
    console.log("axie data", this.props.axieData);
    let axieData = this.props.axieData;
    let axieImg = null;
    let axieAtlas = null;
    let axieModel = null;
    if(axieData.figure){
      axieImg   = axieData.figure.images ? axieData.figure.images[axieData.id + ".png"] : axieData.figure.axie.image.replace(/^http:\/\//i, 'https://'); //old API //images[axieData.id + ".png"],
      axieAtlas = axieData.figure.atlas ? axieData.figure.atlas : axieData.figure.axie.atlas.replace(/^http:\/\//i, 'https://');
      axieModel = axieData.figure.model ? axieData.figure.model : axieData.figure.axie.spineModel.replace(/^http:\/\//i, 'https://');
    } 
		this.state = {
      crisp_factor: 2,
      axie_width: this.props.width/1.5,
      CANVAS_W: this.props.width,
      CANVAS_H: this.props.width/1.3,
      AXIE_INITIAL_W: NaN,
      AXIE_INITIAL_H: NaN,
      AXIE_INITIAL_RATIO: NaN,
			axieData:   this.props.axieData,
			axieImg:    axieImg, //old API //images[this.props.axieData.id + ".png"],
			axieAtlas:  axieAtlas,
			axieModel:  axieModel,
			axieID:     "axie_"+this.props.axieData.id,
			canvasID:   "canvas"+this.props.axieData.id,
			canvasW:    0,
			canvasH:    0,
      axie:       null,
      pixiApp:    null
    };
    //console.log(this.state.axieImg, this.state.axieAtlas, this.state.axieModel);
	}

	render() {
		return (
			<StyledAxieSprite>
				<div className="scale" style={{display:"none"}}>
					<input type="number" value={this.state.axie_width} onChange={this.changeWidth()} min="50" max="300" step="10" name="Width"/>
					<button onClick={() => this.setScale()}>Change Scale</button>
				</div>
				<canvas style={{width: this.state.CANVAS_W, height: this.state.CANVAS_H }} id={this.state.canvasID}>No Canvas support.</canvas>
			</StyledAxieSprite>
		);
	}

	
  componentDidMount(){
    this.setupPixi();
	}
	
	componentWillUnmount() {
		this.state.pixiApp.destroy(true);
	}
	

  setupPixi(){
    var pixiApp = new PIXI.Application({
      view:document.getElementById(this.state.canvasID),
      width:this.state.CANVAS_W,
      height:this.state.CANVAS_H,
      transparent:true,
      //forceCanvas:true,
    });
    this.setState(
      {pixiApp:pixiApp}, 
      this.renderAxie
    );
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
        //
        //console.log(this.axie.spineData.animations);
        var animation = this.axie.spineData.animations[56] || this.axie.spineData.animations[2] || this.axieSpineData.animations[0];
        //this.axie.state.setAnimation(0, animation.name, true);
        
        //console.log("ww", this.axie.children[5].position.y);
      
        // Axie Website Canvas Ratio: 480x340px = 1.411764705882353
        //console.log("cc", this.pixiApp.view.height);
        //console.log("bb", this.axie.height);
        //console.log("aa", this.axie);
        if(this.state.pixiApp){
          if(this.state.pixiApp.stage){
            //this.state.pixiApp.start();
            this.state.pixiApp.stage.addChild(this.axie);
              console.log(this.axie);
            this.setState({
              AXIE_INITIAL_W: this.axie.width,
              AXIE_INITIAL_H: this.axie.height,
              AXIE_INITIAL_RATIO: this.axie.width / this.axie.height
            }, () => {
              this.setScale();
            });
            
          }

        }
      });
    });
  }

  getRandomDateURLParam(){
    return "?" + new Date().getTime();
  }


  changeWidth = width => event => {
    this.setState({
      axie_width: event.target.value,
    });
  };

  setScale(s){
    var scaleFactor = this.state.axie_width / this.state.AXIE_INITIAL_W;
    var crispFactor = this.state.crisp_factor;
    // canvas
    var cw = this.state.CANVAS_W;
    var ch = this.state.CANVAS_H;
    var cwc = cw * crispFactor;
    var chc = ch * crispFactor;
    // axie
    var aw = this.state.AXIE_INITIAL_W;
    var ah = this.state.AXIE_INITIAL_H;
    //var AR = this.state.AXIE_INITIAL_RATIO;
    var awi = aw * scaleFactor * crispFactor;
    var ahi = ah * scaleFactor * crispFactor;
    // positions
    var anchorX = awi*0.58;
    var anchorY = ahi*0.87;
    var centerX = anchorX + cwc/2 - awi/2;
    var centerY = anchorY + chc/2 - ahi/2;
    //
    this.axie.scale.set(scaleFactor * crispFactor);
    //
    this.state.pixiApp.renderer.resize(
      cwc, chc,
    );
    this.axie.position.set(
      centerX, centerY
    );
    console.log("axie", aw, ah)
    console.log("canvas", cw, ch)
    var newX = cwc/2*1.15
    var newY = chc*0.8;
    this.axie.position.set(
      newX,
      newY
    );
  }

}


export default AxieSprite;