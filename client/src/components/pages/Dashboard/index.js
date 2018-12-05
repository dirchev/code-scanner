import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getSubmissions } from '../../../actions'
import NavigationApp from "../../ui/NavigationApp";
import CodeUpload from "../../ui/CodeUpload";
import { Container } from "bloomer";
import ScanJobsListing from './ScanJobsListing';

class Dashboard extends Component {
  componentWillMount () {
    this.props.getSubmissions()
  }

  render() {
    return (
      <Fragment>
        <NavigationApp />
        <Container style={{marginTop: 20}}>
          <CodeUpload />
          <hr />
          <ScanJobsListing />
        </Container>
      </Fragment>
    )
  }
}

let mapStateToProps = () => {
  return {}
}

let mapDispatchToProps = (dispatch) => {
  return {
    getSubmissions: () => dispatch(getSubmissions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

