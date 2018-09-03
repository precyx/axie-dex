import React, {Component} from 'react';
import styled from 'styled-components';
//pixi
import * as PIXI from 'pixi.js';
import 'pixi-spine';
//axios
import axios from 'axios';


const AxieStyle = styled.div`
  margin-right:20px;
  margin-bottom:20px;

  img {width:200px;}
  canvas {border: 1px solid grey;}
  .scale {margin-bottom:10px;}
  button {background: #efefef; border: 1px solid #bdbdbd; border-radius: 3px; margin-left: 5px;}
  input {border-radius:3px;}
`;

class Axie extends Component {
  constructor(props){
      super(props);
      //
      this.pixiApp = null;
      //
      this.state = {
        scale_factor:  0.2, 
        axieData:   this.props.data,
        axieImg:    this.props.data.figure.images[this.props.data.id + ".png"],
        axieAtlas:  this.props.data.figure.atlas,
        axieModel:  this.props.data.figure.model,
        axieID:     "axie_"+this.props.data.id,
        canvasID:   "canvas"+this.props.data.id,
        axie:       null
      };
  }

  componentDidMount(){
    this.setupPixi();
    this.renderAxie();
  }

  setupPixi(){
    this.pixiApp = new PIXI.Application({
      view:document.getElementById(this.state.canvasID),
      width:50,
      height:50,
      transparent:true,
    });
  }

  renderAxie(){
    var newDateParam = this.getRandomDateURLParam();
    axios.get(this.state.axieModel).then((axieModel)=> {
      axios.get(this.state.axieAtlas).then((axieAtlas)=> {
        const rawAtlasData = axieAtlas.data;
        const spineAtlas = new PIXI.spine.core.TextureAtlas(rawAtlasData, (line, callback)=> {
            callback(PIXI.BaseTexture.from(this.state.axieImg));
        });
        const spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas);
        const spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);
        const spineData = spineJsonParser.readSkeletonData(axieModel.data);
        this.axie = new PIXI.spine.Spine(spineData);
        /*this.axie.state.setAnimation(0, "walking", true);
        this.pixiApp.start();*/
        //console.log("ww", this.axie.children[5].position.y);
      
        this.axie.x = 40;
        this.axie.y = 40;
        

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
    console.log("factor", SCALE_FACTOR);
    var PADDING_FACTOR = 1;
    //
    this.axie.scale.set(SCALE_FACTOR);
    this.pixiApp.renderer.resize(
      this.axie.width * PADDING_FACTOR, 
      this.axie.height * PADDING_FACTOR
    );
    this.axie.position.set(
      this.pixiApp.view.width/2 + this.axie.width/8, 
      this.pixiApp.view.height/2 + this.axie.height/2
    );
  }

  render(){
    return(
      <div className="axie" id={this.state.axieID}>
        <AxieStyle>
          <div className="name">{this.state.axieData.name}</div>

          <div className="scale" style={{display:"none"}}>
            <input type="number" value={this.state.scale_factor} onChange={this.changeScale()} min="0.1" max="1" step="0.05" name="Scale"/>
            <button onClick={() => this.setScale()}>Change Scale</button>
          </div>

          <canvas id={this.state.canvasID}>No Canvas support.</canvas>
        </AxieStyle>
      </div>
    );
  }


}

export default Axie;