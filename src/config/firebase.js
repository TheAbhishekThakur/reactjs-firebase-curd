import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaMkycPzR7GklidZb5T-rW5T5kteuLOBs",
  authDomain: "react-firebase-curd-cae28.firebaseapp.com",
  projectId: "react-firebase-curd-cae28",
  storageBucket: "react-firebase-curd-cae28.appspot.com",
  messagingSenderId: "743575067372",
  appId: "1:743575067372:web:d2ef13b99cf45080c323c9",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
