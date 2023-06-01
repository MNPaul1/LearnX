import React, { useState } from "react";
import "./register.css";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { setAlert } from "../../actions/alert";
import PropTypes from 'prop-types'

const Register = ({setAlert})=> {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2:"",
    role: "",
  });
  const { name, email, password, password2, role } = formData;

  const onChange = (e) =>{
    setFormData({...formData, [e.target.name]:e.target.value })
  }

  const onSubmit =async (e) =>{
    e.preventDefault();
    if (password!==password2){
      setAlert("Passwords do not match.", 'error', 4000)
    }
  }

  return (
    <div className="outer-container">
      <form onSubmit={onSubmit} className="container">
        <h2 id="heading">Create Account</h2>
        <br />
        <TextField
          type="name"
          name="name"
          id="filled-basic"
          label="Name"
          variant="filled"
          value={name}
          onChange={onChange}
          required
        />
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
        <TextField
          type="password"
          name="password2"
          id="filled-basic"
          label="Confirm password"
          variant="filled"
          value={password2}
          onChange={onChange}
          required
        />
        <TextField id="filled-basic" onChange={onChange} value={role} name="role" label="Role" variant="filled" required />
        <br />
        <Button id="btn" type="submit" variant="contained">Sign Up</Button>
        <br />
        <p id="login-link">Have already an account? <Link to="/login">Sign in</Link> </p>
      </form>
    </div>
  );
}


Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}

export default connect(null, {setAlert})(Register);
