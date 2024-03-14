import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../app/actions";

function UserHeader() {
  const user = useSelector((state) => state.userReducer.user);
  const [editName, setEditName] = useState(false);
  const [username, setUsername] = useState(user.username || "");
  const dispatch = useDispatch();

  const changeName = (e) => {
    e.preventDefault();
    const updatedUser = {
      firstName: "",
      lastName: "",
      userName: username
    };
    dispatch({
      type: "UPDATE_USER", 
     user: updatedUser});
    setEditName(false);
  };

  const cancel = (e) => {
    e.preventDefault();
    setEditName(false);
  };

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        <span className={editName ? "sr-only" : ""}>
          {user.firstName + " " + user.lastName + " !"}
        </span>
      </h1>
      <button
        className={"edit-button " + (editName ? "sr-only" : "")}
        onClick={() => setEditName(!editName)}
      >
        Edit Name
      </button>
      <form className={"edit-profile" + (editName ? "" : " sr-only")}>
        <div className="edit-username">
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />
        </div>
        <div className="edit-firstName">
          <input
            type="text"
            value={user.firstName}
            readOnly
          />
        </div>
        <div className="edit-lastName">
          <input
            type="text"
            value={user.lastName}
            readOnly 
          />
        </div>
        <button className="edit-button" onClick={(e) => changeName(e)}>
          Save
        </button>
        <button className="edit-button" onClick={(e) => cancel(e)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UserHeader;