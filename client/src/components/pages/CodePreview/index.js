import React, { Component, Fragment } from "react";

import NavigationApp from "../../ui/NavigationApp";
import { Container, Card, CardHeader } from "bloomer";
import { CardHeaderTitle } from "bloomer/lib/components/Card/Header/CardHeaderTitle";
import { Content } from "bloomer/lib/elements/Content";
import { getSubmission } from "../../../actions";
import { Tag } from "bloomer/lib/elements/Tag";
import Redirect from "react-router-dom/Redirect";

class Home extends Component {
  constructor () {
    super()
    this.state = {
      loading: false,
      item: null
    }
  }
  componentDidMount () {
    let id = this.props.match.params.id
    this.setState({
      loading: true,
    })
    getSubmission(id)
      .then((result) =>{
        this.setState({
          loading: false,
          item: result.submission,
          file: result.file
        })
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: err
        })
      })
  }

  render() {
    if (!window.user) return (<Redirect to="/login" />)
    if (this.state.loading || !this.state.item) return 'Loading'
    return (
      <Fragment>
        <NavigationApp />
        <Container style={{marginTop: 20}}>
          <Card>
            <CardHeader>
              <CardHeaderTitle>
                {this.state.item.title}
              </CardHeaderTitle>
            </CardHeader>
            <div className="card-content" style={{overflow: 'hidden'}}>
              <Content>
                {this.renderSourceCode()}
              </Content>
            </div>
          </Card>
        </Container>
      </Fragment>
    )
  }

  renderSourceCode () {
    let style = {
      display: 'block',
      float: 'left',
      width: '50%',
      height: '25px',
      overflow: 'hidden'
    }
    let fileContents = this.state.file
    let errors = this.state.item.analysisResult
    let lines = fileContents.split('\n')
    return lines.map(function (line, index) {
      return (
        <div key={index}>
          <span className="code" style={style}>{line}</span>
          <span className="messages" style={style}>
            {
              errors.filter((i) => i.line === index+1).map(function (error) {
                return (
                  <Tag key={error._id} isColor='danger'>{error.text}</Tag>
                )
              })
            }
          </span>
        </div>
      )
    })
  }
}
export default Home;
