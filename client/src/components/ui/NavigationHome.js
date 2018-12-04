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

class NavigationHome extends Component {
  render() {
    return (
      <Hero isColor="info" isSize="small">
        <HeroHeader>
          <Navbar>
            <NavbarStart>
              <NavbarItem>
                <Link to="/">
                  Code Scanner
                </Link>
              </NavbarItem>
            </NavbarStart>
            <NavbarEnd>
              <NavbarItem><Link to="/login">Login</Link></NavbarItem>
              <NavbarItem><Link to="/register">Register</Link></NavbarItem>
            </NavbarEnd>
          </Navbar>
        </HeroHeader>
      </Hero>
    )
  }
}

export default NavigationHome;
