import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getReviewById } from "../../actions/review";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { updateReview } from "../../actions/review";
function UpdateReview({ getReviewById, review: { current_review, loading }, updateReview }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: " ",
    text: " ",
    rating: 0,
  });
  const { title, text, rating } = formData;
  useEffect(() => {
    getReviewById(id);
  }, [getReviewById, id]);
  useEffect(() => {
    if (!loading) {
      setFormData({
        title: current_review?.data?.title,
        text: current_review?.data?.text,
        rating: current_review?.data?.rating,
      });
    }
  }, [current_review, loading]);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateReview(id, formData);
    navigate('/bootcamps')
  };
  const onChange = (e) => {
    let { name, value } = e.target;
    if (name === "rating") {
      value = (parseFloat(value) * 10) / 5;
    }
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="outer-container">
      <form
        className="container createbootcamp-container"
        onSubmit={handleSubmit}
      >
        <h1 style={{ textAlign: "center" }}>UPDATE REVIEW</h1>
        <TextField
          type="name"
          name="title"
          id="filled-basic"
          label="Title"
          variant="filled"
          value={title}
          onChange={onChange}
          required
        />
        <TextField
          type="number"
          name="rating"
          id="filled-basic"
          label="Rating"
          variant="filled"
          value={(rating * 5) / 10}
          onChange={onChange}
          InputProps={{ inputProps: { min: 0, max: 5 } }}
          required
        />
        <TextField
          id="filled-multiline-static"
          label="Comment"
          name="text"
          multiline
          sx={{ height: "fit-content" }}
          rows={4}
          value={text}
          variant="standard"
          onChange={onChange}
          required
        />

        <Button className="btn" type="submit" variant="contained">
          Update Review
        </Button>
      </form>
    </div>
  );
}

UpdateReview.propTypes = {
  getReviewById: PropTypes.func.isRequired,
  updateReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
});

export default connect(mapStateToProps, { getReviewById, updateReview })(UpdateReview);
