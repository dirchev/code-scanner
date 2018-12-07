import React, { Component, Fragment } from "react";
import ScanJobsListingItem from "./ScanJobsListingItem";

class ScanJobsListing extends Component {
  render() {
    return (
      <Fragment>
        {
          this.props.items.map((item) => {
            return (
              <div key={item._id} style={{ marginBottom: 10 }}>
                <ScanJobsListingItem item={item} />
              </div>
            )
          })
        }
      </Fragment>
    );
  }
}

export default ScanJobsListing;
