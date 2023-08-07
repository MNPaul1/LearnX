import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateCourse } from "../../actions/course";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "../../actions/course";
import { TextField, Button } from "@mui/material";
import LoadingLayout from '../layout/loadingLayout'

export const UpdateCourse = ({ getCourseById, course: { current_course }, updateCourse }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  document.title = "LearnX - Update Course"

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    weeks: "",
    tuition: "",
    minimumSkill: "",
    ScholershipAvailable: "",
  });
  const {
    title,
    description,
    weeks,
    tuition,
    minimumSkill,
    ScholershipAvailable,
  } = formData;
  useEffect(() => {
    getCourseById(id);
  }, [getCourseById, id]);
  useEffect(()=>{
    if (current_course) {
      setFormData(current_course.data);
    }
  }, [current_course])

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateCourse(id, formData)
    navigate(`/course/${id}`)
  };
  const onChange = (e) => {
    let { name, value } = e.target;
    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    }
    if (name === "weeks" || name === "tuition") {
      value = parseFloat(value);
    }
    setFormData({ ...formData, [name]: value });
  };
  return current_course === null ? (
    <div className="loading">
      <LoadingLayout />
    </div>
  ) : (
    <div className="outer-container">
      <form
        className="container createbootcamp-container"
        onSubmit={handleSubmit}
      >
        <h1 id="heading">UPDATE COURSE</h1>
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
              name="ScholershipAvailable"
              onChange={onChange}
              checked={ScholershipAvailable === true}
            />
            Yes
          </label>
          <label htmlFor="false">
            <input
              id="false"
              type="radio"
              value={false}
              name="ScholershipAvailable"
              onChange={onChange}
              checked={ScholershipAvailable === false}
            />
            No
          </label>
        </span>
        <Button className="btn" type="submit" variant="contained">
          Update Course
        </Button>
      </form>
    </div>
  );
};

UpdateCourse.propTypes = {
  getCourseById: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  updateCourse: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ course: state.course });

export default connect(mapStateToProps, { getCourseById, updateCourse })(UpdateCourse);
