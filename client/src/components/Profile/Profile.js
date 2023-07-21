import React, {useState} from "react";

import UpdateUser from "./UpdateUser";

function Profile() {
  document.title = "LearnX - Update User";
  const [currentContent, setContent] = useState("updateUser");
  return (
    <div className="bootcamp-settings">
      <div className="sidebar">
        <button onClick={() => setContent("updateUser")}>Update User</button>
        <button onClick={() => setContent("deleteUser")}>Delete User</button>
      </div>
      <div className="content-container">
        {currentContent === "updateUser" && <UpdateUser />}
        {/* {currentContent === "deleteCourse" && <DeleteCourse />} */}
      </div>
    </div>
  );
}

export default Profile;
