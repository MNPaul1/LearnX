import React, { useState } from "react";
import PropTypes from "prop-types";
import "./createBootcamp.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import LoadingLayout from "../layout/loadingLayout";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { createBootcamp } from "../../actions/bootcamp";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
const CreateBootcamp = ({ auth: { user }, createBootcamp }) => {
  document.title = "LearnX - Create Bootcamp"

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    email: "",
    address: "",
    phone: "",
    careers: [],
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
  const careersList = [
    "Web Development",
    "UI/UX",
    "Mobile Development",
    "Data Science",
    "Business",
    "Other",
  ];
  const onChange = (e) => {
    let { name, value } = e.target;
    if (careersList.includes(name)) {
      let { checked } = e.target;
      if (checked) {
        setFormData({ ...formData, [careers]: careers.push(name) });
      } else if (checked === false) {
        let currentItemIndex = careers.indexOf(name);
        let temp = careers[careers.length - 1];
        careers[currentItemIndex] = temp;
        careers[careers.length - 1] = name;
        setFormData({ ...formData, [careers]: careers.pop() });
      }
    }
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
    createBootcamp(formData);
    navigate('/bootcamps')
  };

  return user == null ? (
    <LoadingLayout />
  ) : (
    <div className="outer-container">
      <form
        className="container createbootcamp-container"
        onSubmit={handleSubmit}
      >
        <h1 id="heading">ADD BOOTCAMP</h1>
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
        <span className="radio-span check-box">
          <h3>Careers</h3>
          <div>
            <FormControlLabel
              control={<Checkbox />}
              label="Web Development"
              name="Web Development"
              checked={careers.includes("Web Development")}
              onChange={onChange}
            />
          </div>
          <div>
            <FormControlLabel
              control={<Checkbox />}
              name="Mobile Development"
              label="Mobile Development"
              checked={careers.includes("Mobile Development")}
              onChange={onChange}
            />
          </div>
          <div>
            <FormControlLabel
              control={<Checkbox />}
              name="UI/UX"
              label="UI/UX"
              checked={careers.includes("UI/UX")}
              onChange={onChange}
            />
          </div>
          <div>
            <FormControlLabel
              control={<Checkbox />}
              name="Data Science"
              label="Data Science"
              checked={careers.includes("Data Science")}
              onChange={onChange}
            />
          </div>
          <div>
            <FormControlLabel
              control={<Checkbox />}
              name="Business"
              label="Business"
              checked={careers.includes("Business")}
              onChange={onChange}
            />
          </div>
          <div>
            <FormControlLabel
              control={<Checkbox />}
              name="Other"
              label="Other"
              checked={careers.includes("Other")}
              onChange={onChange}
            />
          </div>
        </span>
        <span className="radio-span">
          <h3>Housing</h3>
          <label htmlFor="h_false">
            <input
              id="h_false"
              type="radio"
              value={false}
              name="housing"
              onChange={onChange}
              checked={housing === false}
            />
            No
          </label>
          <label htmlFor="h_true">
            <input
              type="radio"
              id="h_true"
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
          <label htmlFor="j_false">
            <input
              id="j_false"
              type="radio"
              value={false}
              name="jobAssistance"
              onChange={onChange}
              checked={jobAssistance === false}
            />
            No
          </label>
          <label htmlFor="j_true">
            <input
              type="radio"
              id="j_true"
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
          <label htmlFor="jg_false">
            <input
              id="jg_false"
              type="radio"
              value={false}
              name="jobGuarantee"
              onChange={onChange}
              checked={jobGuarantee === false}
            />
            No
          </label>
          <label htmlFor="jg_true">
            <input
              type="radio"
              id="jg_true"
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
          <label htmlFor="ag_false">
            <input
              id="ag_false"
              type="radio"
              value={false}
              name="acceptGi"
              onChange={onChange}
              checked={acceptGi === false}
            />
            No
          </label>
          <label htmlFor="ag_true">
            <input
              type="radio"
              id="ag_true"
              value={true}
              name="acceptGi"
              onChange={onChange}
              checked={acceptGi === true}
            />
            Yes
          </label>
        </span>
        <h4 className="instruction">
          Please upload bootcamp photo in settings.
        </h4>
        <Button className="btn" type="submit" variant="contained">
          Add Bootcamp
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
