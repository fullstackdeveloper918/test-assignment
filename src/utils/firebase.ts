
// import { getAuth } from "@clerk/nextjs/dist/types/server";
import { initializeApp } from "@firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDznGk-xz-YEpNs1Beu01_VIMv41jt-k_4",
    authDomain: "dcbapi.firebaseapp.com",
    databaseURL: "https://dcbapi-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dcbapi",
    storageBucket: "dcbapi.appspot.com",
    messagingSenderId: "894447567184",
    appId: "1:894447567184:web:1805a6ee1a39c1adb0ec55",
    measurementId: "G-SVKFM6CS7M"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
const auth = getAuth(app);

export {app,auth, db, collection, getDocs };