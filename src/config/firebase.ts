// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider}  from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZUqXo-0J9rthDo3HeU446rzF0PCxszEA",
  authDomain: "crudapp619.firebaseapp.com",
  projectId: "crudapp619",
  storageBucket: "crudapp619.appspot.com",
  messagingSenderId: "915176851478",
  appId: "1:915176851478:web:46fa6c5d06393fcc2e0d37", 
  measurementId: "G-QC2WMS1DZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth =getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);