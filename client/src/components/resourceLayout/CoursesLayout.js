import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCourses } from "../../actions/course";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingLayout from "../layout/loadingLayout";
import { Pagination } from "@mui/material";

const CoursesLayout = ({ getCourses, auth, course: { courses, loading } }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let currentPage = Number(searchParams.get("page"));
  const [totalPages, setPages] = useState(0);
  const skillLevels = { beginner: "20", intermediate: "50", advanced: "70" };
  const handleClick = (e) => {
    const { id } = e.target;
    return navigate(`/course/${id}`);
  };
  useEffect(() => {
    document.title = "LearnX - All Courses";
    getCourses(currentPage);
  }, [getCourses, currentPage]);
  useEffect(() => {
    if (courses !== null && !loading) {
      setPages(Math.ceil(Number(courses?.total) / 4));
    }
  }, [courses, loading]);
  const handlePagination = (e, v) => {
    setSearchParams({ page: v });
  };
  return courses === null && loading ? (
    <div className="loading">
      <LoadingLayout />
    </div>
  ) : (
    <div className="section">
      <Pagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
            {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
        }}
        page={currentPage}
        onChange={handlePagination}
      />
      {courses.data?.map((course) => (
        <div
          key={course._id}
          id={course._id}
          className="resource-container"
          onClick={handleClick}
        >
          <div className="click" id={course._id}></div>
          <h1 className="bootcamp-name">
            Associated with {course.bootcamp.name} bootcamp
          </h1>
          <div className="resource-info">
            <h2 className="resource-title">{course.title}</h2>
            <p className="description">
              {course.description.slice(0, 120)}
              {course.description.length > 120 ? "..." : "."}
            </p>
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
      <Pagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
            {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
        }}
        page={currentPage}
        onChange={handlePagination}
      />
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
