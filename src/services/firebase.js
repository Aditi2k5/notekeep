// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC1uUlAuBgsOHMC00uU6-jjHydYCcubn4c",
  authDomain: "notekeeper-7b824.firebaseapp.com",
  projectId: "notekeeper-7b824",
  storageBucket: "notekeeper-7b824.firebasestorage.app",
  messagingSenderId: "603761542189",
  appId: "1:603761542189:web:b083b2415fb98174d324a4",
  measurementId: "G-F3P1DDSD99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getAnalytics(app);

export {db};