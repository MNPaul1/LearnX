import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCourseById } from "../../actions/course";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
function CourseLayout({ getCourseById, auth, course: { current_course } }) {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getCourseById(id);
  }, [getCourseById, id]);

  return current_course === null ? (
    <div className="loading">
      <CircularProgress />
    </div>
  ) : (
    <div className="outer-container">
      <div className="container" style={{ width: "75%" }}>
        <h1>{current_course.data.title}</h1>
        <p>{current_course.data.description}.</p>
        <h4>Duration: {current_course.data.weeks} week(s)</h4>
        <h4>
          Scholarship:{" "}
          {current_course.data.ScholershipAvailable
            ? "Available"
            : "Not Available"}
        </h4>
        <h4>Instructor: {current_course.data.user}</h4>
        <h4>
          Last updated {new Date().getMonth(current_course.data.createdAt)}/
          {new Date().getFullYear(current_course.data.createdAt)}
        </h4>
        <h4>
          Minimum Skills: {current_course.data.minimumSkill.toUpperCase()}
        </h4>
        <h3>Tuition: CA${current_course.data.tuition}</h3>
      </div>
      <div style={{width: '75%'}}>
      <h1>Associated with Bootcamp:</h1>
      <br />
      <div
        className="course-container"
        onClick={() =>
          navigate(`/bootcamp/${current_course.data.bootcamp._id}`)
        }
      >
        <h1>{current_course.data.bootcamp.name}</h1>
        <p className="description" id="course-description">
          {current_course.data.bootcamp.description}
        </p>
      </div>
      </div>
    </div>
  );
}

CourseLayout.propTypes = {
  auth: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  getCourseById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
});

export default connect(mapStateToProps, { getCourseById })(CourseLayout);
