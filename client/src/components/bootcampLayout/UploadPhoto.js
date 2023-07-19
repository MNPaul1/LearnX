import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBootcampById } from "../../actions/bootcamp";
import {TextField, Button } from "@mui/material";
import { uploadPhoto } from "../../actions/bootcamp";
import LoadingLayout from "../layout/loadingLayout";
export const UploadPhoto = ({ bootcamp: { bootcamp }, getBootcampById, uploadPhoto}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPhoto, setPhoto] = useState()
  useEffect(() => {
    getBootcampById(id);
}, [getBootcampById, id]);
useEffect(()=>{
    if (bootcamp!==null){
        setPhoto(`/uploads/${bootcamp.data.photo}`)
    }
}, [bootcamp])
const handleChange = (e) => {
    const {value} = e.target;
    console.log(value)
    setPhoto(value)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    uploadPhoto(id, currentPhoto)
}
return bootcamp === null ? (
    <div className="loading">
      <LoadingLayout />
    </div>
  ) : (
    <div className="outer-container">
    <form className="container" style={{alignItems: 'flex-start'}} onSubmit={handleSubmit}>

      <h1 style={{ textAlign: "center" }}>UPLOAD PHOTO</h1>
      <TextField
        id="filled-read-only-input"
        label="Name"
        variant="filled"
        defaultValue={bootcamp.data.name}
        InputProps={{
          readOnly: true,
        }}
      />
      <img src={currentPhoto} className="photo" alt={bootcamp.data.name}/>
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

export default connect(mapStateToProps, { getBootcampById, uploadPhoto })(UploadPhoto);
