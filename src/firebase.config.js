// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQSlUQLgRoD6BGWOjdizyspDPyInm-EgM",
  authDomain: "online-job-portal-5129d.firebaseapp.com",
  projectId: "online-job-portal-5129d",
  storageBucket: "online-job-portal-5129d.appspot.com",
  messagingSenderId: "518293502192",
  appId: "1:518293502192:web:5fe47a4fcfa1372b6eea35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db, auth, provider};