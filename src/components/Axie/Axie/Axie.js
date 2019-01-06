import React from 'react';
import styled, { css } from "styled-components";
//own
import AxieTitle from '../../AxieTitle';
import AxieParts from '../../AxieParts';
import AxieStats from '../../AxieStats';
import AxieSprite from '../../AxieSprite';
import AxieMoves from '../../AxieMoves';
import AxieBadges from '../../AxieBadges';
import AxieSalesData from '../../AxieSalesData';
import BreedingData from '../../Axie/BreedingData';
//import AxieScores from '../../AxieScores';


//CSS
const StyledAxie = styled.div`
  /* border: 1px solid #e2e2e2; */
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.06);
  padding: 15px;
  width: 220px;
  min-height:220px;
  margin: 7px;
  border-radius: 20px;
  background:white;
  position:relative;

  .axieTitleContainer {height:60px;}
  .axieContainer {display:flex; flex-flow:column; margin-bottom:5px;}
  .statContainer {display:flex; justify-content: space-between; margin-bottom:10px;}
  .moveContainer {display:flex; justify-content: space-between; margin-bottom:10px;}
  .axieTitleContainer { position: relative; z-index: 10;}
  .axieTitle { display: flex; justify-content: flex-start; margin-bottom:5px;}
  .axieTitle .axieOwner {display:none;}
  :hover .axieTitle .axieOwner {display:flex;}

  .axieContainer {}
  /* main container */
  .mainContainer {margin-top:0;}
  /* static img */
  .staticImg {width:220px; height:auto; margin-left:-15px;}
  canvas {display:block; margin-left:-15px;}
  .axieTitle {position: relative;}
  /* sales data */
  .salesData {text-align:center;}

  /* card controller */
  .cardController {display:none; width:40px; height:40px; border-radius:50%; background:#c3c3c3; cursor:pointer; position:absolute; right:10px; top: 35px; z-index:200;}
  :hover .cardController {display:block;}
  .controlBoard {position:absolute; display:flex; flex-flow:column; left:0; top:0; border-radius: 30px; padding:15px; width:100%; height:100%; background:rgba(255,255,255,0.7); z-index:100;}
  .controlBoard .btn {width:40px; height:40px; border-radius:50%; cursor:pointer; background:grey; margin-left:5px; margin-top:5px;}
  .controlBoard .line {display:flex; margin-top:15px;}

  /* auction data */
  ${({ auctionData }) => auctionData && css`
    .axieTitleContainer { position: relative; z-index: 10;}
  `}

  /* features */
  ${({ features }) => features === "minimal" && css`
    /*width:auto;*/
    /*.axieTitleContainer {height:60px;}*/
  `}

  ${({ features }) => features === "stats" && css`
    width:300px;
    .staticImg {margin:0 auto;}
    canvas {margin:0 auto;}
  `}

  /* size */
  ${({ size }) => size === "large" && css`
    width: 280px;
    .staticImg {width:280px;}
    canvas {width:280px; height:auto;}
  `}
  ${({ size, features }) => size === "large" && features === "stats" && css`
    width:350px;
  `}
  ${({ size }) => size === "small" && css`
    width:150px;
    padding:10px;
    min-height:175px;
    .axieTitleContainer {height:20px;}
    .cardController {display:none!important;}
    .axieTitle .name, .axieTitle .id  {font-size:10px;}
    .breedingData {font-size:10px;}
    .staticImg, .canvas {width:148px; height:auto; margin-left:-10px;}
  `}
  ${({ size }) => size === "tiny" && css`
    width:80px;
    padding:5px;
    min-height:auto;
    height:80px;
    border-radius:5px;
    margin:2px;
    .axieTitleContainer {height:auto;}
    .cardController {display:none!important;}
    .axieTitle .name {font-size:10px; margin:0;}
    .axieTitle .icon, .axieTitle .id  {display:none;}
    .breedingData {display:none;}
    .axieOwner  {display:none!important;}
    .staticImg, .canvas {width:78px; height:auto; margin-left:-5px;}
  `}
  ${({ background }) => background === "none" && css`
    box-shadow:none
    border:none;
    background:none;
  `}
  
`;

