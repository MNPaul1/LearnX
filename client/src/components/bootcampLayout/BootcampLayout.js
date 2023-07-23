import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBootcampById } from "../../actions/bootcamp";
import { Link, useParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Rating } from "@mui/material";
import "./bootcampLayout.css";
import LaunchIcon from "@mui/icons-material/Launch";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getCoursesByBootcamp } from "../../actions/course";
import { useNavigate } from "react-router-dom";
import { getReviews } from "../../actions/review";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { getUsers } from "../../actions/user";
import { addReview } from "../../actions/review";
import LoadingLayout from "../layout/loadingLayout";
const BootcampLayout = ({
  getBootcampById,
  getReviews,
  auth,
  getCoursesByBootcamp,
  getUsers,
  addReview,
  user: { users, loading },
  course: { courses },
  bootcamp: { bootcamp },
  review: { reviews },
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getUsers();
    getCoursesByBootcamp(id);
    getReviews(id);
    getBootcampById(id);
  }, [getBootcampById, id, getUsers, getCoursesByBootcamp, getReviews]);

  useEffect(() => {
    document.title = `LearnX - ${bootcamp?.data?.name}`;
  }, [bootcamp]);
  const getUsername = (id) => {
    if (!loading) {
      const value = users.data?.filter((user) => user._id === id);
      if (value) {
        
        return value[0]?.name;
      }
    }
  };
  const [reviewFormData, setFormData] = useState({
    title: "",
    rating: null,
    text: "",
  });
  const { title, rating, text } = reviewFormData;
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addReview(id, reviewFormData);
    navigate("/bootcamps");
  };
  const handleReviewDataChange = (e) => {
    let { name, value } = e.target;
    if (name === "rating") {
      value = (parseFloat(value) * 10) / 5;
    }
    setFormData({ ...reviewFormData, [name]: value });
  };

  const skillLevels = { beginner: "20", intermediate: "50", advanced: "70" };
  const RenderComponent = (Component, value, ...rest) => {
    return (
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
  const handleSettingClick = () => {
    navigate(`/bootcamp-settings/${id}`);
  };
  return bootcamp === null ? (
    <div className="loading">
      <LoadingLayout />
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
          <h1 className="bootcamp-title">
            {bootcamp.data?.name}{" "}
            <button
              style={{
                backgroundColor: "transparent",
                color: "inherit",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleSettingClick}
            >
              <SettingsSuggestIcon fontSize="large" />
            </button>
          </h1>
          <p>{bootcamp.data.description}</p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: 2, fontWeight: "bolder" }}>
              {parseFloat(((bootcamp.data.averageRating * 5) / 10).toFixed(2))}
            </Box>
            <Rating
              name="half-rating-read"
              defaultValue={(bootcamp.data.averageRating * 5) / 10}
              precision={0.5}
              size="small"
              readOnly
            />
          </Box>
          <nav>Created By: {getUsername(bootcamp.data.user)}</nav>
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
          <nav>Accept Gi: {bootcamp.data.acceptGi ? "Yes" : "No"} </nav>
        </div>
      </div>
      <br />
      <div className="bootcamp-courses">
        <h1>COURSES</h1>
        <br />
        <div className="courses-section center-element">
          {courses.data?.map((course) => (
            <div
              key={course._id}
              className="course-container"
              onClick={() => navigate(`/course/${course._id}`)}
            >
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
      <h1>Feedback</h1>
      <form className="container" onSubmit={handleReviewSubmit}>
        <TextField
          type="text"
          id="filled-basic"
          variant="filled"
          label="Title"
          name="title"
          value={title}
          onChange={handleReviewDataChange}
          required
        />
        <TextField
          type="number"
          value={(rating * 5) / 10}
          id="filled-basic"
          InputProps={{ inputProps: { min: 0, max: 5 } }}
          variant="filled"
          label="Rating"
          name="rating"
          onChange={handleReviewDataChange}
          required
        />
        <TextField
          type="text"
          value={text}
          id="filled-multiline-static"
          variant="standard"
          multiline
          rows={4}
          label="Comment"
          name="text"
          onChange={handleReviewDataChange}
          required
        />
        <Button variant="contained" type="submit">
          Post
        </Button>
      </form>
      <br />

      <h1>Reviews</h1>
      <div className="review-container">
        {reviews.data?.map(
          (review, id) =>
            id < 1 && (
              <div key={review._id} className="review">
                <h2>{review.title}</h2>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ mr: 1, fontWeight: "bolder" }}>
                    {(review.rating * 5) / 10}
                  </Box>
                  <Rating
                    name="half-rating-read"
                    defaultValue={(review.rating * 5) / 10}
                    precision={0.5}
                    size="medium"
                    readOnly
                  />
                </Box>
                <p>{review.text}</p>
                <h3>{getUsername(review.user)}</h3>
                <nav>
                  {new Date().getMonth(bootcamp.data.createdAt)}/
                  {new Date().getFullYear(bootcamp.data.createdAt)}
                </nav>
              </div>
            )
        )}
        <Link to="/reviews">All reviews</Link>
      </div>
      <br />
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
        Average Cost: CA${bootcamp.data.averageCost}
      </h1>
    </div>
  );
};

BootcampLayout.propTypes = {
  getBootcampById: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  getCoursesByBootcamp: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  bootcamp: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  getReviews: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  bootcamp: state.bootcamp,
  user: state.user,
  course: state.course,
  review: state.review,
});

export default connect(mapStateToProps, {
  getBootcampById,
  getCoursesByBootcamp,
  getReviews,
  getUsers,
  addReview,
})(BootcampLayout);
