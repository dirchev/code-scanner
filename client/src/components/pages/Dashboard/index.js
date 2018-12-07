import React, { Component, Fragment } from "react";
import { getSubmissions } from "../../../actions";
import NavigationApp from "../../ui/NavigationApp";
import CodeUpload from "../../ui/CodeUpload";
import { Container } from "bloomer";
import ScanJobsListing from "./ScanJobsListing";
import { Button } from "bloomer/lib/elements/Button";
import { Redirect } from "react-router";
import { Notification } from "bloomer/lib/elements/Notification";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      items: [],
      error: null
    };
    this.handleNewUpload = this.handleNewUpload.bind(this);
    this.loadSubmissions = this.loadSubmissions.bind(this);
  }

  loadSubmissions(e) {
    if (e) e.preventDefault();
    this.setState({ loading: true, items: [] });
    getSubmissions()
      .then(response => {
        this.setState({
          loading: false,
          items: response
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: err.message.toString()
        })
      })
  }

  componentWillMount() {
    this.loadSubmissions();
  }

  handleNewUpload(item) {
    this.setState(state => {
      return {
        items: [item].concat(state.items)
      };
    });
  }

  render() {
    if (!window.user) return <Redirect to="/login" />;
    return (
      <Fragment>
        <NavigationApp />
        <Container isFluid style={{ marginTop: 20 }}>
          <CodeUpload newUpload={this.handleNewUpload} />
          <hr />
          <Button
            style={{ marginBottom: "10px" }}
            onClick={this.loadSubmissions}
          >
            Refresh
          </Button>
          {this.renderContent()}
        </Container>
      </Fragment>
    )
  }
  renderContent() {
    if (this.state.loading) {
      return <Notification isColor="primary">Loading...</Notification>;
    }
    if (this.state.error) {
      return <Notification isColor="danger">{this.state.error}</Notification>;
    }
    return <ScanJobsListing items={this.state.items} />;
  }
}

export default Dashboard;
