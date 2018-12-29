import React, {Component} from 'react';
import styled, { css } from "styled-components";
//own
import AxieTitle from '../../AxieTitle';
import AxieParts from '../../AxieParts';
import AxieStats from '../../AxieStats';
import AxieSprite from '../../AxieSprite';
import AxieMoves from '../../AxieMoves';
import AxieBadges from '../../AxieBadges';
import AxieSalesData from '../../AxieSalesData';
//import AxieScores from '../../AxieScores';


//CSS
const StyledAxie = styled.div`
  border: 1px solid #e2e2e2;
  padding: 15px;
  min-width: 250px;
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
  .mainContainer {margin-top:20px;}
  /* static img */
  .staticImg {width:220px; height:170px; margin:0 auto;}
  canvas {display:block; margin:0 auto;}
  .axieTitle {position: relative;}

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
  ${({ features }) => features == "minimal" && css`
    /*width:auto;*/
    height:290px;
    /*.axieTitleContainer {height:60px;}*/
  `}
  
`;

/**
 * Displays an Axie with image, parts
 * @example <Axie data={axie} image={"img-url"} features={"minimal" | "parts" | "stats" | "all"} rendering={"image", "canvas", "default"}/>
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
    //console.log("img", this.state.img);
  }

  render(){
    console.log("axie features", this.props.features);
    const axieData = this.state.axieData;
    const axieHasParts = this.state.axieHasParts;
    //
    return(
      <StyledAxie className="axie" id={this.state.axieID} auctionData={axieData.auction} features={this.props.features}>
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
          {axieHasParts ?
            <AxieBadges axieData={axieData} size={"normal"}/>
          : ""}
          {1 ?
            <div className="salesData">
              {axieData.auction && <AxieSalesData auctionData={axieData.auction}/> } 
            </div>
          : ""}
        </div>
        {axieHasParts ? // render based on parts
          <div className="mainContainer">
            <div className="axieContainer">

              {(this.state.rendering == "image" && this.state.img) // render based on img
                ? <img className="staticImg" src={this.state.img} />
                : <AxieSprite axieData={axieData} /> 
              }
              {this.props.features == "parts" ?
                <AxieParts className="axieParts" parts={axieData.parts} />
              : ""}
            </div>
            {this.props.features == "stats" ? 
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

        <div className="badgeContainer">
        </div>

      </StyledAxie>
    );
  }

   

}



export default Axie;