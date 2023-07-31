import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getBootcampById, deleteBootcamp } from "../../actions/bootcamp";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import LoadingLayout from "../layout/loadingLayout";
export const DeleteBootcamp = ({
  bootcamp: { bootcamp },
  getBootcampById,
  deleteBootcamp,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "LearnX - Delete Bootcamp";
    getBootcampById(id);
  }, [getBootcampById, id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteBootcamp(id);
    navigate("/bootcamps");
  };
  return bootcamp === null ? (
    <div className="loading">
      <LoadingLayout />
    </div>
  ) : (
    <div className="outer-container">
      <form className="container" onSubmit={handleSubmit}>
        <h1 id="heading">DELETE BOOTCAMP</h1>
        <TextField
          id="filled-read-only-input"
          label="Name"
          variant="filled"
          defaultValue={bootcamp.data.name}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="filled-read-only-input"
          label="Email"
          variant="filled"
          defaultValue={bootcamp.data.email}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="filled-read-only-input"
          label="Phone"
          variant="filled"
          defaultValue={bootcamp.data.phone}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button
          className="btn "
          id="delete-btn"
          type="submit"
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </form>
    </div>
  );
};

DeleteBootcamp.propTypes = {
  bootcamp: PropTypes.object.isRequired,
  getBootcampById: PropTypes.func.isRequired,
  deleteBootcamp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getBootcampById, deleteBootcamp })(
  DeleteBootcamp
);
