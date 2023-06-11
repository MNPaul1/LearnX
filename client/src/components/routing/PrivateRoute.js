import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  if (isAuthenticated && !loading) {
    return <Component type={rest.type}/>;
  }
  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
