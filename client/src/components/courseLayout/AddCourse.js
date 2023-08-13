import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams, useMatch } from "react-router-dom";
import { addCourse } from "../../actions/course";
import { TextField, Button } from "@mui/material";
import LoadingLayout from "../layout/loadingLayout";
import { getCourseById, updateCourse } from "../../actions/course";
export const AddCourse = ({
  addCourse,
  getCourseById,
  course: { current_course },
  updateCourse,
}) => {
  const isAddCourse = useMatch("/bootcamp-settings/:id");
  const { id } = useParams();
  const navigate = useNavigate();
  document.title = `LearnX - ${isAddCourse?"Add Course":"Update Course"}`;
  useEffect(() => {
    if (!isAddCourse) {
      
      getCourseById(id);
    }
  }, [getCourseById, id, isAddCourse]);

  const [formData, setData] = useState({
    title: "",
    description: "",
    weeks: "",
    tuition: "",
    minimumSkill: "",
    ScholershipAvailable: "",
  });
  useEffect(() => {
    if (!isAddCourse) {
      if (current_course) {
        setData(current_course.data);
      }
    }
  }, [current_course, isAddCourse]);
  const {
    title,
    description,
    weeks,
    tuition,
    minimumSkill,
    ScholershipAvailable,
  } = formData;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddCourse) {
      addCourse(id, formData);
      navigate(`/bootcamp/${id}`);
    } else {
      updateCourse(id, formData);
      navigate(`/course/${id}`);
    }
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
    setData({ ...formData, [name]: value });
  };

  return current_course === null && !isAddCourse ? (
    <div className="loading">
      <LoadingLayout />
    </div>
  ) : (
    <div className="outer-container">
      <form
        className="container"
        onSubmit={handleSubmit}
        style={{ alignItems: "flex-start" }}
      >
        <h1 id="heading">{isAddCourse ? "ADD COURSE" : "UPDATE COURSE"}</h1>
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
          variant="filled"
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
          {isAddCourse ? "Add Course" : "Update"}
        </Button>
      </form>
    </div>
  );
};

AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired,
  getCourseById: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  updateCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, {
  addCourse,
  getCourseById,
  updateCourse,
})(AddCourse);
