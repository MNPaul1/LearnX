import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/user";
import LoadingLayout from "../layout/loadingLayout";
import './User.css'
import { useNavigate } from "react-router-dom";
import AddUser from "./AddUser";
import { Button } from "@mui/material";


export const UsersSettings = ({ getUsers, user: { users, loading } }) => {
    const navigate = useNavigate()
    document.title = "LearnX - Users Update";
    const [currentContent, setContent] = useState("editUser");
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return users === {} && loading ? (
    <div className="loading">
      <LoadingLayout />
    </div>
  ) : (
    <div className="resource-settings">
    <div className="sidebar">
      <Button className="btn" variant="outlined" onClick={() => setContent("editUser")}>
        Edit User
      </Button>
      <Button className="btn" variant="outlined" onClick={() => setContent("addUser")}>
        Add User
      </Button>
    </div>
    <div className="content-container">
      {currentContent === "editUser" && <div className="outer-container">
      <form className="container">
      <h1 id="heading">USERS LIST</h1>
      <p className="comment">Click on User label Update User Details.</p>
        {users?.data?.map((user) => (
          <label key={user._id} className="user-container" onClick={() => navigate(`/user-settings/${user._id}`)}>
            <nav>Name: {user.name}</nav> <nav>Email: {user.email}</nav>
          </label>
        ))}
      </form>
    </div>}
    {currentContent==="addUser" && <AddUser/>}
    </div>
    </div>

  );
};

UsersSettings.propTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers })(UsersSettings);
