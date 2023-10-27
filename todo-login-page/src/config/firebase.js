import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAE1jW_OYGlYEnRofw-ImOJKd5NcWUeowQ",
    authDomain: "ali-sdg9093-todo-app.firebaseapp.com",
    projectId: "ali-sdg9093-todo-app",
    storageBucket: "ali-sdg9093-todo-app.appspot.com",
    messagingSenderId: "28142815575",
    appId: "1:28142815575:web:abbaf6f96d49edcbb1d612",
    measurementId: "G-5K04QNKJNL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
