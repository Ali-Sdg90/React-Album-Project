import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA1XNmhbe_zmRI-fCnHWbA44De8D2XOtOc",
    authDomain: "react-album-ali9093.firebaseapp.com",
    projectId: "react-album-ali9093",
    storageBucket: "react-album-ali9093.appspot.com",
    messagingSenderId: "469985434907",
    appId: "1:469985434907:web:adf626fe3dcdd9695487be",
    measurementId: "G-KMME1CFBBZ",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
