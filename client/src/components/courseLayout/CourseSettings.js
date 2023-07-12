import React, {useState} from 'react'
import UpdateCourse from './UpdateCourse'
import DeleteCourse from './DeleteCourse'

function CourseSettings() {
    const [currentContent, setContent] = useState("updateCourse")
    return (
      <div className='bootcamp-settings'>
        <div className="sidebar">
          <button onClick={()=> setContent("updateCourse")}>Update Course</button>
          <button onClick={() => setContent("deleteCourse")}>Delete Course</button>
        </div>
        <div className="content-container">
        {currentContent==="updateCourse" && <UpdateCourse />}
        {currentContent==="deleteCourse" && <DeleteCourse />}

        </div>
      </div>
    )
}

export default CourseSettings