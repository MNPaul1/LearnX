import React, { Fragment, useEffect } from "react";
import "./landing.css";
import CardMedia from "@mui/material/CardMedia";
import { connect } from "react-redux";
import { getBootcamps } from "../../actions/bootcamp";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../actions/user";
import LoadingLayout from "./loadingLayout";
const Landing = ({ getBootcamps, bootcamp: { bootcamps, loading }, getUsers }) => {
  useEffect(() => {
    document.title = "LearnX - Home"

    getBootcamps();
    getUsers()
  }, [getBootcamps, getUsers]);
  const navigate = useNavigate();
  const bootcampsBenefits = [
    {
      "Rapid Skill Acquisition":
        "Bootcamps are designed to provide accelerated learning experiences, allowing participants to quickly gain practical skills in a relatively short period.",
    },
    {
      "Industry-Relevant Training":
        "Bootcamps are typically tailored to meet the needs of specific industries, ensuring that participants gain knowledge that is applicable to the job market.",
    },
    {
      "Career Transition Opportunities":
        "Bootcamps offer an accessible pathway for individuals looking to switch careers or enter new industries.",
    },
    {
      "Networking and Mentorship":
        "Bootcamps provide an environment for participants to build valuable connections within the industry.",
    },
    {
      "Job Placement Support":
        "A significant advantage of bootcamps is the emphasis on job placement and career support.",
    },
    {
      "Cost and Time Efficiency":
        "Compared to traditional degree programs, bootcamps are relatively shorter in duration and more cost-effective.",
    },
  ];
  const handleClick = (e) => {
    const { id } = e.target;
    return navigate(`/bootcamp/${id}`);
  };
  return loading ? (
    <div className="loading">
      <LoadingLayout />
    </div>
  ) : (
    <Fragment>
      <div className="center-element box header">
        <h1 className="main-heading">
          Unlock Your{" "}
          <nav id="custom-text-decoration" style={{ backgroundColor: "red" }}>
            Learning Potential
          </nav>
          : Redefine Your Skills and Fuel Success with{" "}
          <nav
            id="custom-text-decoration"
            style={{ backgroundColor: "yellow" }}
          >
            Dynamic Bootcamps!
          </nav>
        </h1>
        <img
          className="title-img"
          src="/landing_img.png"
          alt=""
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <h1 className="label">Explore Top Bootcamps</h1>
      <div className="bootcamps-container box center-element">
        {bootcamps.data?.map((bootcamp, key) => (
          key<4 && <div
            className="bootcamp"
            id={bootcamp.id}
            onClick={handleClick}
            key={bootcamp.id}
          >
            <div className="click" id={bootcamp.id} />
            <CardMedia
              sx={{ height: "300px", width: "100%" }}
              image={`/uploads/${bootcamp.photo}`}
              title={bootcamp.name}
            />
            <div className="card-content">
              <h2>{bootcamp.name}</h2>
              <nav className="cost-rating-conatiner center-element">
                <span>CA${bootcamp.averageCost}</span>
                <Rating
                  name="half-rating-read"
                  defaultValue={(bootcamp.averageRating * 5) / 10}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </nav>
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <h1 className="label">Benefits of Bootcamps</h1>
      <div className="box benefits-container">
        {bootcampsBenefits.map((item, key) => (
          <div key={key} className="item">
            <h2>{Object.keys(item)}</h2>
            <br />
            <p>{Object.values(item)}</p>
          </div>
        ))}
      </div>

    </Fragment>
  );
};

Landing.propTypes = {
  getBootcamps: PropTypes.func.isRequired,
  bootcamp: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
  user: state.user
});

export default connect(mapStateToProps, { getBootcamps, getUsers })(Landing);
