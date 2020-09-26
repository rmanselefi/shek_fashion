import firebase from "../../config/firebase";

import { Driver } from "../../models/driver";

export const registerDriver = (driver: Driver) => {
  return async (dispatch: any, getState: any): Promise<Driver | null> => {
    let statusRef = await firebase
      .firestore()
      .collection("status")
      .doc(driver.status)
      .get();
    var statusname = statusRef.data()!.status_name;

    var status = {
      id: driver.status,
      name: statusname,
    };

    var resp = await firebase.firestore().collection("driver").add({
      name: driver.name,
      licensenumber: driver.licensenumber,
      gender: driver.gender,
      issued_date: driver.issuedat,
      expiry_date: driver.expirydate,
      phone_number: driver.phonenumber,
      birthdate: driver.birthdate,
      region: driver.region,
      subcity: driver.subcity,
      kebele: driver.kebele,
      housenumber: driver.housenumber,
      status,
    });
    if (resp != null) {
      return driver;
    } else {
      return null;
    }
  };
};

export const updateDriver = (driver: Driver) => {
  return async (dispatch: any, getState: any): Promise<Driver | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("driver")
      .doc(driver.id)
      .update({
        name: driver.name,
        licensenumber: driver.licensenumber,
        gender: driver.gender,
        issued_date: driver.issuedat,
        expiry_date: driver.expirydate,
        phone_number: driver.phonenumber,
        birthdate: driver.birthdate,
        region: driver.region,
        subcity: driver.subcity,
        kebele: driver.kebele,
        housenumber: driver.housenumber,
      });
    if (resp != null) {
      return driver;
    } else {
      return null;
    }
  };
};

export const deleteDriver = (driverId: string) => {
  return async (dispatch: any, getState: any): Promise<string | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("driver")
      .doc(driverId)
      .delete();
    if (resp != null) {
      return driverId;
    } else {
      return null;
    }
  };
};
