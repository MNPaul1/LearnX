import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBootcamps } from "../../actions/bootcamp";
import LoadingLayout from "../layout/loadingLayout";
import { Rating, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const MyBootcamps = ({
  getBootcamps,
  bootcamp: { bootcamps, loading },
  auth: { user },
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    getBootcamps();
  }, [getBootcamps]);

  const [myBootcamps, setMyBootcamps] = useState([]);
  useEffect(() => {
    if (bootcamps !== null && !loading) {
      setMyBootcamps(
        bootcamps?.data?.filter((bootcamp) => bootcamp.user === user.data._id)
      );
    }
  }, [bootcamps, loading, user]);

  const handleClick = (e) => {
    const { id } = e.target;
    return navigate(`/bootcamp/${id}`);
  };
  return bootcamps === null && loading ? (
    <div className="loading">
      <LoadingLayout />
    </div>
  ) : (
    <div className="section">
      {myBootcamps?.map((bootcamp) => {
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
      })}
      <p className="comment">
        Note: If no courses are included in the bootcamp, the bootcamp will be
        removed from the list.
      </p>
    </div>
  );
};

MyBootcamps.propTypes = {
  getBootcamps: PropTypes.func.isRequired,
  bootcamp: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
  auth: state.auth,
});

export default connect(mapStateToProps, { getBootcamps })(MyBootcamps);
