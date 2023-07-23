import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../actions/user";
import { Button, TextField } from "@mui/material";

export const ProfileLayout = ({ getUserById, user: { user, loading } }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  document.title = "LearnX - User Info";

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });
  useEffect(() => {
    getUserById(id);
  }, [getUserById, id]);
  useEffect(() => {
    if (user !== null && !loading) {
      setUserData({
        name: user?.data?.name,
        email: user?.data?.email,
        role: user?.data?.role,
      });
    }
  }, [user, loading]);
  const { name, email, role } = userData;
  return (
    <div className="content-container">
      <div className="outer-container">
        <form className="container">
          <h1 style={{ textAlign: "center" }}>USER INFO</h1>
          <TextField
            id="filled-read-only-input"
            label="Name"
            variant="filled"
            value={name}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="filled-read-only-input"
            label="Email"
            variant="filled"
            value={email}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="filled-read-only-input"
            label="Role"
            variant="filled"
            value={role}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            className="btn"
            variant="contained"
            onClick={() => {
              navigate(`/user-settings/${id}`);
            }}
          >
            EDIT
          </Button>
        </form>
      </div>
    </div>
  );
};

ProfileLayout.propTypes = {
  user: PropTypes.object.isRequired,
  getUserById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUserById })(ProfileLayout);
