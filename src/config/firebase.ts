import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export const firebaseConfig = {
   apiKey: "AIzaSyCy8kRd_9eb5YVzI61z9k74JBoilgUvTMw",
  authDomain: "shikfashion-7c89e.firebaseapp.com",
  projectId: "shikfashion-7c89e",
  storageBucket: "shikfashion-7c89e.appspot.com",
  messagingSenderId: "58912336944",
  appId: "1:58912336944:web:ea52e38bec61ff951591f5"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.storage();
export default firebase;
