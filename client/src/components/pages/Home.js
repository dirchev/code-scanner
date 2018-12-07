import React, { Component, Fragment } from "react";
import NavigationHome from "../ui/NavigationHome";
import { Container } from "bloomer";
import { Card } from "bloomer/lib/components/Card/Card";
import { CardContent } from "bloomer/lib/components/Card/CardContent";
import { Media } from "bloomer/lib/components/Media/Media";
import { MediaContent } from "bloomer/lib/components/Media/MediaContent";
import { Subtitle } from "bloomer/lib/elements/Subtitle";
import { Title } from "bloomer/lib/elements/Title";
import { Content } from "bloomer/lib/elements/Content";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <NavigationHome />
        <Container style={{ marginTop: 20 }}>
          <Title isSize={1}>
            Code Scanner
          </Title>
          <Subtitle>
            Secure Software Development Coursework
          </Subtitle>
          <Card>
            <CardContent>
              Developed by:
              <Media>
                <MediaContent>
                  <Title>Dimitar Mirchev</Title>
                  <Subtitle>S1515512 | dmirch200@caledonian.ac.uk</Subtitle>
                </MediaContent>
              </Media>
              <Content>
                Code Scanner is a web application that helps check javascript
                code for erorrs and vulnerabilities. <br />
                Test data is available{" "}
                <a
                  href="https://github.com/dirchev/code-scanner-test-data"
                  target="_blank"
                >
                  here.
                </a>{" "}
                <br />
                <small>07 December 2018 - Glasgow Caledonian University</small>
              </Content>
            </CardContent>
          </Card>
        </Container>
      </Fragment>
    );
  }
}

export default Home;
