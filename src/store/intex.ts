import { combineReducers, createStore } from "redux";
import { firebaseReducer } from "react-redux-firebase";

// Add firebase to reducers
const initialState = {};
const rootReducer = combineReducers({
  firebase: firebaseReducer,
});
