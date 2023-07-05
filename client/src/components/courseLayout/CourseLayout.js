import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCourseById } from "../../actions/course";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../actions/user";

function CourseLayout({ getCourseById, auth, course: { current_course }, getUserById, user:{user} }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([])
  useEffect(() => {
    getCourseById(id);
    getUserById();
  }, [getCourseById, id, getUserById]);

  useEffect(() =>(
    setUsers(user.data)
  ),[user])

  const getUsername = (id) => {
    if (users){
      const value = users?.filter((user) => user._id===id); 
      return value[0]?.name
    }
  }

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
        <h4>Instructor: {getUsername(current_course.data.user)}</h4>
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
  getUserById: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
  user: state.user
});

export default connect(mapStateToProps, { getCourseById, getUserById })(CourseLayout);
