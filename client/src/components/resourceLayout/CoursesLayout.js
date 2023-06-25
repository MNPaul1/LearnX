import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCourses } from "../../actions/course";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CoursesLayout = ({ getCourses, auth, course: { courses, loading } }) => {
  const navigate = useNavigate();
  const skillLevels = { beginner: "20", intermediate: "50", advanced: "70" };
  const handleClick = (e) => {
    const {id} = e.target
    return navigate(`/course/${id}`)
  }
  useEffect(() => {
    getCourses();
  }, [getCourses]);
  return loading ? (
    <div className="loading">
      <CircularProgress />
    </div>
  ) : (
    <div className="section">
      {courses.data?.map((course) => (
        <div
          key={course.id}
          id={course.id}
          className="resource-container"
          onClick={handleClick}
        >
          <div className="click" id={course._id}></div>
          <h1 className="bootcamp-name">Bootcamp Name: {course.bootcamp.name}</h1>
          <div className="resource-info">
            <h2 className="resource-title">{course.title}</h2>
            <p className="description">{course.description.slice(0,120)}{course.description.length>120?'...':'.'}</p>
            <nav>
                <b>Minimum Skill:</b>
              </nav>
              <div className="skill-bar">
                <div
                  className="required-skill-bar"
                  style={{ width: `${skillLevels[course.minimumSkill]}%` }}
                >
                  {">" + skillLevels[course.minimumSkill]}%
                </div>
              </div>
            <h3 className="resource-cost">CA${course.tuition}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

CoursesLayout.propTypes = {
  auth: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  getCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
});

export default connect(mapStateToProps, { getCourses })(CoursesLayout);
