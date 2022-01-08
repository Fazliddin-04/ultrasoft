import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDP2YZDSprpuFIAR_n0tpR4qSzOVFZcPN8",
  authDomain: "ultrasoft-e988b.firebaseapp.com",
  projectId: "ultrasoft-e988b",
  storageBucket: "ultrasoft-e988b.appspot.com",
  messagingSenderId: "158176900958",
  appId: "1:158176900958:web:9d9585a003e6ce00e4c1cf",
  measurementId: "G-2W7ECKXK6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  // eslint-disable-next-line
const analytics = getAnalytics(app);
export const db = getFirestore()