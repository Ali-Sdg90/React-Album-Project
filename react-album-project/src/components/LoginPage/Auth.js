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
                setLoginInfo(user); // Update login info with new user data
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

    const signInWGoogle = () => {
        try {
            signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (method === "email") {
            signIn();
        } else {
            signInWGoogle();
        }
    }, []); // This effect runs only once when component mounts

    return <div></div>;
};

export default Auth;
