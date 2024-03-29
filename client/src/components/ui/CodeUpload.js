import React, { Component } from "react";
import { submitCode } from "../../actions";
import { Card } from "bloomer/lib/components/Card/Card";
import { CardHeaderTitle } from "bloomer/lib/components/Card/Header/CardHeaderTitle";
import { CardHeaderIcon } from "bloomer/lib/components/Card/Header/CardHeaderIcon";
import { Tab } from "bloomer/lib/components/Tabs/Tab";
import { TabLink } from "bloomer/lib/components/Tabs/TabLink";
import { Tabs } from "bloomer/lib/components/Tabs/Tabs";
import { TabList } from "bloomer/lib/components/Tabs/TabList";
import { CardContent } from "bloomer/lib/components/Card/CardContent";
import { CardHeader } from "bloomer/lib/components/Card/Header/CardHeader";
import { TextArea } from "bloomer/lib/elements/Form/TextArea";
import { Field } from "bloomer/lib/elements/Form/Field/Field";
import { Control } from "bloomer/lib/elements/Form/Control";
import { Button } from "bloomer/lib/elements/Button";
import { Label } from "bloomer/lib/elements/Form/Label";
import { Input } from "bloomer/lib/elements/Form/Input";
import { Notification } from "bloomer/lib/elements/Notification";

const INITIAL_STATE = {
  tabSelected: "CodeSnippet",
  opened: false,
  loading: false,
  formData: {
    title: "",
    codeSnippet: "",
    codeFile: {
      file: "",
      fileName: ""
    }
  }
};
class CodeUpload extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    this.changeFormDataValue = this.changeFormDataValue.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  selectTab(tabSelected) {
    return () => {
      this.setState({
        tabSelected: tabSelected
      });
    };
  }

  changeFormDataValue(field) {
    return ({ target }) => {
      this.setState(state => {
        return {
          ...state,
          formData: {
            ...state.formData,
            [field]: target.value
          }
        };
      });
    };
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let formData = {
      title: this.state.formData.title
    };
    if (this.state.tabSelected === "CodeSnippet") {
      formData.codeSnippet = this.state.formData.codeSnippet;
    } else {
      formData.codeFile = this.state.formData.codeFile.file;
    }
    this.setState({ loading: true });

    submitCode(formData)
      .then(response => {
        this.setState(INITIAL_STATE, () => {
          this.props.newUpload(response);
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err.message.toString()
        })
      })
  }

  onFileChange(e) {
    let file = e.target.files[0];
    let fileName = e.target.value.split(/(\\|\/)/g).pop();
    this.setState(state => {
      return {
        ...state,
        formData: {
          ...state.formData,
          codeFile: {
            file: file,
            fileName: fileName
          }
        }
      };
    });
  }

  toggleOpen(e) {
    e.preventDefault();
    this.setState(state => {
      return {
        ...state,
        opened: !state.opened
      };
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading</div>;
    }
    return (
      <Card>
        <CardHeader>
          <CardHeaderTitle>Analyse code</CardHeaderTitle>
          <CardHeaderIcon onClick={this.toggleOpen}>
            {this.state.opened ? "close" : "open"}
          </CardHeaderIcon>
        </CardHeader>
        {this.state.opened ? this.renderCardContent() : null}
      </Card>
    );
  }

  renderCardContent() {
    return (
      <CardContent>
        {this.state.error ? (
          <Notification isColor="danger">{this.state.error}</Notification>
        ) : null}
        <form onSubmit={this.handleFormSubmit}>
          <Field>
            <Label>Title</Label>
            <Control>
              <Input
                placeholder="Set a title for this code submission"
                type="text"
                value={this.state.formData.title}
                onChange={this.changeFormDataValue("title")}
              />
            </Control>
          </Field>

          <Tabs>
            <TabList>
              <Tab isActive={this.state.tabSelected === "CodeSnippet"}>
                <TabLink onClick={this.selectTab("CodeSnippet")}>
                  <span>Code Snippet</span>
                </TabLink>
              </Tab>
              <Tab isActive={this.state.tabSelected === "CodeFile"}>
                <TabLink onClick={this.selectTab("CodeFile")}>
                  <span>Code File</span>
                </TabLink>
              </Tab>
            </TabList>
          </Tabs>

          {this.state.tabSelected === "CodeSnippet" ? (
            <Field>
              <Control>
                <TextArea
                  placeholder="Paste code snippet here"
                  type="email"
                  value={this.state.formData.codeSnippet}
                  onChange={this.changeFormDataValue("codeSnippet")}
                />
              </Control>
            </Field>
          ) : (
            <Field style={{ height: "100%" }}>
              <Control>
                <div className="file">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      onChange={this.onFileChange}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload" />
                      </span>
                      <span className="file-label">
                        { this.state.formData.codeFile.fileName || 'Choose a file...' }
                      </span>
                    </span>
                  </label>
                </div>
              </Control>
            </Field>
          )}

          <Field>
            <Control>
              <Button type="submit">Submit</Button>
            </Control>
          </Field>
        </form>
      </CardContent>
    );
  }
}

export default CodeUpload;
