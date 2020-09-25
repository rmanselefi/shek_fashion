import {
  ExtendedFirebaseInstance,
  ExtendedAuthInstance,
  ExtendedStorageInstance,
} from "react-redux-firebase";
import firebase from "../../config/firebase";

import { User } from "../../models/user";

export const signIn = (credentials: User) => {
  return async (dispatch: any, getState: any): Promise<User | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);
    if (resp.user != null) {
      return credentials;
    } else {
      return null;
    }
  };
};

export const signout = () => {
  return (
    dispatch: any,
    getState: any,
    {
      auth,
    }: ExtendedFirebaseInstance & ExtendedAuthInstance & ExtendedStorageInstance
  ) => {
    // const fb = getFirebase();
    auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT" });
      });
  };
};

// Signup
export const signup = (user: User) => {
  return async (dispatch: any, getState: any): Promise<User | null> => {
    console.log("useruseruseruseruser", user);
    // const fb = getFirebase();
    const resp = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    if (resp.user != null) {
      firebase
        .firestore()
        .collection("users")
        .doc(resp.user!.uid)
        .set({
          role: "admin",
        })
        .then((resp) => {
          dispatch({ type: "SIGNUP_SUCCESS" });
        })
        .catch((err) => {
          dispatch({ type: "SIGUP_ERROR" });
        });
      return user;
    } else {
      dispatch({ type: "SIGUP_ERROR" });
      return null;
    }
  };
};

export const signOut = () => {
  return async (dispatch: any, getState: any) => {
    await firebase.auth().signOut();
  };
};
