import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/user";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../actions/user";
import { TextField, Button } from "@mui/material";

export const DeleteUser = ({ deleteUser, getUserById, user: { user, loading } }) => {
  const { id } = useParams();
  document.title = "LearnX - Delete User";
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const { name, email, role } = formData;
  useEffect(() => {
    getUserById(id);
  }, [getUserById, id]);

  useEffect(() => {
    if (user !== null && !loading) {
      setFormData({
        name: user?.data?.name,
        email: user?.data?.email,
        role: user?.data?.role,
      });
    }
  }, [user, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteUser(id);
    navigate('/users-settings')
  };
  return (
    <div className="outer-container">
      <form className="container" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>DELETE USER</h1>
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
        <Button className="btn" type="submit" variant="contained">
          DELETE
        </Button>
      </form>
    </div>
  );
};

DeleteUser.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, { deleteUser, getUserById })(
  DeleteUser
);
