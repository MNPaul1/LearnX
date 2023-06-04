import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert as AlertMui } from "@mui/material";
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <AlertMui variant="filled"
      key={alert.id}
      severity={alert.alertType}
      sx={{ width: "40%", margin: "auto", padding: "auto", mb:'5px', fontSize:'small' }}
    >
      {alert.msg}
    </AlertMui>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
