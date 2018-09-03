import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import AxieList from "./components/AxieList";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        address : "0xe293390d7651234c6dfb1f41a47358b9377c004f",
        offset : "0",
        limit: "12"
    };
  }

  loadAxies(){
    console.log("s", this.state);
  }

  changeAddress(event){
    this.setState({address: event.target.value});
  }
  changeOffset(event){
    this.setState({offset: event.target.value});
  }
  changeLimit(event){
    this.setState({limit: event.target.value});
  }

  render() {
    return (
      <div className="app">
        <form className="dataForm">
          <input type="text" value={this.state.address} onChange={this.changeAddress} className="address" placeholder="Address" />
          <input type="text" value={this.state.offset} onChange={() => this.changeOffset()} className="offset"  placeholder="Offset" />
          <input type="text" value={this.state.limit} onChange={() => this.changeLimit()} className="limit"  placeholder="Limit" />
          <button onClick={() => this.loadAxies()}>Load Axies</button>
        </form>
        <AxieList/>
      </div>
    );
  }
}

export default App;
