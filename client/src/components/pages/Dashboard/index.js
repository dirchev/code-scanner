import React, { Component, Fragment } from 'react';
import NavigationApp from "../../ui/NavigationApp";
import { Container } from "bloomer";
import ScanJobsListing from './ScanJobsListing';

class Login extends Component {
  render() {
    return (
      <Fragment>
        <NavigationApp />
        <Container style={{marginTop: 20}}>
          <ScanJobsListing />
        </Container>
      </Fragment>
    )
  }
}

export default Login;

