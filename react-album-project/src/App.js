import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    updateDoc,
} from "firebase/firestore";

import React, { useEffect, useState } from "react";

import "./App.css";

import Auth from "./components/Auth";
import Login from "./components/Login";
import urlEncoder from "./helper/urlEncoder";
import urlDecoder from "./helper/urlDecoder";

import { db } from "./config/firebase";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";

export const AppContext = React.createContext();

const accountsCollectionRef = collection(db, "Accounts");

const localMode = true;

const App = () => {
    const [encryptedEmailAdrs, setEncryptedEmailAdrs] = useState("");
    const [loginInfo, setLoginInfo] = useState({});
    const [allowRedirect, setAllowRedirect] = useState(false);
    const [goAnonymousMode, setGoAnonymousMode] = useState(false);

    let LoginBaseURL = "";
    let TodoBaseURL = "";

    if (localMode) {
        LoginBaseURL = "http://localhost:3000/React-Todo-Login-Page/";
        TodoBaseURL = "http://localhost:5000/";
    } else {
        LoginBaseURL = "http://localhost:3000/React-Todo-Login-Page/";
        TodoBaseURL = "http://localhost:5000/";
    }

    const imgCollectionRef = collection(db, "Accounts");

    const validEmail = async (loginEmail, loginInfo) => {
        try {
            // check if email is new or not
            const accountsQuery = query(
                accountsCollectionRef,
                where("email", "==", loginEmail)
            );
            const accountsSnapshot = await getDocs(accountsQuery);

            if (accountsSnapshot.size === 0) {
                const newAccountData = {
                    email: loginEmail,
                    UserInfo: loginInfo,
                    UserTodo: [],
                };

                // Use the email as the document ID
                const newAccountRef = doc(accountsCollectionRef, loginEmail);

                await setDoc(newAccountRef, newAccountData);
            }

            const data = await getDocs(imgCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            if (filteredData.length > 0) {
                const firstDocumentRef = doc(
                    imgCollectionRef,
                    filteredData[0].id
                );
                await updateDoc(firstDocumentRef, { UserInfo: loginInfo });
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        console.log("=>", loginInfo.email);
        if (loginInfo.email) {
            validEmail(
                loginInfo.email,
                JSON.parse(JSON.stringify(loginInfo))
            ).then(() => {
                setEncryptedEmailAdrs(urlEncoder(loginInfo.email));

                console.log("Ready to SEND");
            });
        }
    }, [loginInfo]);

    useEffect(() => {
        if (encryptedEmailAdrs) {
            console.log("encryptedURL:", encryptedEmailAdrs);
            console.log("DecodedURL:", urlDecoder(encryptedEmailAdrs));
            console.log("AllowRedirect:", allowRedirect);

            if (allowRedirect) {
                if (/\S+@\S+\.\S+/.test(loginInfo.email)) {
                    setGoAnonymousMode(true);

                    if (goAnonymousMode) {
                        console.log("Redirect To Todo App!!!");
                        window.location.href = TodoBaseURL + encryptedEmailAdrs;
                    }
                } else {
                    console.log("Redirect To Todo App!!!");
                    window.location.href = TodoBaseURL + encryptedEmailAdrs;
                }
                console.log("DONW");
            }
        }
    }, [encryptedEmailAdrs]);

    return (
        <div style={{ width: "100vw" }}>
            <AppContext.Provider
                value={{
                    loginInfo,
                    setLoginInfo,
                    encryptedEmailAdrs,
                    setAllowRedirect,
                    TodoBaseURL,
                }}
            >
                {window.location.href.split("/").reverse()[0] ===
                "goAnonymousMode" ? (
                    <Auth method={"anonymously"} />
                ) : (
                    <Auth method={"reload"} />
                )}
                <Routes>
                    <Route
                        path="/Todo-Login-Page"
                        element={<Login />}
                    />
                    <Route
                        path={`/Todo-Login-Page/goAnonymousMode`}
                        element={<Login />}
                    />
                    <Route
                        path="*"
                        element={<PageNotFound />}
                    />
                </Routes>
            </AppContext.Provider>
        </div>
    );
};

export default App;
