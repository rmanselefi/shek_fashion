import firebase from "../../config/firebase";
import Traffic from "../../models/traffic";

export const registerTraffic = (traffic: Traffic) => {
  return async (dispatch: any, getState: any): Promise<Traffic | null> => {
    // const fb = getFirebase();
    const resp = await firebase
      .auth()
      .createUserWithEmailAndPassword(traffic.email, traffic.password);
    if (resp.user != null) {
      await firebase.firestore().collection("traffic").doc(resp.user!.uid).set({
        name: traffic.name,
        level: traffic.level,
        idnum: traffic.idnum,
        role: "traffic",
      });

      return traffic;
    } else {
      dispatch({ type: "SIGUP_ERROR" });
      return null;
    }
  };
};

export const updateTraffic = (traffic: Traffic) => {
  return async (dispatch: any, getState: any): Promise<Traffic | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("traffic")
      .doc(traffic.id)
      .update({
        name: traffic.name,
        level: traffic.level,
        idnum: traffic.idnum,
      });
    if (resp != null) {
      return traffic;
    } else {
      return null;
    }
  };
};

export const deleteTraffic = (trafficId: string) => {
  return async (dispatch: any, getState: any): Promise<string | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("traffic")
      .doc(trafficId)
      .delete();
    if (resp != null) {
      return trafficId;
    } else {
      return null;
    }
  };
};
