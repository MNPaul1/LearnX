import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBootcampById } from "../../actions/bootcamp";
import { TextField, Button } from "@mui/material";
import { uploadPhoto } from "../../actions/bootcamp";
import LoadingLayout from "../layout/loadingLayout";
export const UploadPhoto = ({
  bootcamp: { bootcamp },
  getBootcampById,
  uploadPhoto,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPhoto, setPhoto] = useState();
  const [displayPhoto, setDP] = useState();
  useEffect(() => {
    document.title = "LearnX - Upload Bootcamp Photo";
    getBootcampById(id);
  }, [getBootcampById, id]);
  useEffect(() => {
    if (bootcamp !== null) {
      setPhoto(`/uploads/${bootcamp.data.photo}`);
      setDP(`/uploads/${bootcamp.data.photo}`);
    }
  }, [bootcamp]);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setDP(reader.result);
      }
      setPhoto(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadPhoto(id, currentPhoto);
    navigate(`/bootcamp/${id}`)
  };
  return bootcamp === null ? (
    <div className="loading">
      <LoadingLayout />
    </div>
  ) : (
    <div className="outer-container">
      <form
        className="container"
        style={{ alignItems: "flex-start" }}
        onSubmit={handleSubmit}
      >
        <h1 id="heading">UPLOAD PHOTO</h1>
        <TextField
          id="filled-read-only-input"
          label="Name"
          variant="filled"
          defaultValue={bootcamp.data.name}
          InputProps={{
            readOnly: true,
          }}
        />
        <img src={displayPhoto} className="photo" alt={bootcamp.data.name} />
        <input type="file" onChange={handleChange} accept="image/*" />
        <Button className="btn" type="submit" variant="contained">
          Update
        </Button>
      </form>
    </div>
  );
};

UploadPhoto.propTypes = {
  bootcamp: PropTypes.object.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
  getBootcampById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getBootcampById, uploadPhoto })(
  UploadPhoto
);
