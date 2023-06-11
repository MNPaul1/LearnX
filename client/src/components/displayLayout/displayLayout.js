import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBootcampById } from "../../actions/bootcamp";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const DisplayLayout = ({ getBootcampById, auth, bootcamp:{bootcamp, loading} }) => {
  const { id } = useParams();
  useEffect(() => {
    getBootcampById(id);
  }, [getBootcampById, id]);

  return loading ? <div className="loading"><CircularProgress /></div> : <div>bootcamp</div>;
};

DisplayLayout.propTypes = {
  getBootcampById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  bootcamp: state.bootcamp,
});

export default connect(mapStateToProps, { getBootcampById })(DisplayLayout);
