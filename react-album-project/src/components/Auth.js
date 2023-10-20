import React, { useContext, useEffect } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
} from "firebase/auth";

import Tostify from "../Tostify";

import { AppContext } from "../App";

const Auth = ({ data, method }) => {
    const { setLoginInfo, setAllowRedirect } = useContext(AppContext);

    useEffect(() => {
        console.log("in Auth");

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("CHANGE EMAIL");
                setLoginInfo(user);
            }
        });

        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        try {
            try {
                await signInWithEmailAndPassword(
                    auth,
                    data.email,
                    data.password
                );
                console.log("Login to existing account");
                setAllowRedirect(true);
            } catch (error) {
                console.log("Wrong password for email", error);
            }
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (signInError) {
            if (signInError.code === "auth/user-not-found") {
                try {
                    await createUserWithEmailAndPassword(
                        auth,
                        data.email,
                        data.password
                    );
                    console.log("Created new account and login to it");
                    setAllowRedirect(true);
                } catch (createError) {
                    console.error("Error in create new account:", createError);
                }
            } else {
                console.error("Error in login:", signInError);
            }
        }
    };

    const signInWGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log("Login W Google");

            setAllowRedirect(true);
        } catch (err) {
            if (err.code === "auth/popup-closed-by-user") {
                console.log("User closed the popup");
            } else {
                console.error(err);
            }
        }
    };

    const signOutHandler = () => {
        try {
            signOut(auth);
            console.log("Logout");
            setAllowRedirect(false);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        console.log("--->", method);
        switch (method) {
            case "email":
                signIn();
                break;
            case "gmail":
                signInWGoogle();
                break;
            case "logout":
                signOutHandler();
                break;
            case "anonymously":
                setLoginInfo({
                    displayName: "Anonymous User",
                    email: `anonymous${Math.trunc(Math.random() * 10000)}`,
                    isAnonymous: true,
                });
                setAllowRedirect(true);

                break;
            default:
                break;
        }
    }, []);

    return (
        <div>
            <Tostify />
        </div>
    );
};

export default Auth;
