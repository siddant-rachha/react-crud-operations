// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTBoWj6xSdYtpF9rJp4F9PO7LTs9sorfs",
  authDomain: "crud-operations-react-a6583.firebaseapp.com",
  projectId: "crud-operations-react-a6583",
  storageBucket: "crud-operations-react-a6583.appspot.com",
  messagingSenderId: "731444480691",
  appId: "1:731444480691:web:44239bdacc6c2878223ec6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);