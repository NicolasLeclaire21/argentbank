import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from 'redux';
import userReducer from "../reducers/user.reducer"

const rootReducer = combineReducers({
    userReducer // Ceci lie le reducer userReducer au champ userReducer dans le state global
  });


export const store = configureStore(
    {
        reducer: rootReducer
    }
)