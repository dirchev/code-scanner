import React, { Component, Fragment } from "react";
import NavigationHome from "../ui/NavigationHome";
import { Container } from "bloomer";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <NavigationHome />
        <Container style={{marginTop: 20}}>
          <h1>Code Scanner</h1>
        </Container>
      </Fragment>
    )
  }
}

export default Home;
