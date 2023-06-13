import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBootcampById } from "../../actions/bootcamp";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { Rating } from "@mui/material";
import "./bootcampLayout.css";
import LaunchIcon from "@mui/icons-material/Launch";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getCoursesByBootcamp } from "../../actions/course";

const BootcampLayout = ({
  getBootcampById,
  auth,
  getCoursesByBootcamp,
  courses_by_bootcamp: { courses },
  bootcamp: { bootcamp, loading },
}) => {
  const { id } = useParams();
  useEffect(() => {
    getBootcampById(id);
    getCoursesByBootcamp(id);
  }, [getBootcampById, id, getCoursesByBootcamp]);
  const skillLevels = { beginner: "20", intermediate: "50", advanced: "70" };
  const RenderComponent = (Component, value, ...rest) => {
    return bootcamp == null ? (
      <CircularProgress />
    ) : (
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Component size="small" sx={{ mr: 1 }} />
        <Box
          sx={{
            mr: 1,
            color: rest[0] ? rest[0] : "inherit",
            textDecoration: rest[1] ? rest[1] : "none",
          }}
        >
          {value}
        </Box>
      </Box>
    );
  };

  return bootcamp == null ? (
    <div className="loading">
      <CircularProgress />
    </div>
  ) : (
    <div className="bootcamp-section">
      <div className="bootcamp-section-header">
        <img
          src={`/uploads/${bootcamp.data?.photo}`}
          alt=""
          className="photo"
        />
        <div className="bootcamp-info">
          <h1 className="bootcamp-title">{bootcamp.data?.name}</h1>
          <p>{bootcamp.data.description}</p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: 2, fontWeight: "bolder" }}>
              {(bootcamp.data.averageRating * 5) / 10}
            </Box>
            <Rating
              name="half-rating-read"
              defaultValue={(bootcamp.data.averageRating * 5) / 10}
              precision={0.5}
              size="small"
              readOnly
            />
          </Box>
          <nav>Created By: {bootcamp.data.user}</nav>
          <nav>
            Last updated {new Date().getMonth(bootcamp.data.createdAt)}/
            {new Date().getFullYear(bootcamp.data.createdAt)}
          </nav>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {RenderComponent(
              LaunchIcon,
              bootcamp.data.website,
              "skyblue",
              "underline"
            )}
            {RenderComponent(PhoneIcon, bootcamp.data.phone)}
            {RenderComponent(EmailIcon, bootcamp.data.email)}
          </Box>

          <nav>
            {RenderComponent(
              LocationOnIcon,
              bootcamp.data.location.formattedAddress
            )}
          </nav>
          <nav>Housing: {bootcamp.data.housing ? "Yes" : "No"}</nav>
          <nav>
            Job assistance: {bootcamp.data.jobAssistance ? "Yes" : "No"}
          </nav>
          <nav>Job Guarantee: {bootcamp.data.jobGuarantee ? "Yes" : "No"} </nav>
        </div>
      </div>
      <br />
      <div className="bootcamp-courses">
        <h1>COURSES</h1>
        <br />
        <div className="courses-section center-element">
          {courses.data?.map((course) => (
            <div key={course._id} className="course-container">
              <h1>{course.title}</h1>
              <p className="description" id="course-description">
                {course.description}
              </p>
              <nav>
                <b>Duration: {course.weeks} week(s)</b>
              </nav>
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
              <nav>
                <b>Tuition: CA${course.tuition}</b>
              </nav>
            </div>
          ))}
        </div>
      </div>
      <br />
      <h1>CAREER OPPORTUNITY</h1>
      <br />
      <div className="bootcamp-opportunity-container container">
        <div className="left-container center-element">
          {bootcamp.data.careers.map((career, key) => (
            <nav key={key}>{career}</nav>
          ))}
        </div>
        <div className="right-container center-element">
          <LocationOnIcon />
          <span>{bootcamp.data.location.street},</span>
          <span>
            {bootcamp.data.location.city}, {bootcamp.data.location.zipcode},
          </span>
          <span>{bootcamp.data.location.country}</span>
        </div>
      </div>
      <br />
      <br />
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
        Average Cost: CA${bootcamp.data.averageCost}
      </h1>
    </div>
  );
};

BootcampLayout.propTypes = {
  getBootcampById: PropTypes.func.isRequired,
  getCoursesByBootcamp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  bootcamp: state.bootcamp,
  courses_by_bootcamp: state.courses_by_bootcamp,
});

export default connect(mapStateToProps, {
  getBootcampById,
  getCoursesByBootcamp,
})(BootcampLayout);
