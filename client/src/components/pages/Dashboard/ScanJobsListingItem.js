import React, { Component, Fragment } from "react";
import {
  Card,
  CardContent,
  Media,
  MediaContent,
  Title,
  Content
} from "bloomer";

import { Link } from "react-router-dom";
import { Tag } from "bloomer/lib/elements/Tag";

class ScanJobsListingItem extends Component {
  getStatusColor() {
    if (this.props.item.status === "error") return "danger";
    if (this.props.item.status === "processed") return "green";
    if (this.props.item.status === "new") return "blue";
    if (this.props.item.status === "in queue") return "yellow";
    if (this.props.item.status === "processing") return "orange";
  }
  render() {
    return (
      <Fragment>
        <Card>
          <CardContent>
            <Media>
              <MediaContent>
                <Title isSize={3}>{this.props.item.title}</Title>
              </MediaContent>
            </Media>
            <Content>
              <Tag isColor={this.getStatusColor()}>
                {this.props.item.status}
              </Tag>
              <div>
                <small>{this.props.item.created}</small>
              </div>
              {this.props.item.status === "processed" ? (
                <div style={{ textAlign: "right" }}>
                  <Link to={`/preview/${this.props.item._id}`}>
                    Open Analysis
                  </Link>
                </div>
              ) : null}
            </Content>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default ScanJobsListingItem;
