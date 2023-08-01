import React, { useState } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@mui/material";
import "./register.css";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { Link, Navigate } from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {
  document.title = "LearnX - Sign In";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if Logged In
  if (isAuthenticated) {
    return <Navigate to='/bootcamps' />
  }

  return (
    <div className="outer-container">
      <form className="container" onSubmit={onSubmit}>
        <h2 id="heading">Sign in</h2>
        <br />
        <TextField
          type="email"
          name="email"
          id="filled-basic"
          label="Email"
          variant="filled"
          value={email}
          onChange={onChange}
          required
        />
        <TextField
          type="password"
          name="password"
          id="filled-basic"
          label="Password"
          variant="filled"
          value={password}
          onChange={onChange}
          required
        />
        <br />
        <Button className="btn" type="submit" variant="contained">
          Sign In
        </Button>
        <br />
        <p id="login-link">
          Don't have an Account? <Link to="/register">Sign up</Link>{" "}
        </p>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
