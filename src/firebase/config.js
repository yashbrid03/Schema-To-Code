// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuhe48G8XFteIqNqd3b3swfL9tkhHa7oA",
  authDomain: "schema-to-code.firebaseapp.com",
  projectId: "schema-to-code",
  storageBucket: "schema-to-code.appspot.com",
  messagingSenderId: "405221973763",
  appId: "1:405221973763:web:cc65ccbc74808472771336",
  measurementId: "G-HFEM10X6FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const authentication = getAuth(app);
export const db = getFirestore(app);