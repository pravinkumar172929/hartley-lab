import { Button, TextField, Grid, Alert, AlertTitle } from "@mui/material";
import React, { Component } from "react";
import { withFormik } from "formik";
import { doLogin } from "../../api";

const formikHoC = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),

  validate: (values) => {
    const errors = {};

    if (
      !values.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errors.email = "Please input a valid email";
    }

    if (!values.password) {
      errors.password = "Please input a password";
    }

    return errors;
  },

  handleSubmit: async (values, { props }) => {
    const apiRes = await doLogin(values.email, values.password);
    if (apiRes.isSuccessful) {
      props.onLoginSuccess(apiRes.data);
    } else {
      props.onLoginError(apiRes.error.message);
    }
  },
});

class Login extends Component {
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
          {this.props.loginError && <Grid item>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {this.props.loginError}
            </Alert>
          </Grid>}
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
            <Button variant="contained" type="submit">Login</Button>
            <Button variant="text" onClick={() => this.props.doToggleShowLogin()}>Register instead?</Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default formikHoC(Login);
