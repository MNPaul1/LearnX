import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./review.css";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { deleteReview } from "../../actions/review";
import { Box, Rating } from "@mui/material";
const AllReviews = ({ review: { reviews }, user: { users }, deleteReview }) => {
  const navigate = useNavigate();
  const getUser = (id) => {
    const user = users.data.filter((user) => user._id === id);
    return user[0].name;
  };
  const handleDelete = (e) =>{
    const {id} = e.target;
    deleteReview(id)
    navigate('/bootcamps')
  }
  return (
    <div className="section">
      {reviews.data?.map((review) => (
        <div key={review._id} className="resource-container review-container">
          <CreateIcon
            className="edit-btn"
            onClick={() => navigate(`/review/${review._id}`)}
          />
        <DeleteIcon className="delete-btn" id={review._id} onClick={handleDelete} />
          <h1>{review.title}</h1>
          <Box
          sx={{
            display:"flex",
            flexDirection:'row',
            alignItems:'center'
          }}>
            <span><b>{(review.rating * 5) / 10}</b></span>
          <Rating
              name="half-rating-read"
              defaultValue={(review.rating * 5) / 10}
              precision={0.5}
              size="small"
              readOnly
            />
          </Box>
          <p>{review.text}</p>
          <h5>Author: {getUser(review.user)}</h5>
          <span>
            {new Date().getMonth(review.createdAt)}/
            {new Date().getFullYear(review.createdAt)}
          </span>
        </div>
      ))}
    </div>
  );
};

AllReviews.propTypes = {
  review: PropTypes.object.isRequired,
  deleteReview: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
  user: state.user,
});

export default connect(mapStateToProps, {deleteReview})(AllReviews);
