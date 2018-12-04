import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Hero,
  HeroHeader,
  Navbar,
  NavbarEnd,
  NavbarStart,
  NavbarItem
} from 'bloomer'

class NavigationApp extends Component {
  render() {
    return (
      <Hero isColor="info" isSize="small">
        <HeroHeader>
          <Navbar>
            <NavbarStart>
              <NavbarItem>
                <Link to="/dashboard">
                  Code Scanner
                </Link>
              </NavbarItem>
            </NavbarStart>
            <NavbarEnd>
              <NavbarItem>Hello, Dimitar</NavbarItem>
              <NavbarItem>Logout</NavbarItem>
            </NavbarEnd>
          </Navbar>
        </HeroHeader>
      </Hero>
    )
  }
}

export default NavigationApp;
