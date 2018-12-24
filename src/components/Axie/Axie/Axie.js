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

  .axieTitleContainer {height:60px;}
  .axieContainer {display:flex; margin-bottom:5px;}
  .statContainer {display:flex; justify-content: space-between; margin-bottom:10px;}
  .moveContainer {display:flex; justify-content: space-between; margin-bottom:10px;}
  .axieTitle { display: flex; justify-content: flex-start; margin-bottom:5px;}
  /* static img */
  .staticImg {width:200px; height:150px;}

  .axieTitle {position: relative;}


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
  constructor(props){
    super(props);
    //
    this.state = {
      axieData:   this.props.data,
      axieID:     "axie_"+this.props.data.id,
      img:        this.props.image ? this.props.image : this.props.rendering == "image" ? this.props.data.figure.static.idle : null,
    };
    console.log("img", this.state.img);
  }

  render(){

    var canRender = true;
    switch(this.state.axieData.stage){
      case 1 : canRender = false; break;
      case 2 : canRender = false; break;
      default : canRender = true;
    }

    if(canRender){
      return(
        <StyledAxie className="axie" id={this.state.axieID} auctionData={this.state.axieData.auction} features={this.props.features}>
          <div className="axieTitleContainer">
            <AxieTitle id={this.state.axieData.id} name={this.state.axieData.name} class={this.state.axieData.class} />
            <AxieBadges axieData={this.state.axieData}/>
            <div className="salesData">
              {this.state.axieData.auction && <AxieSalesData auctionData={this.state.axieData.auction}/> } 
            </div>
          </div>
          <div className="axieContainer">
            <div style={{display:"none"}}>
              <AxieParts className="axieParts" parts={this.state.axieData.parts} />
            </div>
            {this.state.img ? <img className="staticImg" src={this.state.img} />
            : <AxieSprite axieData={this.state.axieData} /> }
          </div>
          <div className="badgeContainer">
          </div>
          {this.props.features != "minimal" ? <div className="statMoveContainer" style={{display:"block"}}>
            <div className="statContainer">
              <AxieStats className="axieStats" stats={this.state.axieData.stats} />
            </div>
            <div className="moveContainer" >
              <AxieMoves className="axieMoves" parts={this.state.axieData.parts} />
            </div>
          </div> : ""}

          <div className="badgeContainer">
          </div>

        </StyledAxie>
      );
    }
    else {
      return (
        <StyledAxie className="axie" id={this.state.axieID}>
          <p>Axie stage: {this.state.axieData.stage}</p>
        </StyledAxie>
      )
    }
  }


}

export default Axie;