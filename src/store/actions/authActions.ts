import {
  ExtendedFirebaseInstance,
  ExtendedAuthInstance,
  ExtendedStorageInstance,
} from "react-redux-firebase";
import firebase from "../../config/firebase";

import { User } from "../../models/user";

export const signIn = (credentials: User) => {
  return async (dispatch: any, getState: any): Promise<User | null> => {
    try {
      var resp = await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      if (resp.user != null) {
        return credentials;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
    // const fb = getFirebase();
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
    try {
      let originalUser = firebase.auth().currentUser;
      const resp = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      await firebase.auth().updateCurrentUser(originalUser);
      if (resp.user != null) {
        firebase
          .firestore()
          .collection("users")
          .doc(resp.user!.uid)
          .set({
            name: user.name,
            email: user.email,
            role: user.role,
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
    } catch (error) {
      return null;
    }
  };
};

export const signOut = () => {
  return async (dispatch: any, getState: any) => {
    await firebase.auth().signOut();
  };
};
