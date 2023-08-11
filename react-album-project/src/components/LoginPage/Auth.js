import React, { useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import { AppContext } from "../../App";

const Auth = ({ data, method }) => {
    const { setLoginInfo } = useContext(AppContext);

    useEffect(() => {
        console.log("in");
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
            await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
        } catch (err) {
            console.error(err);
        }
    };

    const signInWGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            if (err.code === "auth/popup-closed-by-user") {
                console.log("User closed the popup");
            } else {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        if (method === "email") {
            signIn();
        } else {
            signInWGoogle();
        }
    }, []);

    return <div></div>;
};

export default Auth;
