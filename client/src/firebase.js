// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "house-estate-b9ad7.firebaseapp.com",
  projectId: "house-estate-b9ad7",
  storageBucket: "house-estate-b9ad7.firebasestorage.app",
  messagingSenderId: "776978315348",
  appId: "1:776978315348:web:cd3a244f0a35c6090415c1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
