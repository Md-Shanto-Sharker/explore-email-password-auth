// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVU3etOFznWi1-7Q1zWKQx24YFkIW-hG8",
  authDomain: "explore-email-password-a-e6db7.firebaseapp.com",
  projectId: "explore-email-password-a-e6db7",
  storageBucket: "explore-email-password-a-e6db7.firebasestorage.app",
  messagingSenderId: "142360804559",
  appId: "1:142360804559:web:d497d78a5f4001074e8bba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
