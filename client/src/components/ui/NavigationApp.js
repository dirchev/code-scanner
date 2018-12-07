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
import { logoutUser } from "../../actions";
import Redirect from "react-router-dom/Redirect";

class NavigationApp extends Component {
  constructor () {
    super()
    this.state = {
      user: window.user,
      redirect: false
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout (e) {
    e.preventDefault()
    logoutUser()
    this.setState({
      redirect: true
    })
  }

  render() {
    if (this.state.redirect) return (<Redirect to="/login" />)
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
              <NavbarItem>Hello, {this.state.user.name}</NavbarItem>
              <NavbarItem onClick={this.handleLogout} style={{cursor: 'pointer'}}>Logout</NavbarItem>
            </NavbarEnd>
          </Navbar>
        </HeroHeader>
      </Hero>
    )
  }
}

export default NavigationApp;
