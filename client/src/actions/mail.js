import axios from "axios";
import { setAlert } from "./alert";
import { MAIL_SENT, MAIL_SENT_ERROR } from "./types";

//send mail
export const sendMail = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/v1/sendEmail", formData, config);
    dispatch({
      type: MAIL_SENT,
      payload: res.data,
    });
    dispatch(setAlert("Message sent.", "success"));
  } catch (error) {
    dispatch(setAlert("Not sent.", "error"));
    dispatch({
      type: MAIL_SENT_ERROR,

    });
  }
};
