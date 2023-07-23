import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextField, Button } from "@mui/material";
import {useNavigate, useParams} from 'react-router-dom'
import { updateUser } from "../../actions/auth";
import { getUserById } from "../../actions/user";
import { updateUserByAdmin } from "../../actions/user";
const UpdateUser = ({ auth:{user:logged_user}, updateUser, getUserById, user: {user, loading}, updateUserByAdmin }) => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [userData, setUserData] = useState({
    name:'',
    email:'',
  })
  useEffect(()=>{
    getUserById(id)
  },[getUserById, id])

  useEffect(()=>{
    if(user!==null && !loading){
      setUserData({name: user?.data?.name, email: user?.data?.email})
    }
  }, [loading, user])

  const onChange = (e) =>{
    const {name, value} = e.target;
    setUserData({...userData, [name]: value})
  }
  const {name, email} = userData
  const handleSubmit = (e) =>{
    e.preventDefault();
    logged_user?.data?.role==='admin'?updateUserByAdmin(id, userData):updateUser(userData);
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
  user: state.user
});

export default connect(mapStateToProps, {updateUser, getUserById, updateUserByAdmin})(UpdateUser);
