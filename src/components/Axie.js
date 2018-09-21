import React, {Component} from 'react';
import styled from 'styled-components';
//own
import AxieTitle from './AxieTitle';
import AxieParts from './AxieParts';
import AxieStats from './AxieStats';
import AxieSprite from './AxieSprite';
import AxieMoves from './AxieMoves';
import AxieBadges from './AxieBadges';
import AxieSalesData from './AxieSalesData';
import AxieScores from './AxieScores';

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
`;

/**
 * Displays an Axie with image, parts
 * @example <Axie data={axie} />
 * @class Axie
 * @extends {Component}
 */
class Axie extends Component {
  constructor(props){
      super(props);
      //
      this.state = {
        axieData:   this.props.data,
        axieID:     "axie_"+this.props.data.id,
      };
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
        <StyledAxie className="axie" id={this.state.axieID}>
          <div className="axieTitleContainer">
            <AxieTitle id={this.state.axieData.id} name={this.state.axieData.name} class={this.state.axieData.class} />
            <AxieBadges axieData={this.state.axieData}/>
            {this.state.axieData.auction && <AxieSalesData auctionData={this.state.axieData.auction}/> } 
          </div>
          <div className="axieContainer">
            <div style={{display:"none"}}>
              <AxieParts className="axieParts" parts={this.state.axieData.parts} />
            </div>
            <AxieSprite axieData={this.state.axieData} />
          </div>
          <div className="badgeContainer">
          </div>
          <div className="statMoveContainer" style={{display:"block"}}>
            <div className="statContainer">
              <AxieStats className="axieStats" stats={this.state.axieData.stats} />
            </div>
            <div className="moveContainer" >
              <AxieMoves className="axieMoves" parts={this.state.axieData.parts} />
            </div>
          </div>

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