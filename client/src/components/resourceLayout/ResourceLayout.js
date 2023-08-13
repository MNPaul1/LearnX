import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBootcamps } from "../../actions/bootcamp";
import "./resourceLayout.css";
import { Box, Rating } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingLayout from "../layout/loadingLayout";
import Pagination from "@mui/material/Pagination";

const ResourceLayout = ({ getBootcamps, bootcamp: { bootcamps, loading } }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let currentPage = Number(searchParams.get("page"));
  const [totalPages, setPages] = useState(0);
  useEffect(() => {
    document.title = "LearnX - All Bootcamps";
    getBootcamps(currentPage);
  }, [getBootcamps, currentPage]);
  useEffect(() => {
    if (bootcamps !== null && !loading) {
      setPages(Math.ceil(Number(bootcamps?.total) / 4));
    }
  }, [bootcamps, loading]);
  const handleClick = (e) => {
    const { id } = e.target;
    return navigate(`/bootcamp/${id}`);
  };

  const handlePagination = (e, v) => {
    setSearchParams({ page: v });
  };
  return bootcamps === null && loading ? (
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
      {bootcamps.data?.map((bootcamp) => {
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
                  value={(bootcamp.averageRating * 5) / 10}
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
      <p className="comment">Note: If no courses are included in the bootcamp, the bootcamp will be removed from the list.</p>
    </div>
  );
};

ResourceLayout.propTypes = {
  getBootcamps: PropTypes.func.isRequired,
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getBootcamps })(ResourceLayout);
