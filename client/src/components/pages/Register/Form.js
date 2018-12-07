import React, { Component } from "react";
import { Redirect } from 'react-router'
import { registerUser } from "../../../actions";
import { Container } from "bloomer";
import { Field, Label, Control, Input, Button } from "bloomer";
import { Notification } from "bloomer/lib/elements/Notification";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      formData: {
        name: "",
        email: "",
        password: ""
      },
      error: null
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
    registerUser(this.state.formData)
      .then((response) => {
        this.setState({
          loading: false,
          redirect: true
        })
      })
      .catch((err) => {
        this.setState({
          error: err,
          loading: false
        })
      })
  }

  render() {
    if (this.state.loading) return <Notification isColor="primary">Loading...</Notification>;
    if (this.state.redirect) return (<Redirect to='/login' />)
    return (
      <div>
        {this.state.error ? (
          <Notification isColor="danger">{this.state.error}</Notification>
        ) : null}
        <form onSubmit={this.handleFormSubmit}>
          <Field>
            <Label>Name</Label>
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
      </div>
    );
  }
}

export default RegisterForm
