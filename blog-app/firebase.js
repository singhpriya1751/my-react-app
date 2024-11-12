// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQLFXdJN5FC4C0lRBDajRbglHHgxU9p5E",
  authDomain: "blogpageapp.firebaseapp.com",
  projectId: "blogpageapp",
  storageBucket: "blogpageapp.firebasestorage.app",
  messagingSenderId: "733054357346",
  appId: "1:733054357346:web:85d950f54e8c000625263b",
  measurementId: "G-G1WW5065VJ",
  databaseURL: "https://blogpageapp-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { app, auth, db, addDoc, collection };
