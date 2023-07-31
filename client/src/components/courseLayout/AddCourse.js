import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCourse } from "../../actions/course";
import { TextField, Button } from "@mui/material";
export const AddCourse = ({ addCourse }) => {
  const [formData, setData] = useState({
    title: "",
    description: "",
    weeks: "",
    tuition: "",
    minimumSkill: "",
    scholarshipsAvailable: "",
  });
  const {
    title,
    description,
    weeks,
    tuition,
    minimumSkill,
    scholarshipsAvailable,
  } = formData;
  const { id } = useParams();
  const navigate = useNavigate();
  document.title = "LearnX - Add Course"

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addCourse(id, formData);
    navigate(`/courses`);
  };

  const onChange = (e) => {
    let { name, value } = e.target;
    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    }
    if (name ==="weeks" || name==="tuition"){
        value=parseFloat(value)
    }
    setData({ ...formData, [name]: value });
  };

  return (
    <div className="outer-container">
      <form className="container" onSubmit={handleSubmit} style={{alignItems: "flex-start"}}>
        <h1 id="heading">ADD COURSE</h1>
        <TextField
          type="name"
          name="title"
          id="filled-basic"
          label="Title"
          variant="filled"
          value={title}
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
          type="number"
          name="weeks"
          id="filled-basic"
          label="Duration"
          variant="filled"
          value={weeks}
          onChange={onChange}
          placeholder="Weeks"
          required
        />
        <TextField
        type="number"
          name="tuition"
          id="filled-basic"
          label="Tuition"
          variant="filled"
          value={tuition}
          onChange={onChange}
          required
        />
        <span className="radio-span">
          <h3>Minimum Skill</h3>
          <label htmlFor="beginner">
            <input
              id="beginner"
              type="radio"
              value="beginner"
              name="minimumSkill"
              onChange={onChange}
              checked={minimumSkill === "beginner"}
            />
            Beginner
          </label>
          <label htmlFor="intermediate">
            <input
              id="intermediate"
              type="radio"
              value="intermediate"
              name="minimumSkill"
              onChange={onChange}
              checked={minimumSkill === "intermediate"}
            />
            Intermediate
          </label>
          <label htmlFor="advanced">
            <input
              id="advanced"
              type="radio"
              value="advanced"
              name="minimumSkill"
              onChange={onChange}
              checked={minimumSkill === "advanced"}
            />
            Advanced
          </label>
        </span>
        <span className="radio-span">
          <h3>Scholarship Available</h3>
          <label htmlFor="true">
            <input
              id="true"
              type="radio"
              value={true}
              name="scholarshipsAvailable"
              onChange={onChange}
              checked={scholarshipsAvailable === true}
            />
            Yes
          </label>
          <label htmlFor="false">
            <input
              id="false"
              type="radio"
              value={false}
              name="scholarshipsAvailable"
              onChange={onChange}
              checked={scholarshipsAvailable === false}
            />
            No
          </label>
        </span>
        <Button className="btn" type="submit" variant="contained">
          Add Course
        </Button>
      </form>
    </div>
  );
};

AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addCourse })(AddCourse);
