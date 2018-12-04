import React, { Component, Fragment } from "react";
import ScanJobsListingItem from "./ScanJobsListingItem";

class ScanJobsListing extends Component {
  render() {
    return (
      <Fragment>
        <div style={{ marginBottom: 10 }}>
          <ScanJobsListingItem />
        </div>
        <div style={{ marginBottom: 10 }}>
          <ScanJobsListingItem />
        </div>
        <div style={{ marginBottom: 10 }}>
          <ScanJobsListingItem />
        </div>
        <div style={{ marginBottom: 10 }}>
          <ScanJobsListingItem />
        </div>
        <div style={{ marginBottom: 10 }}>
          <ScanJobsListingItem />
        </div>
      </Fragment>
    );
  }
}

export default ScanJobsListing;
