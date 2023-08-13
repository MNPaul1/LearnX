import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { getCourseById } from '../../actions/course'
import { useParams, useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import LoadingLayout from '../layout/loadingLayout'
import { deleteCourse } from '../../actions/course'
export const DeleteCourse = ({getCourseById, course: {current_course}, deleteCourse }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "LearnX - Delete Course"
    getCourseById(id);
  }, [getCourseById, id]);
const handleSubmit = (e) =>{
    e.preventDefault()
    deleteCourse(id)
    navigate("/courses")
}
  return current_course === null ? (
    <div className="loading">
      <LoadingLayout />
    </div>
  ) : (
    <div className="outer-container">
      <form className="container" onSubmit={handleSubmit}>
        <h1 id="heading">DELETE COURSE</h1>
        <TextField
          id="filled-read-only-input"
          label="Title"
          variant="filled"
          defaultValue={current_course.data.title}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="filled-multiline-static"
          multiline
          label="Description"
          variant="filled"
          defaultValue={current_course.data.description}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button className="btn " id="delete-btn" type="submit" variant="contained" color="error" >
          Delete
        </Button>
      </form>
    </div>
  );
}

DeleteCourse.propTypes = {
  getCourseById: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  deleteCourse: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course
})


export default connect(mapStateToProps, {getCourseById, deleteCourse})(DeleteCourse)