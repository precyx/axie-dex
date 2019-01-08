import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {axieTraits} from "./data/axie-traits";
import {getMinMaxStatsOfPartsByType} from "./services/axie-part-and-stats-transform";
import styled from "styled-components";
// own components
import AxieDexLogo from "./components/AxieDexLogo";
// router
import { BrowserRouter as Router, Route, NavLink, Redirect, Switch } from 'react-router-dom';
// routes
import Dex from './components/sites/Dex';
import Encyclopedia from './components/sites/Encyclopedia';
import Profile from './components/sites/Profile';
import Teambuilder from './components/sites/Teambuilder';
import Bodyshapes from './components/sites/Bodyshapes';
import XmasSkins from './components/sites/XmasSkins';
import PartTierlist from './components/sites/PartTierlist';
import MassSync from './components/sites/MassSync';
import Comps from './components/sites/Comps';


const StyledApp = styled.div`
  .logo {display: flex; align-items: center; margin-right:30px;}
  .header {width:100%; height:50px; background: #f7f7f7; margin-bottom:20px;}
  .header .center {padding:0 35px; height:100%; display:flex; }
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
              <AxieDexLogo className="logo" logo={"./img/logo/ad_logo.svg"}> </AxieDexLogo>
              <NavLink activeClassName="selected" to="/teambuilder">Teambuilder</NavLink>
              <NavLink activeClassName="selected" to="/dex">Dex</NavLink>
              <NavLink activeClassName="selected" to="/market">Encyclopedia</NavLink>
              <NavLink activeClassName="selected" to="/profile">Profile</NavLink>
              <NavLink activeClassName="selected" to="/body-shapes">Bodyshapes</NavLink>
              <NavLink activeClassName="selected" to="/xmas-skins">Xmas Skins</NavLink>
              <NavLink activeClassName="selected" to="/part-tierlist">Part Tierlist</NavLink>
              <NavLink activeClassName="selected" to="/mass-sync">Mass Sync</NavLink>
              <NavLink activeClassName="selected" to="/comps">Comps</NavLink>
            </div>
          </div>
          <Switch>
            <Route exact path="/teambuilder" component={Teambuilder}/>
            <Route exact path="/dex" component={Dex}/>
            <Route exact path="/market" component={Encyclopedia}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/body-shapes" component={Bodyshapes}/>
            <Route exact path="/xmas-skins" component={XmasSkins}/>
            <Route exact path="/part-tierlist" component={PartTierlist}/>
            <Route exact path="/comps" component={Comps}/>
            <Redirect from='/' to='/teambuilder'/>
          </Switch>
        </StyledApp>
      </Router>
    );
  }
}

export default App;
