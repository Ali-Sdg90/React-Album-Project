import React, { useEffect, useState } from "react";
import Styles from "./Auth.module.css";

import { auth, googleProvider } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import noPhoto from "../imgs/no-photo.png";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("- - -");
    const [userPhoto, setUserPhoto] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                user.photoURL
                    ? setUserPhoto(user.photoURL)
                    : setUserPhoto(noPhoto);
                setLoginEmail(user.email);
            } else {
                setLoginEmail("- - -");
                setUserPhoto("");
            }
        });

        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, Password);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWGoogle = () => {
        try {
            signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    const signOutHandler = () => {
        try {
            signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={Styles.container}>
            {userPhoto && <img src={userPhoto}></img>}

            <h2>{loginEmail}</h2>

            <input
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
                placeholder="Password..."
                // type="password"
                onChange={(e) => setPassword(e.target.value)}
            ></input>

            <button onClick={signIn}>Sign in</button>
            <button onClick={signInWGoogle}>Sign in with Google</button>
            <button onClick={signOutHandler}>Sign Out</button>
        </div>
    );
};

export default Auth;
