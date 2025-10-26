// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.goo
// gle.com/docs/web/setup#available-   libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv9myHktw7n4L2mqsx-_32XBF8Wv2Ff28",
  authDomain: "expense-tracker-996f2.firebaseapp.com",     
  projectId: "expense-tracker-996f2",
  storageBucket: "expense-tracker-996f2.firebasestorage.app",
  messagingSenderId: "334908573261",
  appId: "1:334908573261:web:901161ad8bf638a60bfe04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

//firebase login
//firebase init
//firebase deploy
