// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhNKyIV0wObAxaf79vutRS2rDfUWPIrj8",
  authDomain: "react-firebase-cc519.firebaseapp.com",
  projectId: "react-firebase-cc519",
  storageBucket: "react-firebase-cc519.appspot.com",
  messagingSenderId: "216942231144",
  appId: "1:216942231144:web:93093d75fb7f9a935e45dd",
  measurementId: "G-EWT2GE41KB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);