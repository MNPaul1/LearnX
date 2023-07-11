import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import "./bootcampSettings.css"
import UpdateBootcamp from './UpdateBootcamp'
import DeleteBootcamp from './DeleteBootcamp'
import UploadPhoto from './UploadPhoto'
function BootcampSettings() {
  const [currentContent, setContent] = useState("updateBootcamp")
    const {id} = useParams()
  return (
    <div className='bootcamp-settings'>
      <div className="sidebar">
        <button onClick={()=> setContent("updateBootcamp")}>Update Bootcamp</button>
        <button onClick={() => setContent("uploadPhoto")}>Upload Photo</button>
        <button onClick={() => setContent("deleteBootcamp")}>Delete Bootcamp</button>
      </div>
      <div className="content-container">
        {currentContent==="updateBootcamp" && <UpdateBootcamp />}
        {currentContent==="uploadPhoto" && <UploadPhoto />}
        {currentContent==="deleteBootcamp" && <DeleteBootcamp />}
      </div>
    </div>
  )
}

export default BootcampSettings