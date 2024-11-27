// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE,
  authDomain: "oauth-00.firebaseapp.com",
  projectId: "oauth-00",
  storageBucket: "oauth-00.firebasestorage.app",
  messagingSenderId: "308709665854",
  appId: "1:308709665854:web:f70d968e3fa2096b16f56f",
  measurementId: "G-LDYBVH0Q6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;