// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCptB0SmTC_Cv4zVOHGGX3zzA01IyZM",
  authDomain: "pensologocreio-id-firebase.firebaseapp.com",
  projectId: "pensologocreio-id-firebase",
  storageBucket: "pensologocreio-id-firebase.firebasestorage.app",
  messagingSenderId: "482839755454",
  appId: "1:482839755454:web:f96ba289b3a29c6cbcef",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
