import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBootcamps } from "../../actions/bootcamp";
import "./resourceLayout.css";
import { Box, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingLayout from "../layout/loadingLayout";
const ResourceLayout = ({
  getBootcamps,
  auth: { user },
  bootcamp: { bootcamps },
}) => {
  useEffect(() => {
    getBootcamps();
  }, [getBootcamps]);
  const navigate = useNavigate();
  const handleClick = (e) => {
    const { id } = e.target;
    return navigate(`/bootcamp/${id}`);
  };
  const { role } = user.data;
  return bootcamps === null ? (
    <div className="loading">
      <LoadingLayout />
    </div>
  ) : (
    <div className="section">
      {bootcamps.data?.map((bootcamp) => {
        if (bootcamp.courses.length === 0 && role !== "admin") {
          return null;
        } else {
          return (
            <div
              key={bootcamp.id}
              id={bootcamp.id}
              className="resource-container"
              onClick={handleClick}
            >
              <div className="click" id={bootcamp.id}></div>
              <img
                style={{ height: "100%", width: "50%", borderRadius: "15px" }}
                src={`/uploads/${bootcamp.photo}`}
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
                <p className="description">
                  {bootcamp.description.slice(0, 120)}
                  {+bootcamp.description.length > 120 ? "..." : "."}
                </p>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {parseFloat(((bootcamp.averageRating * 5) / 10).toFixed(2))}
                  <Rating
                    name="half-rating-read"
                    defaultValue={(bootcamp.averageRating * 5) / 10}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </Box>
                <h3 className="resource-cost">CA${bootcamp.averageCost}</h3>
              </div>
            </div>
          );
        }
      })}
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
