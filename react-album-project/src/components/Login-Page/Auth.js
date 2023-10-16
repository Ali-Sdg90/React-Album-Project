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
    const { setLoginInfo, setDoLogin, doLogin } = useContext(AppContext);

    console.log("1=>", doLogin);

    useEffect(() => {
        console.log("in Auth");
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (doLogin) {
                console.log("INSIDE", user);
            }
            if (user) {
                console.log("CHANGE EMAIL", user.email);
                if (doLogin) {
                    setLoginInfo(user);
                }
            }
        });

        return () => unsubscribe();
    }, [doLogin]);

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

    const signOutHandler = () => {
        try {
            signOut(auth);
            console.log("Logout");
            navigate("/React-Album-Project");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        switch (method) {
            case "email":
                signIn();
                setDoLogin(true);
                break;
            case "gmail":
                signInWGoogle();
                setDoLogin(true);
                break;
            case "logout":
                signOutHandler();
                setDoLogin(false);
                break;
            default:
                break;
        }
    }, []);

    return <div></div>;
};

export default Auth;
