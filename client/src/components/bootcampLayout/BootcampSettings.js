import React, {useState} from 'react'
import "./bootcampSettings.css"
import UpdateBootcamp from './UpdateBootcamp'
import DeleteBootcamp from './DeleteBootcamp'
import UploadPhoto from './UploadPhoto'
import AddCourse from '../courseLayout/AddCourse'
function BootcampSettings() {
  const [currentContent, setContent] = useState("updateBootcamp")
  return (
    <div className='bootcamp-settings'>
      <div className="sidebar">
        <button onClick={()=> setContent("updateBootcamp")}>Update Bootcamp</button>
        <button onClick={()=> setContent("addCourse")}>Add Course</button>
        <button onClick={() => setContent("uploadPhoto")}>Upload Photo</button>
        <button onClick={() => setContent("deleteBootcamp")}>Delete Bootcamp</button>
      </div>
      <div className="content-container">
        {currentContent==="updateBootcamp" && <UpdateBootcamp />}
        {currentContent==="addCourse" && <AddCourse />}
        {currentContent==="uploadPhoto" && <UploadPhoto />}
        {currentContent==="deleteBootcamp" && <DeleteBootcamp />}
      </div>
    </div>
  )
}

export default BootcampSettings