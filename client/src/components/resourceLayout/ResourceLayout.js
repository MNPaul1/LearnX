import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBootcamps } from "../../actions/bootcamp";
import CardMedia from "@mui/material/CardMedia";
import "./resourceLayout.css";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {CircularProgress} from "@mui/material";
const ResourceLayout = ({
  getBootcamps,
  auth,
  bootcamp: { bootcamps, loading },
}) => {
  useEffect(() => {
    getBootcamps();
  }, [getBootcamps]);
  const navigate = useNavigate();
  const handleClick = (e) => {
    const { id } = e.target;
    return navigate(`/bootcamp/${id}`);
  };
  return loading ? (
    <div className="loading">
      <CircularProgress />
    </div>
  ) : (
    <div className="section">
      {bootcamps.data?.map((bootcamp) => (
        <div
          key={bootcamp.id}
          id={bootcamp.id}
          className="resource-container"
          onClick={handleClick}
        >
          <div className="click" id={bootcamp.id}></div>
          <CardMedia
            component="img"
            sx={{ height: "100%", width: "50%", borderRadius: "15px" }}
            image={`/uploads/${bootcamp.photo}`}
            alt={bootcamp.name}
          />

          <div className="resource-info">
            <h2 className="resource-title">{bootcamp.name}</h2>
            <span className="careers">
              Careers:
              {bootcamp.careers?.map((career, key) => (
                <span key={key}> {career} | </span>
              ))}
            </span>
            <p className="description">{bootcamp.description}</p>
            <Rating name="half-rating-read" defaultValue={(bootcamp.averageRating*5)/10} precision={0.5} size="small" readOnly />
            <h3 className="resource-cost">CA${bootcamp.averageCost}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

ResourceLayout.propTypes = {
  getBootcamps: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getBootcamps })(ResourceLayout);