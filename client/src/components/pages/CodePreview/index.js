import React, { Component, Fragment } from "react";

import NavigationApp from "../../ui/NavigationApp";
import { Container, Card, CardHeader } from "bloomer";
import { CardContent } from "bloomer/lib/components/Card/CardContent";
import { CardHeaderTitle } from "bloomer/lib/components/Card/Header/CardHeaderTitle";
import { Content } from "bloomer/lib/elements/Content";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <NavigationApp />
        <Container style={{marginTop: 20}}>
          <Card>
            <CardHeader>
              <CardHeaderTitle>
                Title
              </CardHeaderTitle>
            </CardHeader>
            <CardContent>
              <Content>
                Source Code Here
              </Content>
            </CardContent>
          </Card>
        </Container>
      </Fragment>
    )
  }
}
export default Home;
