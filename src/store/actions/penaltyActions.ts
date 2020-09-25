import firebase from "../../config/firebase";

import { Penalty } from "../../models/penalty";

export const registerPenalty = (penalty: Penalty) => {
  return async (dispatch: any, getState: any): Promise<Penalty | null> => {
    // const fb = getFirebase();
    var resp = await firebase.firestore().collection("penalty").add({
      vehicletype: penalty.vehicletype,
      licensenumber: penalty.licensenumber,
      erken: penalty.erken,
      penaltycode: penalty.penaltycode,
      date: penalty.date,
    });
    if (resp != null) {
      return penalty;
    } else {
      return null;
    }
  };
};

export const updatePenalty = (penalty: Penalty) => {
  return async (dispatch: any, getState: any): Promise<Penalty | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("penalty")
      .doc(penalty.id)
      .update({
        vehicletype: penalty.vehicletype,
        licensenumber: penalty.licensenumber,
        erken: penalty.erken,
        penaltycode: penalty.penaltycode,
        date: penalty.date,
      });
    if (resp != null) {
      return penalty;
    } else {
      return null;
    }
  };
};

export const deletePenalty = (penaltyId: string) => {
  return async (dispatch: any, getState: any): Promise<string | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("penalty")
      .doc(penaltyId)
      .delete();
    if (resp != null) {
      return penaltyId;
    } else {
      return null;
    }
  };
};
