import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import './register.css'
import { Link } from "react-router-dom";
export default function Login() {

    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const {email, password} = formData

    const onChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
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
        <Button id="btn" type="submit" variant="contained">
          Sign In
        </Button>
        <br />
        <p id="login-link">Don't have an Account? <Link to="/register">Sign up</Link> </p>
      </form>
    </div>
  );
}
