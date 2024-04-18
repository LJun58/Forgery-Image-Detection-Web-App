// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  writeBatch,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFRBsMsJBxRRoo0H8xV6AHIFUOieVgzwA",
  authDomain: "forgeryimagedetection.firebaseapp.com",
  projectId: "forgeryimagedetection",
  storageBucket: "forgeryimagedetection.appspot.com",
  messagingSenderId: "966259971937",
  appId: "1:966259971937:web:3ceea5eab3682b9ef91720",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export {
  db,
  collection,
  writeBatch,
  addDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteDoc,
  deleteObject,
};
