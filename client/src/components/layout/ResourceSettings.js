import React, {useState, Fragment} from 'react'
import { useMatch } from 'react-router-dom'
import DeleteBootcamp from '../bootcampLayout/DeleteBootcamp'
import UploadPhoto from '../bootcampLayout/UploadPhoto'
import AddCourse from '../courseLayout/AddCourse'
import { Button } from '@mui/material'
import CreateBootcamp from '../bootcampLayout/CreateBootcamp'
import DeleteCourse from "../courseLayout/DeleteCourse";
import "./resourceSettings.css"
function ResourceSettings() {
    const isBootcampSettings = useMatch("/bootcamp-settings/:id")
    const [currentContent, setContent] = useState("update")
  return (
    <div className='resource-settings'>
      <div className="sidebar">
        {isBootcampSettings && <Fragment>
        <Button className="btn" variant="outlined" onClick={()=> setContent("update")}>Update Bootcamp</Button>
        <Button className="btn" variant="outlined" onClick={()=> setContent("addCourse")}>Add Course</Button>
        <Button className="btn" variant="outlined" onClick={() => setContent("uploadPhoto")}>Upload Photo</Button>
        <Button className="btn" variant="outlined" onClick={() => setContent("delete")}>Delete Bootcamp</Button>
        </Fragment>}
        {!isBootcampSettings && <Fragment>
        <Button className="btn" variant="outlined" onClick={() => setContent("update")}>Update Course</Button>
        <Button className="btn" variant="outlined" onClick={() => setContent("delete")}>Delete Course</Button>
        </Fragment>}
      </div>
      <div className="content-container">
      {isBootcampSettings &&<Fragment>
        {currentContent==="update" && <CreateBootcamp />}
        {currentContent==="addCourse" && <AddCourse />}
        {currentContent==="uploadPhoto" && <UploadPhoto />}
        {currentContent==="delete" && <DeleteBootcamp />}
      </Fragment>
      }
      {!isBootcampSettings && <Fragment>
        {currentContent === "update" && <AddCourse />}
        {currentContent === "delete" && <DeleteCourse />}
      </Fragment>}
      </div>
    </div>
  )
}

export default ResourceSettings