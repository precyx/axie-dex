import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import AxieList from "./components/AxieList";
import {axieTraits} from "./data/axie-traits";
import {getMinMaxStatsOfParts} from "./data/axie-data-transform";

class App extends Component {
  constructor(props){
    super(props);
    console.log(getMinMaxStatsOfParts(axieTraits));
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
