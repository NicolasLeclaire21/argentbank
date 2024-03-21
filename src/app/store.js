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
      userName: '',
      token: ''
   },
   isLoggedIn: false,
   hasLoginFailed: false,
   isNameEdited: false
};

// --------------- ACTIONS ---------------

export function login(navigate) {
   return (dispatch) => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const body = JSON.stringify({ 'email': email, 'password': password });

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
         // POST pour obtenir la data utilisateur une fois connecté
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
            dispatch(loginSuccess(response.body, token));
            navigate("/profile");
         })
         .catch(function(error) {
            dispatch(loginFail(error));
         })
      })
      .catch(function(error) {
         dispatch(loginFail(error));
      })
   }
}

export function loginSuccess(body, token) {
   localStorage.setItem('id', body.id);
   localStorage.setItem('email', body.email);
   localStorage.setItem('firstName', body.firstName);
   localStorage.setItem('lastName', body.lastName);
   localStorage.setItem('userName', body.userName);
   localStorage.setItem('token', token);
   return {
      type: "LOGIN_SUCCESS",
      payload: { body, token }
   }
}

export function loginFail(error) {
   console.log("Error :", error.message);
   return {
      type: "LOGIN_FAIL"
   }
}

export function logout() {
   localStorage.clear();
   return {
      type: "LOGOUT"
   }
}

export function editName() {
   return {
      type: "EDIT_NAME"
   }
}

export function changeUsername() {
   return (dispatch) => {

      const userName = document.getElementById('username').value;
      const body = JSON.stringify({ 'userName': userName });
      const token = localStorage.getItem('token');

      // Update du username
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
            type: "CHANGE_NAME",
            payload: { userName } 
         })
         localStorage.setItem('userName', userName);
      })
      .catch(function(error) {
         console.log("Error at fetch:" + error.message);
      })
   }
}


// --------------- REDUCER ---------------

function reducer(state = initialState, action) {
   switch (action.type) {
      case "LOGIN_SUCCESS": {
         return {
            ...state,
            auth: {
               ...state.auth,
               id: action.payload.body.id,
               email: action.payload.body.email,
               firstName: action.payload.body.firstName,
               lastName: action.payload.body.lastName,
               userName: action.payload.body.userName,
               token: action.payload.token,
            },
            isLoggedIn: true,
            hasLoginFailed: false
         }
      }
      case "LOGIN_FAIL": {
         return {
            ...state,
            hasLoginFailed: true
         }
      }
      case "LOGOUT": {
         return initialState
      }
      case "EDIT_NAME": {
         return {
            ...state,
            isNameEdited: !state.isNameEdited
         }
      }
      case "CHANGE_NAME": {
         return {
            ...state,
            auth: {
               ...state.auth,
               userName: action.payload.userName
            }
         }
      }
      default:
         return state
   }
}

// Rester connecter quand la page refresh
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