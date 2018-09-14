import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {axieTraits} from "./data/axie-traits";
import {getMinMaxStatsOfPartsByType} from "./data/axie-data-transform";
import styled from "styled-components";
// router
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
// routes
import Dex from './components/sites/Dex';
import Encyclopedia from './components/sites/Encyclopedia';
import Profile from './components/sites/Profile';


const StyledApp = styled.div`
  .header {width:100%; height:50px; border-bottom: 1px solid #e0e0e0; margin-bottom:50px;}
  .header .center {width:90%; padding:0 35px; height:100%; margin:0 auto; display:flex; }
  .header a { display: flex; align-items: center; margin-right:10px; color: #5d5d5d; font-size:14px; padding:0 15px; }
  .header a.selected { border-bottom:2px solid purple; }
`;

class App extends Component {
  constructor(props){
    super(props);
    console.log(getMinMaxStatsOfPartsByType(axieTraits));
  }

  render() {
    return (
      <Router>
        <StyledApp>
          <div className="header">
            <div className="center">
              <NavLink activeClassName="selected" to="/dex">Dex</NavLink>
              <NavLink activeClassName="selected" to="/market">Encyclopedia</NavLink>
              <NavLink activeClassName="selected" to="/profile">Profile</NavLink>
            </div>
          </div>
          <Redirect from='/' to='/dex'/>
          <Route exact path="/dex" component={Dex}/>
          <Route path="/market" component={Encyclopedia}/>
          <Route path="/profile" component={Profile}/>
        </StyledApp>
      </Router>
    );
  }
}

export default App;
