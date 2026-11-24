// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_vUDYZgQgs0PK9G4IrIK5grPuwRZJJ3Q",
  authDomain: "nexagentai-ea58c.firebaseapp.com",
  projectId: "nexagentai-ea58c",
  storageBucket: "nexagentai-ea58c.firebasestorage.app",
  messagingSenderId: "833069881728",
  appId: "1:833069881728:web:aa6689659ae305a0cd0965"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

