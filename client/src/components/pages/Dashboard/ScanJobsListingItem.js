import React, { Component, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardHeaderTitle,
  CardHeaderIcon,
  Icon,
  CardContent,
  Media,
  MediaContent,
  Title,
  Content
} from "bloomer";

import { Link } from 'react-router-dom';

class ScanJobsListingItem extends Component {
  render() {
    return (
      <Fragment>
        <Card>
          <CardContent>
            <Media>
              <MediaContent>
                <Title isSize={3}>Title</Title>
              </MediaContent>
            </Media>
            <Content>
              <div>
                The file has been analysed.
              </div>
              <div>
                <small>11:09 PM - 30 October 2014</small>
              </div>
              <div style={{textAlign: 'right'}}>
                <Link to="/dashboard">Open Analysis</Link>
              </div>
            </Content>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default ScanJobsListingItem;
