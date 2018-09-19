import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {axieTraits} from "./data/axie-traits";
import {getMinMaxStatsOfPartsByType} from "./services/axie-part-and-stats-transform";
import styled from "styled-components";
// router
import { BrowserRouter as Router, Route, NavLink, Redirect, Switch } from 'react-router-dom';
// routes
import Dex from './components/sites/Dex';
import Encyclopedia from './components/sites/Encyclopedia';
import Profile from './components/sites/Profile';
import Teambuilder from './components/sites/Teambuilder';


const StyledApp = styled.div`
  .header {width:100%; height:50px; background: #f7f7f7; margin-bottom:50px;}
  .header .center {width:90%; padding:0 35px; height:100%; margin:0 auto; display:flex; }
  .header a { display: flex; align-items: center; margin-right:10px; color: #5d5d5d; font-size:14px; padding:0 15px; }
  .header a.selected { border-bottom:2px solid #a146ef; color:#a146ef; font-weight:bold; }
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
              <NavLink activeClassName="selected" to="/teambuilder">Teambuilder</NavLink>
            </div>
          </div>
          <Switch>
            <Route exact path="/dex" component={Dex}/>
            <Route exact path="/market" component={Encyclopedia}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/teambuilder" component={Teambuilder}/>
            <Redirect from='/' to='/dex'/>
          </Switch>
        </StyledApp>
      </Router>
    );
  }
}

export default App;
