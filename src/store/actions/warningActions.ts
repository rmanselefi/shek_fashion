import firebase from "../../config/firebase";

import Warning from "../../models/warning";

export const registerWarning = (warning: Warning) => {
  return async (dispatch: any, getState: any): Promise<Warning | null> => {
    // const fb = getFirebase();
    var resp = await firebase.firestore().collection("warning").add({
      licensenumber: warning.licensenumber,
      text: warning.text,
      date: warning.date,
    });
    if (resp != null) {
      return warning;
    } else {
      return null;
    }
  };
};

export const updateWarning = (warning: Warning) => {
  return async (dispatch: any, getState: any): Promise<Warning | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("warning")
      .doc(warning.id)
      .update({
        licensenumber: warning.licensenumber,
        text: warning.text,

        date: warning.date,
      });
    if (resp != null) {
      return warning;
    } else {
      return null;
    }
  };
};

export const deleteWarning = (warningId: string) => {
  return async (dispatch: any, getState: any): Promise<string | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("warning")
      .doc(warningId)
      .delete();
    if (resp != null) {
      return warningId;
    } else {
      return null;
    }
  };
};
