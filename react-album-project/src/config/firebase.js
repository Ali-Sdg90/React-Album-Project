import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const currentURL = window.location.href;

const connectToTodoApp = currentURL.endsWith("todoApp");

let firebaseConfig = {};

if (connectToTodoApp) {
    firebaseConfig = {
        apiKey: "AIzaSyAE1jW_OYGlYEnRofw-ImOJKd5NcWUeowQ",
        authDomain: "ali-sdg9093-todo-app.firebaseapp.com",
        projectId: "ali-sdg9093-todo-app",
        storageBucket: "ali-sdg9093-todo-app.appspot.com",
        messagingSenderId: "28142815575",
        appId: "1:28142815575:web:abbaf6f96d49edcbb1d612",
        measurementId: "G-5K04QNKJNL",
    };
} else {
    firebaseConfig = {
        apiKey: "AIzaSyA1XNmhbe_zmRI-fCnHWbA44De8D2XOtOc",
        authDomain: "react-album-ali9093.firebaseapp.com",
        projectId: "react-album-ali9093",
        storageBucket: "react-album-ali9093.appspot.com",
        messagingSenderId: "469985434907",
        appId: "1:469985434907:web:adf626fe3dcdd9695487be",
        measurementId: "G-KMME1CFBBZ",
    };
}

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
