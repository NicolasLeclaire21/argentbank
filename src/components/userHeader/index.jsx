import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUsername } from "../../store/store";
import { editName } from "../../store/store";
import './userHeader.css'

function UserHeader() {
      const firstName = useSelector((state) => state.auth.firstName);
      const lastName = useSelector((state) => state.auth.lastName);
      const userName = useSelector((state) => state.auth.userName);
      const isNameEdited = useSelector((state) => state.isNameEdited);
  const dispatch = useDispatch();


  return (
   <div className="header">
      <h1>Welcome back</h1>
      {isNameEdited ? (
         <div>
            <div className="input-name-wrapper">
               <div className="input-name">
                  <p className="name">User name: </p>
                  <input
                     className="input"
                     type="text"
                     id="username"
                     defaultValue={userName}
                  />
               </div>
               <div className="input-name">
                  <p className="name">First name: </p>
                  <input
                     className="input"
                     type="text"
                     id="firstname"
                     Value={firstName}
                     readOnly
                  />
               </div>
               <div className="input-name">
                  <p className="name">Last name: </p>
                  <input
                     className="input"
                     type="text"
                     id="lastname"
                     Value={lastName}
                     readOnly
                  />
               </div>
            </div>
            <div className="button_wrapper">
            <button 
               className="edit-button" 
               onClick={() => {
                  dispatch(changeUsername());
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
            <h1> { firstName + ' ' + lastName + '!'} </h1>
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