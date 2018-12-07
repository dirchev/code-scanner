import React, { Component, Fragment } from "react";
import {
  Card,
  CardContent,
  Media,
  MediaContent,
  Title,
  Content
} from "bloomer";
import moment from "moment";

import { Link } from "react-router-dom";
import { Tag } from "bloomer/lib/elements/Tag";
import { CardFooter } from "bloomer/lib/components/Card/Footer/CardFooter";
import { CardFooterItem } from "bloomer/lib/components/Card/Footer/CardFooterItem";
import { CardHeaderTitle } from "bloomer/lib/components/Card/Header/CardHeaderTitle";
import { CardHeader } from "bloomer/lib/components/Card/Header/CardHeader";

class ScanJobsListingItem extends Component {
  getStatusColor() {
    if (this.props.item.status === "error") return "danger";
    if (this.props.item.status === "processed") return "success";
    if (this.props.item.status === "new") return "primary";
    if (this.props.item.status === "in queue") return "warning";
    if (this.props.item.status === "processing") return "warning";
  }
  render() {
    return (
      <Fragment>
        <Card>
          <CardHeader>
            <CardHeaderTitle>{this.props.item.title}s </CardHeaderTitle>
          </CardHeader>
          <CardContent>
            <Content>
              <strong>Status:</strong>
              <Tag isColor={this.getStatusColor()}>
                {this.props.item.status}
              </Tag>
              <div>
                <strong>Created:</strong>
                <small>{moment(this.props.item.created).calendar()}</small>
              </div>
            </Content>
          </CardContent>
          {this.props.item.status === "processed" ? (
            <CardFooter>
              <CardFooterItem>
                <Link to={`/preview/${this.props.item._id}`}>
                  Open Analysis
                </Link>
              </CardFooterItem>
            </CardFooter>
          ) : null}
        </Card>
      </Fragment>
    );
  }
}

export default ScanJobsListingItem;
