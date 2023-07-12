import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCourseById } from "../../actions/course";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../actions/user";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

function CourseLayout({
  getCourseById,
  course: { current_course },
  getUserById,
  user: { user },
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getCourseById(id);
    getUserById();
  }, [getCourseById, id, getUserById]);

  useEffect(() => setUsers(user.data), [user]);

  const getUsername = (id) => {
    if (users) {
      const value = users?.filter((user) => user._id === id);
      return value[0]?.name;
    }
  };
  const handleSettingClick = () => {
    navigate(`/course-settings/${id}`);
  };
  return current_course === null ? (
    <div className="loading">
      <CircularProgress />
    </div>
  ) : (
    <div className="outer-container">
      <div className="container" style={{ width: "75%", position: "relative" }}>
        <h1 className="bootcamp-title">
          {current_course.data.title}
          <button
            style={{
              backgroundColor: "transparent",
              color: "inherit",
              border: "none",
              cursor: "pointer",
              width: "fit-content",
            }}
            onClick={handleSettingClick}
          >
            <SettingsSuggestIcon fontSize="large" />
          </button>
        </h1>
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
          Minimum Skills:
          <span style={{ textTransform: "uppercase", fontSize: "small" }}>
            {current_course.data.minimumSkill}
          </span>
        </h4>
        <h3>Tuition: CA${current_course.data.tuition}</h3>
        <div
          className="course-container contained-container"
          onClick={() =>
            navigate(`/bootcamp/${current_course.data.bootcamp._id}`)
          }
        >
          <h1>{current_course.data?.bootcamp?.name}</h1>
          <p className="description" id="course-description">
            {current_course.data?.bootcamp?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

CourseLayout.propTypes = {
  course: PropTypes.object.isRequired,
  getCourseById: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  user: state.user,
});

export default connect(mapStateToProps, { getCourseById, getUserById })(
  CourseLayout
);
