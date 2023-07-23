import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { TextField, Button } from "@mui/material";
import { addUser } from "../../actions/user";
import { useNavigate } from "react-router-dom";

export const AddUser = ({setAlert, addUser}) => {
  const navigate = useNavigate()
  document.title = "LearnX - Add User";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "",
  });

  const { name, email, password, password2, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match.", "error", 4000);
    }
    else{
      addUser({name, email, password, role})
      navigate('/bootcamps')
    }
  };

  return (
    <div className="outer-container">
      <form onSubmit={onSubmit} className="container">
        <h2 id="heading">ADD USER</h2>
        <br />
        <TextField
          type="name"
          name="name"
          id="filled-basic"
          label="Name"
          variant="filled"
          value={name}
          onChange={onChange}
        />
        <TextField
          type="email"
          name="email"
          id="filled-basic"
          label="Email"
          variant="filled"
          value={email}
          onChange={onChange}
        />
        <TextField
          type="password"
          name="password"
          id="filled-basic"
          label="Password"
          variant="filled"
          value={password}
          onChange={onChange}
        />
        <TextField
          type="password"
          name="password2"
          id="filled-basic"
          label="Confirm password"
          variant="filled"
          value={password2}
          onChange={onChange}
        />
        <TextField
          id="filled-basic"
          onChange={onChange}
          value={role}
          name="role"
          label="Role"
          variant="filled"
        />
        <br />
        <Button className="btn" type="submit" variant="contained">
          ADD
        </Button>
        <br />
      </form>
    </div>
  );
};

AddUser.propTypes = {
  addUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, {setAlert, addUser})(AddUser);
