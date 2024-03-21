import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


// --------------- STATE INITIALIZATION ---------------

const initialState = {
   auth: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      userName: '', // Nouvelle donnée
      token: ''
   },
   isLoggedIn: false,
   hasLoginFailed: false,
   isNameEdited: false
};


// --------------- ACTIONS ---------------

export function loginAction(navigate) {
   return (dispatch) => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const body = JSON.stringify({ 'email': email, 'password': password });

      // Post on /user/login to get the token
      fetch('http://localhost:3001/api/v1/user/login', {
         body: body,
         headers : { 'Content-Type': 'application/json' },
         method: "POST"
      })
      .then(response => {
         if (response.ok) {
            return response.json();
         }
      })
      .then(response => {
         const token = response.body.token;
         // Post on /user/profile to get user data with the found token
         fetch("http://localhost:3001/api/v1/user/profile", {
            headers: {
               'Authorization': 'Bearer' + response.body.token,
               'Content-Type': 'application/json'
            },
            method: "POST"
         })
         .then(response => {
            if (response.ok) {
               return response.json();
            }
         })
         .then(response => {
            dispatch(loginSuccessAction(response.body, token));
            navigate("/profile");
         })
         .catch(function(error) {
            dispatch(loginFailureAction(error));
         })
      })
      .catch(function(error) {
         dispatch(loginFailureAction(error));
      })
   }
}

export function loginSuccessAction(body, token) {
   localStorage.setItem('id', body.id);
   localStorage.setItem('email', body.email);
   localStorage.setItem('firstName', body.firstName);
   localStorage.setItem('lastName', body.lastName);
   localStorage.setItem('userName', body.userName); // Nouvelle donnée
   localStorage.setItem('token', token);
   return {
      type: "LOGIN_SUCCESS_ACTION",
      payload: { body, token }
   }
}

export function loginFailureAction(error) {
   console.log("Error at fetch:", error.message);
   return {
      type: "LOGIN_FAILURE_ACTION"
   }
}

export function logoutAction() {
   localStorage.clear();
   return {
      type: "LOGOUT_ACTION"
   }
}

export function editNamesAction() {
   return {
      type: "EDIT_NAMES_ACTION"
   }
}

export function changeUsername() {
   return (dispatch) => {

      const firstName = document.getElementById('firstname').value;
      const lastName = document.getElementById('lastname').value;
      const userName = document.getElementById('username').value; // Nouvelle donnée
      const body = JSON.stringify({ 'firstName': firstName, 'lastName': lastName, 'userName': userName }); // Nouvelle donnée
      const token = localStorage.getItem('token');

      // Put on /user/profile to update the user names
      fetch("http://localhost:3001/api/v1/user/profile", {
         body: body,
         headers: {
            'Authorization': 'Bearer' + token,
            'Content-Type': 'application/json'
         },
         method: "PUT"
      })
      .then(response => {
         if (response.ok) {
            return response.json();
         }
      })
      .then(data => {
         dispatch({
            type: "CHANGE_NAMES_ACTION",
            payload: { firstName, lastName, userName } // Nouvelle donnée
         })
         localStorage.setItem('firstName', firstName);
         localStorage.setItem('lastName', lastName);
         localStorage.setItem('userName', userName); // Nouvelle donnée
      })
      .catch(function(error) {
         console.log("Error at fetch:" + error.message);
      })
   }
}


// --------------- REDUCER ---------------

function reducer(state = initialState, action) {
   switch (action.type) {
      case "LOGIN_SUCCESS_ACTION": {
         return {
            ...state,
            auth: {
               ...state.auth,
               id: action.payload.body.id,
               email: action.payload.body.email,
               firstName: action.payload.body.firstName,
               lastName: action.payload.body.lastName,
               userName: action.payload.body.userName, // Nouvelle donnée
               token: action.payload.token,
            },
            isLoggedIn: true,
            hasLoginFailed: false
         }
      }
      case "LOGIN_FAILURE_ACTION": {
         return {
            ...state,
            hasLoginFailed: true
         }
      }
      case "LOGOUT_ACTION": {
         return initialState
      }
      case "EDIT_NAMES_ACTION": {
         return {
            ...state,
            isNameEdited: !state.isNameEdited
         }
      }
      case "CHANGE_NAMES_ACTION": {
         return {
            ...state,
            auth: {
               ...state.auth,
               firstName: action.payload.firstName,
               lastName: action.payload.lastName,
               userName: action.payload.userName // Nouvelle donnée
            }
         }
      }
      default:
         return state
   }
}

// To stay logged in when page refresh
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
   reducer: persistedReducer, 
   middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
   }),
})

export const persistor = persistStore(store)