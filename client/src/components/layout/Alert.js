import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert as AlertMui, AlertTitle } from "@mui/material";
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <AlertMui variant="filled"
      key={alert.id}
      severity={alert.alertType}
      sx={{ width: "50%", margin: "auto", padding: "auto" }}
    >
      <AlertTitle>{alert.alertType.toUpperCase()}</AlertTitle>
      {alert.msg} <strong>check it out!</strong>
    </AlertMui>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
