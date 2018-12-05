import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../../actions";
import { Container } from "bloomer";
import { Field, Label, Control, Input, Button } from "bloomer";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
        email: "",
        password: ""
      },
      errors: {}
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
    this.props.registerUser(this.state.formData);
  }

  render() {
    return (
      <Container style={{ marginTop: 20 }}>
        <form onSubmit={this.handleFormSubmit}>
          <Field>
            <Label>Email</Label>
            <Control>
              <Input
                placeholder="Please enter your name."
                type="text"
                value={this.state.formData.name}
                onChange={this.changeFormDataValue("name")}
              />
            </Control>
          </Field>

          <Field>
            <Label>Email</Label>
            <Control>
              <Input
                placeholder="Please enter your email."
                type="email"
                value={this.state.formData.email}
                onChange={this.changeFormDataValue("email")}
              />
            </Control>
          </Field>

          <Field>
            <Label>Password</Label>
            <Control>
              <Input
                placeholder="Please enter your password."
                type="password"
                value={this.state.formData.password}
                onChange={this.changeFormDataValue("password")}
              />
            </Control>
          </Field>

          <Field>
            <Control>
              <Button type="submit">Login</Button>
            </Control>
          </Field>
        </form>
      </Container>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    registerUser: data => {
      dispatch(registerUser(data));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
