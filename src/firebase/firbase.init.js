// Do not share this file

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5_rm4ie7W_3VIXok3rc8xK7lFCcjTUkk",
  authDomain: "explore-email-password-a-26a1d.firebaseapp.com",
  projectId: "explore-email-password-a-26a1d",
  storageBucket: "explore-email-password-a-26a1d.firebasestorage.app",
  messagingSenderId: "723768709861",
  appId: "1:723768709861:web:b5b5c666026fc9b522ba0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
