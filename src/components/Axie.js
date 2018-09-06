import React, {Component} from 'react';
import styled from 'styled-components';
//own
import AxieTitle from './AxieTitle';
import AxieParts from './AxieParts';
import AxieStats from './AxieStats';
import AxieSprite from './AxieSprite';
import AxieMoves from './AxieMoves';
import AxieBadges from './AxieBadges';

//CSS
const StyledAxie = styled.div`
  border-right: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  padding: 15px;
  width:450px;

  .axieContainer {display:flex; margin-bottom:10px;}
  .statContainer {display:flex; justify-content: space-between; margin-bottom:10px;}
  .moveContainer {display:flex; justify-content: space-between;}
  .axieTitle { display: flex; justify-content: flex-start; margin-bottom:10px;}
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
    return(
      <StyledAxie className="axie" id={this.state.axieID}>
        <AxieTitle id={this.state.axieData.id} name={this.state.axieData.name} class={this.state.axieData.class} />
        <div className="axieContainer">
          <AxieParts className="axieParts" parts={this.state.axieData.parts} />
          <AxieSprite axieData={this.state.axieData} />
        </div>
        <div className="badgeContainer">
        </div>
        <div className="statContainer">
          <AxieStats className="axieStats" stats={this.state.axieData.stats} />
        </div>
        <div className="moveContainer">
          <AxieMoves className="axieMoves" parts={this.state.axieData.parts} />
          <AxieBadges axieData={this.state.axieData}/>
        </div>

      </StyledAxie>
    );
  }


}

export default Axie;