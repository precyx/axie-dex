import React from 'react';
//own
import AxieTitle from '../AxieTitle';
import AxieParts from '../AxieParts';
import AxieStats from '../AxieStats';
import AxieSprite from '../AxieSprite';
import AxieMoves from '../AxieMoves';
import AxieBadges from '../AxieBadges';
import SalesData from '../SalesData';
import BreedingData from '../../Axie/BreedingData';
//import AxieScores from '../../AxieScores';

import {StyledAxie} from "./styles/StyledAxie";

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
    var idleImg = this.props.data.image || "";
    //
    this.state = {
      axieData:         this.props.data,
      axieID:           "axie_"+this.props.data.id,
      img:              this.props.image ? this.props.image : idleImg,
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
    const axieHasParts = axieData.stage >= 3 ? true : false;
    const axieHasStats = axieData.stats ? true : false;
    //
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
          <AxieTitle id={axieData.id} title={axieData.title} name={axieData.name} class={axieData.class} stage={axieData.stage} owner={axieData.owner}/>
          {axieHasParts && axieHasStats && features === "stats" ?
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
            {(axieHasStats && features === "stats") ? 
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
            {axieData.auction && <SalesData auctionData={axieData.auction}/> } 
          </div>
        : ""}

        <div className="badgeContainer">
        </div>

      </StyledAxie>
    );
  }

   

}



export default Axie;