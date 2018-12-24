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
import AxieScores from '../../AxieScores';

//CSS
const StyledAxie = styled.div`
  border: 1px solid #e2e2e2;
  padding: 15px;
  width: 275px;
  margin: 10px;
  border-radius: 30px;
  background:white;
  position:relative;

  .axieTitleContainer {height:60px;}
  .axieContainer {display:flex; margin-bottom:5px;}
  .statContainer {display:flex; justify-content: space-between; margin-bottom:10px;}
  .moveContainer {display:flex; justify-content: space-between; margin-bottom:10px;}
  .axieTitle { display: flex; justify-content: flex-start; margin-bottom:5px;}
  /* static img */
  .staticImg {width:220px; height:170px;}
  .axieTitle {position: relative;}

  /* card controller */
  .cardController {display:none; width:45px; height:45px; border-radius:50%; background:#c3c3c3; cursor:pointer; position:absolute; right:10px; top: 10px; z-index:200;}
  :hover .cardController {display:block;}
  .controlBoard {position:absolute; display:flex; flex-flow:column; left:0; top:0; border-radius: 30px; padding:15px; width:100%; height:100%; background:rgba(255,255,255,0.7); z-index:100;}
  .controlBoard .btn {width:40px; height:40px; border-radius:50%; cursor:pointer; background:grey; margin-left:5px; margin-top:5px;}
  .controlBoard .line {display:flex; margin-top:15px;}

  /* auction data */
  ${({ auctionData }) => auctionData && css`
    .axieTitleContainer {height:90px;}
  `}

  /* features */
  ${({ features }) => features == "minimal" && css`
    width:auto;
    .salesData {display:none;} 
    .axieTitleContainer {height:60px;}
  `}
  
`;

/**
 * Displays an Axie with image, parts
 * @example <Axie data={axie} image={"img-url"} features={"minimal" | "all"} rendering={"image", "canvas", "default"}/>
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
    console.log(this.props.axieData);
    //
    var idleImg = (this.props.data.figure && this.props.data.figure.static) ? this.props.data.figure.static.idle : null;
    //
    this.state = {
      axieData:         this.props.data,
      axieID:           "axie_"+this.props.data.id,
      img:              this.props.image ? this.props.image : idleImg,
      axieHasParts:     this.props.data.stage >= 3 ? true : false,
      features:         this.props.features,
      rendering:        this.props.rendering,
      showControlBoard: false,
    };
    console.log("img", this.state.img);
  }

  render(){
    return(
      <StyledAxie className="axie" id={this.state.axieID} auctionData={this.state.axieData.auction} features={this.state.features}>
        <div className="cardController" onClick={this.onClickCardController}>
        </div>
        {this.state.showControlBoard ? 
          <div className="controlBoard">
            <div className="line">
              <h3>Features</h3>
              <div className="btn" onClick={() => {this.setFeatures("minimal")}}></div>
              <div className="btn" onClick={() => {this.setFeatures("all")}}></div>
            </div>
            <div className="line">
              <h3>Rendering</h3>
              <div className="btn" onClick={() => {this.setRendering("image")}}></div>
              <div className="btn" onClick={() => {this.setRendering("canvas")}}></div>
            </div>
          </div>
        : ""}

        <div className="axieTitleContainer">
          <AxieTitle id={this.state.axieData.id} name={this.state.axieData.name} class={this.state.axieData.class} stage={this.state.axieData.stage}/>
          {this.state.axieHasParts ?
            <AxieBadges axieData={this.state.axieData}/>
          : ""}
          <div className="salesData">
            {this.state.axieData.auction && <AxieSalesData auctionData={this.state.axieData.auction}/> } 
          </div>
        </div>
        {this.state.axieHasParts ? // render based on parts
          <div className="mainContainer">
            <div className="axieContainer">
              <div style={{display:"none"}}>
                <AxieParts className="axieParts" parts={this.state.axieData.parts} />
              </div>
              {this.state.rendering == "image" // render based on img
                ? <img className="staticImg" src={this.state.img} />
                : <AxieSprite axieData={this.state.axieData} /> 
              }
            </div>
            {this.state.features != "minimal" ? 
              <div className="statMoveContainer" style={{display:"block"}}>
                <div className="statContainer">
                  <AxieStats className="axieStats" stats={this.state.axieData.stats} />
                </div>
                <div className="moveContainer" >
                  <AxieMoves className="axieMoves" parts={this.state.axieData.parts} />
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