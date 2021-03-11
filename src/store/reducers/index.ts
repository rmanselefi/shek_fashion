import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import productReducer from './productReducer'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  product:productReducer
});

export default rootReducer;
