import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {axieTraits} from "./data/axie-traits";
import {getMinMaxStatsOfPartsByType} from "./services/axie-part-and-stats-transform";
import styled, {css} from "styled-components";
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
import ContractViewer from './components/sites/ContractViewer';
import EventWatcher from './components/sites/EventWatcher';
import Lunacia from './components/sites/Lunacia';
import Teams from './components/sites/Teams';
import {PartDex} from './components/sites/PartDex';

import {Toggle} from "./components/ui/Toggle/Toggle";
import {MenuToggle} from "./components/ui/MenuToggle";

const StyledApp = styled.div`
`;

const StyledLogo = styled.div`
  display: flex; 
  align-items: center; 
  margin-right:0;
`;

const StyledHeadbar = styled.div`

  display:flex;
  padding:0 15px;
  width:100%; 
  height:50px; 
  background: white; 
  margin-bottom:20px;
  /* box-shadow: 0 0px 4px rgba(0, 0, 0, 0.2); */
  border-bottom: 1px solid #e2e2e2;

  .center {
    padding:0 35px; 
    height:100%; 
    display:flex; 
    flex: 1;
    justify-content: center;
  }
`;

const NavLinkBaseStyle = css`
  position:relative;
  display: flex; 
  align-items: center; 
  color: #5d5d5d; 
  font-size:14px; 
  padding:0 5px;
  margin: 0 10px;
  border-bottom: 2px solid transparent;
  &:hover {
    &{
      text-decoration:none;
    color: #9d57da;
    font-weight:500;
    }

  }
  &.selected { 
    border-bottom:2px solid #a146ef; 
    color:#a146ef; 
    font-weight:bold; 
  }
`;

const StyledNavLink = styled(NavLink)`
  ${NavLinkBaseStyle}
`;
const StyledMenuToggler = styled(MenuToggle)`
  ${NavLinkBaseStyle}
  cursor:pointer;
`;
const MenuOption = styled(NavLink)`
  ${NavLinkBaseStyle}
  padding: 8px 10px;
`;

const Menu = styled.div`
  position: absolute;
  z-index:1000;
  left: 0px;
  top: 50px;
  min-width:150px;
  background: white;
  box-shadow: 0 2px 3px rgba(0,0,0,0.18);
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
          <StyledHeadbar className="header">
          <StyledLogo>
              <AxieDexLogo className="logo" logo={"./img/logo/ad_logo.svg"}> </AxieDexLogo>
          </StyledLogo>
            <div className="center">

              <StyledNavLink activeClassName="selected" to="/market">Dex</StyledNavLink>
              <StyledNavLink activeClassName="selected" to="/mass-sync">Mass Sync</StyledNavLink>
              <StyledNavLink activeClassName="selected" to="/part-tierlist">Battle Tierlist</StyledNavLink>
              <StyledNavLink activeClassName="selected" to="/teambuilder">Teambuilder</StyledNavLink>
              <StyledNavLink activeClassName="selected" to="/lunacia-map">Lunacia</StyledNavLink>
              
              <StyledMenuToggler render={isOn => (
                <>
                  More
                {isOn && 
                  <Menu>
                    <MenuOption activeClassName="selected" to="/part-dex">Part Dex</MenuOption>
                    <MenuOption activeClassName="selected" to="/dex">Dex Old</MenuOption>
                    <MenuOption activeClassName="selected" to="/body-shapes">Bodyshapes</MenuOption>
                    <MenuOption activeClassName="selected" to="/xmas-skins">Xmas Skins</MenuOption>
                    <MenuOption activeClassName="selected" to="/comps">Comps</MenuOption>
                    <MenuOption activeClassName="selected" to="/contracts">Contracts</MenuOption>
                    <MenuOption activeClassName="selected" to="/teams">Teams</MenuOption>
                    <MenuOption activeClassName="selected" to="/profile">Profile</MenuOption>
                    <MenuOption activeClassName="selected" to="/zr">ZR</MenuOption>
                  </Menu>
                }
                </>
              )}/>

            </div>
          </StyledHeadbar>
          <Switch>
            <Route exact path="/teambuilder" component={Teambuilder}/>
            <Route exact path="/part-dex" component={PartDex}/>
            <Route exact path="/dex" component={Dex}/>
            <Route exact path="/market" component={Encyclopedia}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/body-shapes" component={Bodyshapes}/>
            <Route exact path="/xmas-skins" component={XmasSkins}/>
            <Route exact path="/part-tierlist" component={PartTierlist}/>
            <Route exact path="/mass-sync" component={MassSync}/>
            <Route exact path="/comps" component={Comps}/>
            <Route exact path="/contracts" component={ContractViewer}/>
            <Route exact path="/zr" component={EventWatcher}/>
            <Route exact path="/lunacia-map" component={Lunacia}/>
            <Route exact path="/teams" component={Teams}/>
            <Redirect from='/' to='/teambuilder'/>
          </Switch>
        </StyledApp>
      </Router>
    );
  }
}

export default App;
