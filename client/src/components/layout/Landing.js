import React, { Fragment, useEffect, useState } from "react";
import "./landing.css";
import CardMedia from "@mui/material/CardMedia";
import { connect } from "react-redux";
import { getBootcamps } from "../../actions/bootcamp";
import PropTypes from "prop-types";
import { Rating, Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../actions/user";
import LoadingLayout from "./loadingLayout";
import { sendMail } from "../../actions/mail";
import "../../utils/design.css";

const Landing = ({
  getBootcamps,
  bootcamp: { bootcamps, loading },
  getUsers,
  sendMail,
}) => {
  useEffect(() => {
    document.title = "LearnX - Home";

    getBootcamps();
    getUsers();
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { name, email, message } = formData;

  const onChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ name: "", email: "", message: "" });
    sendMail(formData)
  };

  return loading ? (
    <div className="loading">
      <LoadingLayout />
    </div>
  ) : (
    <Fragment>
      <div className="header">
        <img
          src="/logo_transparent.png"
          alt=""
          className="landing_img"
          width={200}
        />
        <h1>LearnX</h1>
        <p>
          Unlock Your Learning Potential : Redefine Your Skills and Fuel Success
          with Dynamic Bootcamps!
        </p>
      </div>
      <h1 className="label" id="heading-underline">
        Explore Top Bootcamps
      </h1>
      <div
        className="bootcamps-container box center-element"
        id="red-blue-yellow-bg"
      >
        {bootcamps.data?.map(
          (bootcamp, key) =>
            key < 4 && (
              <div
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {parseFloat(
                        ((bootcamp.averageRating * 5) / 10).toFixed(2)
                      )}
                      <Rating
                        name="half-rating-read"
                        defaultValue={(bootcamp.averageRating * 5) / 10}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                    </Box>
                  </nav>
                </div>
              </div>
            )
        )}
      </div>

      <h1 className="label" id="heading-underline">
        Benefits of Bootcamps
      </h1>
      <div className="box benefits-container" id="purple-green-bg">
        {bootcampsBenefits.map((item, key) => (
          <div key={key} className="item">
            <h2>{Object.keys(item)}</h2>
            <br />
            <p>{Object.values(item)}</p>
          </div>
        ))}
      </div>
      <h1 className="label" id="heading-underline">
        contact us
      </h1>
      <div className="container box" id="contact-us">
        <form onSubmit={handleSubmit}>
          <p id="heading">
            Bridge the Gap: Connect with Us Effortlessly through Our Contact
            Page
          </p>
          <TextField
            type="name"
            name="name"
            id="filled-basic"
            label="Name"
            variant="filled"
            value={name}
            onChange={onChange}
            required
          />
          <TextField
            type="email"
            name="email"
            id="filled-basic"
            label="Email"
            variant="filled"
            value={email}
            onChange={onChange}
            required
          />
          
          <TextField
            id="filled-multiline-static"
            label="Message"
            type="text"
            name="message"
            multiline
            rows={4}
            variant="filled"
            value={message}
            onChange={onChange}
            required
          />
          <Button className="btn" type="submit" variant="contained">
            SUBMIT
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  getBootcamps: PropTypes.func.isRequired,
  bootcamp: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  sendMail: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
  user: state.user,
});

export default connect(mapStateToProps, { getBootcamps, getUsers, sendMail })(Landing);
