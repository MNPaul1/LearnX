import React, { useState } from "react";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";
import { Button } from "@mui/material";

function CourseSettings() {
  document.title = "LearnX - Update Course";
  const [currentContent, setContent] = useState("updateCourse");
  return (
    <div className="bootcamp-settings">
      <div className="sidebar">
        <Button className="btn" variant="outlined" onClick={() => setContent("updateCourse")}>
          Update Course
        </Button>
        <Button className="btn" variant="outlined" onClick={() => setContent("deleteCourse")}>
          Delete Course
        </Button>
      </div>
      <div className="content-container">
        {currentContent === "updateCourse" && <UpdateCourse />}
        {currentContent === "deleteCourse" && <DeleteCourse />}
      </div>
    </div>
  );
}

export default CourseSettings;
