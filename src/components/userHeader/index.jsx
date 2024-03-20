import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../../app/store";
import { editName } from "../../app/store";

function UserHeader() {
      const firstName = useSelector((state) => state.auth.firstName);
      const lastName = useSelector((state) => state.auth.lastName);
      const userName = useSelector((state) => state.auth.userName);
      const isLoggedIn = useSelector((state) => state.isLoggedIn);
      const isNameEdited = useSelector((state) => state.isNameEdited);
  const dispatch = useDispatch();


  return (
   <div className="welcome_wrapper">
      <h1 className="welcome_text">Welcome back</h1>
      {isNameEdited ? (
         <div>
            <div className="input_name_wrapper">
               <input
                  className="input_name"
                  type="text"
                  id="username"
                  defaultValue={userName}
               />
               <input
                  className="input_name"
                  type="text"
                  id="firstname"
                  Value={firstName}
                  readOnly
               />
               <input
                  className="input_name"
                  type="text"
                  id="lastname"
                  Value={lastName}
                  readOnly
               />
            </div>
            <div className="button_wrapper">
            <button 
               className="edit-button" 
               onClick={() => {
                  dispatch(changeName());
                  dispatch(editName());
               }}
               >
               Save
            </button>
               <button className="edit-button"               
               onClick={() => dispatch(editName())}
               >
                Cancel
              </button>
            </div>
         </div>
      ) : (
         <div>
            <h1 className="name_text">
               { firstName + ' ' + lastName + '!'}
            </h1>
            <button
              className="edit-button"
              onClick={() => dispatch(editName())}
            >
              Edit Name
            </button>
         </div>
      )}
   </div>
  )
}


export default UserHeader;