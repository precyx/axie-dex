import React, {Component} from 'react';
import styled from 'styled-components';
//own
import AxieParts from './AxieParts';
import AxieTitle from './AxieTitle';
import AxieSprite from './AxieSprite';

//CSS
const StyledAxie = styled.div`
  border-right: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  padding: 15px;
  width:400px;

  .bottom-half {display:flex;}
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
        <div className="bottom-half">
          <AxieParts className="axieParts" parts={this.state.axieData.parts} />
          <AxieSprite axieData={this.state.axieData} />
        </div>
      </StyledAxie>
    );
  }


}

export default Axie;