import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyC_yYn2Lneqo5IaZTU-NLzpHdlCeEQ27uA",
  authDomain: "trafficpenalty-79dcb.firebaseapp.com",
  databaseURL: "https://trafficpenalty-79dcb.firebaseio.com",
  projectId: "trafficpenalty-79dcb",
  storageBucket: "trafficpenalty-79dcb.appspot.com",
  messagingSenderId: "965442786475",
  appId: "1:965442786475:web:934ec62239585e63ee53ee",
  measurementId: "G-HR493BBCF1",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.storage();
export default firebase;
