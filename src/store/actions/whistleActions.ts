import firebase from "../../config/firebase";

import { Whistle } from "../../models/whistle";

export const registerWhistle = (whistle: Whistle) => {
  return async (dispatch: any, getState: any): Promise<Whistle | null> => {
    // const fb = getFirebase();
    var resp = await firebase.firestore().collection("whistle").add({
      vehicletype: whistle.vehicletype,
      licensenumber: whistle.licensenumber,
      erken: whistle.erken,
      penaltycode: whistle.penaltycode,
      date: whistle.date,
      hour: whistle.hour,
    });
    if (resp != null) {
      return whistle;
    } else {
      return null;
    }
  };
};

export const updateWhistle = (whistle: Whistle) => {
  return async (dispatch: any, getState: any): Promise<Whistle | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("penalty")
      .doc(whistle.id)
      .update({
        vehicletype: whistle.vehicletype,
        licensenumber: whistle.licensenumber,
        erken: whistle.erken,
        penaltycode: whistle.penaltycode,
        date: whistle.date,
        hour: whistle.hour,
      });
    if (resp != null) {
      return whistle;
    } else {
      return null;
    }
  };
};

export const deleteWhistle = (whistleId: string) => {
  return async (dispatch: any, getState: any): Promise<string | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("penalty")
      .doc(whistleId)
      .delete();
    if (resp != null) {
      return whistleId;
    } else {
      return null;
    }
  };
};
