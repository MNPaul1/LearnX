import React, {useState} from 'react'
import "./bootcampSettings.css"
import UpdateBootcamp from './UpdateBootcamp'
import DeleteBootcamp from './DeleteBootcamp'
import UploadPhoto from './UploadPhoto'
import AddCourse from '../courseLayout/AddCourse'
import { Button } from '@mui/material'
function BootcampSettings() {
  const [currentContent, setContent] = useState("updateBootcamp")
  return (
    <div className='bootcamp-settings'>
      <div className="sidebar">
        <Button className="btn" variant="outlined" onClick={()=> setContent("updateBootcamp")}>Update Bootcamp</Button>
        <Button className="btn" variant="outlined" onClick={()=> setContent("addCourse")}>Add Course</Button>
        <Button className="btn" variant="outlined" onClick={() => setContent("uploadPhoto")}>Upload Photo</Button>
        <Button className="btn" variant="outlined" onClick={() => setContent("deleteBootcamp")}>Delete Bootcamp</Button>
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