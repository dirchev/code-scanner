import React, { Component, Fragment } from 'react';
import NavigationHome from "../../ui/NavigationHome";
import { Container } from "bloomer";
import Form from './Form'
import { Card } from 'bloomer/lib/components/Card/Card';
import { CardHeader } from 'bloomer/lib/components/Card/Header/CardHeader';
import { CardHeaderTitle } from 'bloomer/lib/components/Card/Header/CardHeaderTitle';
import { CardContent } from 'bloomer/lib/components/Card/CardContent';

class Login extends Component {
  render() {
    return (
      <Fragment>
        <NavigationHome />
        <Container style={{marginTop: 20}}>
          <Card>
            <CardHeader>
              <CardHeaderTitle>
                Login
              </CardHeaderTitle>
            </CardHeader>
            <CardContent>
              <Form />
            </CardContent>
          </Card>
        </Container>
      </Fragment>
    )
  }
}

export default Login;

