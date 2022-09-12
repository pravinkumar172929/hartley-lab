import React, { Component } from "react";
import { withFormik } from "formik";
import { TextField, Grid, Button, Alert, AlertTitle } from "@mui/material";
import { doRegister } from "../../api";

const formikHoC = withFormik({
  mapPropsToValues: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }),

  validate: (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = "Please input first name";
    }

    if (!values.lastName) {
      errors.lastName = "Please input last name";
    }

    if (
      !values.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errors.email = "Please input valid email";
    }

    if (!values.password || values.password.length < 8) {
      errors.password = "Please input a valid password";
    } else if (values.password !== values.confirmPassword) {
      errors.password = "Passwords don't match";
      errors.confirmPassword = "Passwords don't match";
    }

    return errors;
  },

  handleSubmit: async (values, { props }) => {
    const apiRes = await doRegister({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password
    });

    if (apiRes.isSuccessful) {
      props.onRegisterSuccess(apiRes.data);
    } else {
      props.onRegisterError(apiRes.error.message);
    }
  },
});

class Register extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {this.props.registerError && <Grid item>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {this.props.registerError}
            </Alert>
          </Grid>}
          {this.props.registerData && <Grid item>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Registraion successful!!
            </Alert>
          </Grid>}
          <Grid item>
            <TextField
              error={!!this.props.errors.firstName}
              helperText={this.props.errors.firstName}
              label="First Name"
              variant="standard"
              id="firstName"
              name="firstName"
              type="text"
              onChange={this.props.handleChange}
              value={this.props.values.firstName}
            />
          </Grid>
          <Grid item>
            <TextField
              error={!!this.props.errors.lastName}
              helperText={this.props.errors.lastName}
              label="Last Name"
              variant="standard"
              id="lastName"
              name="lastName"
              type="text"
              onChange={this.props.handleChange}
              value={this.props.values.lastName}
            />
          </Grid>
          <Grid item>
            <TextField
              error={!!this.props.errors.email}
              helperText={this.props.errors.email}
              label="E-mail"
              variant="standard"
              id="email"
              name="email"
              type="email"
              onChange={this.props.handleChange}
              value={this.props.values.email}
            />
          </Grid>
          <Grid item>
            <TextField
              error={!!this.props.errors.password}
              helperText={this.props.errors.password}
              label="Password"
              variant="standard"
              id="password"
              name="password"
              type="password"
              onChange={this.props.handleChange}
              value={this.props.values.password}
            />
          </Grid>
          <Grid item>
            <TextField
              error={!!this.props.errors.confirmPassword}
              helperText={this.props.errors.confirmPassword}
              label="Confirm Password"
              variant="standard"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={this.props.handleChange}
              value={this.props.values.confirmPassword}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
            <Button variant="text" onClick={() => this.props.doToggleShowLogin()}>Login instead?</Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default formikHoC(Register);
