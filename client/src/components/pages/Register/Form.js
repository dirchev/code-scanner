import React, { Component } from "react";
import { Container } from "bloomer";
import { Field, Label, Control, Input, Button } from "bloomer";

class RegisterForm extends Component {
  render() {
    return (
      <Container style={{ marginTop: 20 }}>
        <Field>
          <Label>Name</Label>
          <Control>
            <Input placeholder="Please enter your name." type="text" />
          </Control>
        </Field>

        <Field>
          <Label>Email</Label>
          <Control>
            <Input placeholder="Please enter your email." type="email" />
          </Control>
        </Field>

        <Field>
          <Label>Password</Label>
          <Control>
            <Input placeholder="Please set your password." type="password" />
          </Control>
        </Field>

        <Field>
          <Control>
            <Button>Register</Button>
          </Control>
        </Field>
      </Container>
    );
  }
}

export default RegisterForm;
