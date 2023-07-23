import React, {useState} from "react";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import { connect } from "react-redux";
import { Button } from "@mui/material";

function UserSettings({auth:{user}}) {
  document.title = "LearnX - Update User";
  const [currentContent, setContent] = useState("updateUser");
  return (
    <div className="bootcamp-settings">
      <div className="sidebar">
        <Button className="btn" variant="outlined" onClick={() => setContent("updateUser")}>Update User</Button>
        {user?.data.role==='admin'&&<Button className="btn" variant="outlined" onClick={() => setContent("deleteUser")}>Delete User</Button>}
      </div>
      <div className="content-container">
        {currentContent === "updateUser" && <UpdateUser />}
        {currentContent === "deleteUser" && <DeleteUser />}
      </div>
    </div>
  );
}
const mapStateToProps = state =>({
    auth: state.auth
})
export default connect(mapStateToProps)(UserSettings);
