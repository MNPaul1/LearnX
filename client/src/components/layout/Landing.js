import React, { Fragment, useEffect } from "react";
import "./landing.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import { getBootcamps } from "../../actions/bootcamp";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const Landing = ({ getBootcamps, bootcamp: { bootcamps, loading } }) => {
  useEffect(() => {
    getBootcamps();
  }, [getBootcamps]);
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
  const handleClick = (e) =>{
    const {id} = e.target;
    return navigate(`/bootcamp/${id}`)
  }
  return (
    (loading ? <div className="loading"><CircularProgress /></div> : <Fragment>
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
          src="https://freepngimg.com/thumb/school/32760-6-students-learning-transparent.png"
          alt=""
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <h1 className="label">Explore Top Bootcamps</h1>
      <div className="bootcamps-container box center-element">
        {bootcamps.data?.map((bootcamp) => (
          <Card id={bootcamp.id} onClick={handleClick} key={bootcamp.id}>
          <Fragment className="click" id={bootcamp.id}></Fragment>
            <CardMedia
              sx={{ height: 250, backgroundSize:'cover' }}
              image={`/uploads/${bootcamp.photo}`}
              title={bootcamp.name}
            />
            <CardContent >
              <Typography gutterBottom variant="h5" component="div">
                {bootcamp.name}
              </Typography>
              <div className="cost-rating-conatiner center-element">
                <span>CA${bootcamp.averageCost}</span>
                  <Rating name="half-rating-read" defaultValue={(bootcamp.averageRating*5)/10} precision={0.5} size="small" readOnly />
              </div>
            </CardContent>
          </Card>
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
      <br />
      <br />
      <br />
      <br />
      <br />

      <footer id="footer" className="center-element">
        <h1>LearnX</h1>
        <p className="about">
          LearnX is a Bootcamp application where you find numerous bootcamps
          with different courses. Each bootcamp is beautifully described with
          all the major skills. Moreover, it streamlines access to course
          content
        </p>
        <nav>
          &copy; All Rights Reserved |{" "}
          <nav style={{ color: "skyblue", display: "inline-block" }}>
            Paul Industries
          </nav>
        </nav>
      </footer>
      <p className="credit">Design By - Mahan</p>
    </Fragment>)
  );
};

Landing.propTypes = {
  getBootcamps: PropTypes.func.isRequired,
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getBootcamps })(Landing);
