import React from "react";
import Joi from "joi-browser";
import { Link, Navigate, useLocation } from "react-router-dom";

import Form from "./common/form";

import auth from "../services/authService";
const LoginForm = () => {
  const location = useLocation();
  return <LoginFormClass location={location} />;
};

class LoginFormClass extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.pathname : "/movies";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Navigate to="/movies" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          <br />
          {this.renderInput("password", "Password", "password")}
          <br />
          {this.renderButton("Login")} &nbsp;
          <Link className="btn btn-primary" to="/register">
            Create an Account
          </Link>
        </form>
      </div>
    );
  }
}

export default LoginForm;
