import React, { useContext, useEffect } from "react";
import { auth, googleProvider } from "../../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

import { AppContext } from "../../App";

import { useNavigate } from "react-router-dom";

const Auth = ({ data, method }) => {
    const { setLoginInfo } = useContext(AppContext);

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
            await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            console.log("Login");
        } catch (err) {
            console.error(err);
        }
    };

    const signInWGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log("Login W Google");
        } catch (err) {
            if (err.code === "auth/popup-closed-by-user") {
                console.log("User closed the popup");
            } else {
                console.error(err);
            }
        }
    };

    const navigate = useNavigate();

    const currentURL = window.location.href;
    const connectToTodoApp = currentURL.endsWith("todoApp");

    const signOutHandler = () => {
        try {
            signOut(auth);
            console.log("Logout");
            if (connectToTodoApp) {
                navigate("/React-login-page/todoApp");
            } else {
                navigate("/React-login-page");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
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
            default:
                break;
        }
    }, []);

    return <div></div>;
};

export default Auth;
