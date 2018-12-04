import React, { Component, Fragment } from 'react';
import NavigationHome from "../../ui/NavigationHome";
import { Container } from "bloomer";
import Form from './Form'

class Login extends Component {
  render() {
    return (
      <Fragment>
        <NavigationHome />
        <Container style={{marginTop: 20}}>
          <h1>Login</h1>
          <Form />
        </Container>
      </Fragment>
    )
  }
}

export default Login;

