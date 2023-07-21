import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/user";
import { useParams } from "react-router-dom";
import { getUserById } from "../../actions/user";
export const DeleteUser = ({
  deleteUser,
  getUserById,
  user: { user },
}) => {
  const { id } = useParams();
  const [formData, setFormData] = useEffect({
    name: "",
    email: "",
    role: "",
  });
  const { name, email, role } = formData;
  useEffect(() => {
    getUserById(id);
  });
  useEffect(() => {
    setFormData({
      name: user?.data?.name,
      email: user?.data?.email,
      role: user?.data?.role,
    });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteUser(id);
    // navigate('/bootcamps')
  };
  return (
    <div className="outer-container">
      <form className="container" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>DELETE USER</h1>
        <TextField
          id="filled-read-only-input"
          label="Name"
          variant="filled"
          defaultValue={name}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="filled-read-only-input"
          label="Email"
          variant="filled"
          defaultValue={email}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="filled-read-only-input"
          label="Title"
          variant="filled"
          defaultValue={current_course.data.title}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="filled-read-only-input"
          label="Role"
          variant="filled"
          defaultValue={role}
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
  auth: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteUser, getUserById })(
  DeleteUser
);
