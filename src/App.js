import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import AxieList from "./components/AxieList";
import {axieTraits} from "./data/axie-traits";
import {getMinMaxStatsOfPartsByType} from "./data/axie-data-transform";
import ReactTooltip from 'react-tooltip';

class App extends Component {
  constructor(props){
    super(props);
    console.log(getMinMaxStatsOfPartsByType(axieTraits));
  }

  render() {
    return (
      <div className="app">
        <AxieList/>
      </div>
    );
  }
}

export default App;
