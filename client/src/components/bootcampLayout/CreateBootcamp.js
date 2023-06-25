import React, { useState } from "react";
import PropTypes from "prop-types";
import "./createBootcamp.css";
import { CircularProgress } from "@mui/material";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { createBootcamp } from "../../actions/bootcamp";
import { TextField } from "@mui/material";
const CreateBootcamp = ({ auth: { user }, createBootcamp }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    email: "",
    address: "",
    phone: "",
    careers: ["Web Development", "Mobile Development", "UI/UX", "Data Science"],
    housing: false,
    jobAssistance: false,
    jobGuarantee: false,
    acceptGi: false,
  });
  const {
    name,
    description,
    website,
    email,
    address,
    careers,
    phone,
    housing,
    jobAssistance,
    jobGuarantee,
    acceptGi,
  } = formData;

  const onChange = (e) => {
    let { name, value } = e.target;
    if (value === "true" || value === "false") {
      if (value === "true") {
        value = true;
      } else {
        value = false;
      }
    }
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createBootcamp(
      name,
      description,
      website,
      email,
      address,
      careers,
      phone,
      housing,
      jobAssistance,
      jobGuarantee,
      acceptGi
    );
  };

  return user == null ? (
    <CircularProgress />
  ) : (
    <div className="outer-container">
      <form
        className="container createbootcamp-container"
        onSubmit={handleSubmit}
      >
        <h1 style={{ textAlign: "center" }}>ADD BOOTCAMP</h1>
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
          id="filled-multiline-static"
          label="Description"
          name="description"
          multiline
          rows={4}
          value={description}
          variant="standard"
          onChange={onChange}
          required
        />
        <TextField
          type="website"
          name="website"
          id="filled-basic"
          label="Website"
          variant="filled"
          value={website}
          onChange={onChange}
          required
        />
        <TextField
          type="phone"
          name="phone"
          id="filled-basic"
          label="Phone"
          variant="filled"
          value={phone}
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
        <TextField
          type="address"
          name="address"
          id="filled-basic"
          label="Address"
          variant="filled"
          value={address}
          onChange={onChange}
          required
        />
        <span className="radio-span">
          <h3>Housing</h3>
          <label htmlFor="false">
            <input
              id="false"
              type="radio"
              value={false}
              name="housing"
              onChange={onChange}
              checked={housing === false}
            />
            No
          </label>
          <label htmlFor="true">
            <input
              type="radio"
              id="true"
              value={true}
              name="housing"
              onChange={onChange}
              checked={housing === true}
            />
            Yes
          </label>
        </span>
        <span className="radio-span">
          <h3>Job Assistance</h3>
          <label htmlFor="false">
            <input
              id="false"
              type="radio"
              value={false}
              name="jobAssistance"
              onChange={onChange}
              checked={jobAssistance === false}
            />
            No
          </label>
          <label htmlFor="true">
            <input
              type="radio"
              id="true"
              value={true}
              name="jobAssistance"
              onChange={onChange}
              checked={jobAssistance === true}
            />
            Yes
          </label>
        </span>
        <span className="radio-span">
          <h3>Job Guarantee</h3>
          <label htmlFor="false">
            <input
              id="false"
              type="radio"
              value={false}
              name="jobGuarantee"
              onChange={onChange}
              checked={jobGuarantee === false}
            />
            No
          </label>
          <label htmlFor="true">
            <input
              type="radio"
              id="true"
              value={true}
              name="jobGuarantee"
              onChange={onChange}
              checked={jobGuarantee === true}
            />
            Yes
          </label>
        </span>
        <span className="radio-span">
          <h3>Accept Gi</h3>
          <label htmlFor="false">
            <input
              id="false"
              type="radio"
              value={false}
              name="acceptGi"
              onChange={onChange}
              checked={acceptGi === false}
            />
            No
          </label>
          <label htmlFor="true">
            <input
              type="radio"
              id="true"
              value={true}
              name="acceptGi"
              onChange={onChange}
              checked={acceptGi === true}
            />
            Yes
          </label>
        </span>
        <h4 className="instruction">Please upload bootcamp photo in settings.</h4>
        <Button id="btn" type="submit" variant="contained">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

CreateBootcamp.propTypes = {
  createBootcamp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createBootcamp })(CreateBootcamp);
