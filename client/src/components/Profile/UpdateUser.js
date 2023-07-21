import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextField, Button } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import { updateUser } from "../../actions/auth";

const UpdateUser = ({ auth:{loading, user}, updateUser }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name:'',
    email:'',
  })
  useState(()=>{
    if(!loading){
      setUserData({name: user.data?.name, email: user.data?.email})
    }
  }, [loading, user])

  const onChange = (e) =>{
    const {name, value} = e.target;
    setUserData({...userData, [name]: value})
  }
  const {name, email} = userData
  const handleSubmit = (e) =>{
    e.preventDefault();
    updateUser(userData);
    window.location.reload()
    navigate('/bootcamps')
  }
  return (
    <div className="outer-container">
      <form className="container" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>UPDATE USER</h1>
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
        <Button className="btn" type="submit" variant="contained">
          Update User
        </Button>
      </form>
    </div>
  );
};

UpdateUser.propTypes = {
  auth: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {updateUser})(UpdateUser);