/**
 * Displays an Axie with image, parts
 * @example <Axie 
 *                data={axie} 
 *                image={"img-url"} 
 *                features={"minimal" | "parts" | "stats" | "all"} 
 *                rendering={"image", "canvas", "default"} 
 *                size={"normal" | "large" | "small" | "tiny"} 
 *                background={"normal" | "outline" | "none"} />
 * @class Axie
 * @extends {React.PureComponent}
 */
class Axie extends React.PureComponent {

  onClickCardController = () => {
    this.setState((state)=>({
      showControlBoard: !state.showControlBoard,
    }));
  }

  setFeatures = (features) => {
    console.log("set features", features);
    this.setState({
      features: features,
    });
  }

  setRendering = (rendering) => {
    this.setState({
      rendering: rendering,
    });
  }

  constructor(props){
    super(props);
    //
    var idleImg = (this.props.data.figure && this.props.data.figure.static) ? this.props.data.figure.static.idle : null;
    //
    this.state = {
      axieData:         this.props.data,
      axieID:           "axie_"+this.props.data.id,
      img:              this.props.image ? this.props.image : idleImg,
      axieHasParts:     this.props.data.stage >= 3 ? true : false,
      rendering:        this.props.rendering,
      showControlBoard: false,
    };
    //
    this.sizes = {
      "normal" : 220,
      "large" : 280
    }
    //console.log("img", this.state.img);
  }

  render(){
    console.log("axie features", this.props.features);
    const axieData = this.state.axieData;
    const axieHasParts = this.state.axieHasParts;
    const features = this.props.features;
    const size = this.props.size;
    const background = this.props.background;
    const axieWidth = this.sizes[size] || this.sizes["normal"];
    //
    return(
      <StyledAxie className="axie" id={this.state.axieID} auctionData={axieData.auction} features={features} size={size} background={background}>
        <div className="cardController" onClick={this.onClickCardController}>
        </div>
        {this.state.showControlBoard ? 
          <div className="controlBoard">
            <div className="line">
              <h3>Features</h3>
              <div className="btn" onClick={() => {this.setFeatures("minimal")}}></div>
              <div className="btn" onClick={() => {this.setFeatures("parts")}}></div>
              <div className="btn" onClick={() => {this.setFeatures("stats")}}></div>
            </div>
            <div className="line">
              <h3>Rendering</h3>
              <div className="btn" onClick={() => {this.setRendering("image")}}></div>
              <div className="btn" onClick={() => {this.setRendering("canvas")}}></div>
            </div>
          </div>
        : ""}

        <div className="axieTitleContainer">
          <AxieTitle id={axieData.id} name={axieData.name} class={axieData.class} stage={axieData.stage} owner={axieData.owner}/>
          {axieHasParts && features === "stats" ?
            <AxieBadges axieData={axieData} size={"normal"}/>
          : ""}
        </div>
        {axieHasParts ? // render based on parts
          <div className="mainContainer">
            <div className="axieContainer">

              {(this.state.rendering === "image" && this.state.img) // render based on img
                ? <img className="staticImg" src={this.state.img} alt="axie" />
                : <AxieSprite axieData={axieData} width={axieWidth}/> 
              }
              {features === "parts" ?
                <AxieParts className="axieParts" parts={axieData.parts} />
              : ""}
            </div>
            {features === "stats" ? 
              <div className="statMoveContainer" style={{display:"block"}}>
                <div className="statContainer">
                  <AxieStats className="axieStats" stats={axieData.stats} />
                </div>
                <div className="moveContainer" >
                  <AxieMoves className="axieMoves" parts={axieData.parts} />
                </div>
              </div> 
            : ""}
          </div>
        : ""}

        {features === "breeding" ?
          <BreedingData axieData={axieData}/>
        : ""}

        {features === "minimal" ?
          <div className="salesData">
            {axieData.auction && <AxieSalesData auctionData={axieData.auction}/> } 
          </div>
        : ""}

        <div className="badgeContainer">
        </div>

      </StyledAxie>
    );
  }

   

}



export default Axie;