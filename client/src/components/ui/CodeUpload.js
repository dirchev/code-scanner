import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "bloomer";
import { Card } from "bloomer/lib/components/Card/Card";
import { CardHeaderTitle } from "bloomer/lib/components/Card/Header/CardHeaderTitle";
import { Title } from "bloomer/lib/elements/Title";
import { CardContent } from "bloomer/lib/components/Card/CardContent";
import { CardHeader } from "bloomer/lib/components/Card/Header/CardHeader";
import { Columns } from "bloomer/lib/grid/Columns";
import { Column } from "bloomer/lib/grid/Column";
import { TextArea } from "bloomer/lib/elements/Form/TextArea";
import { Field } from "bloomer/lib/elements/Form/Field/Field";
import { Control } from "bloomer/lib/elements/Form/Control";
import { Button } from "bloomer/lib/elements/Button";
import { Label } from "bloomer/lib/elements/Form/Label";
import { Input } from "bloomer/lib/elements/Form/Input";

class CodeUpload extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        title: "",
        codeSnippet: "",
        codeFile: null
      }
    };
    this.changeFormDataValue = this.changeFormDataValue.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
    console.log(this.state)
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardHeaderTitle>Analyse code</CardHeaderTitle>
        </CardHeader>
        <CardContent>
          <form action="">
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

            <Columns>
              <Column>
                <Field>
                  <Label>paste code snipper</Label>
                  <Control>
                    <TextArea
                      placeholder="Paste code snippet here"
                      type="email"
                      value={this.state.formData.email}
                      onChange={this.changeFormDataValue("codeSnippet")}
                    />
                  </Control>
                </Field>
              </Column>

              <Column isSize={'narrow'} style={{fontWeight: 'bold'}}>
                <div style={{position: 'relative', top: '50%', width: '100%', textAlign: 'center'}}>or</div>
              </Column>

              <Column>
                <Field style={{height: '100%'}}>
                  <Label>upload a file</Label>
                  <Control style={{position: 'relative', 'top': '25%', left: '25%'}}>
                    <div className="file">
                      <label className="file-label">
                        <input className="file-input" type="file" name="resume" />
                        <span className="file-cta">
                          <span className="file-icon">
                            <i className="fas fa-upload"></i>
                          </span>
                          <span className="file-label">
                            Choose a file…
                          </span>
                        </span>
                      </label>
                    </div>
                  </Control>
                </Field>
              </Column>
            </Columns>
            <Field>
              <Control>
                <Button type="submit">Submit</Button>
              </Control>
            </Field>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default connect()(CodeUpload);
