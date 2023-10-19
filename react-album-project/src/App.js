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
import Lightbox from "./components/Lightbox";

import "./App.css";
import Auth from "./components/Login-Page/Auth";
import Card from "./components/Album-Page/Card";

import urlEncoder from "./helper/urlEncoder";
import urlDecoder from "./helper/urlDecoder";

import { db } from "./config/firebase";
import Album from "./components/Album-Page/Album";
import Login from "./components/Login-Page/Login";
import { Route, Routes, useNavigate } from "react-router-dom";

export const AppContext = React.createContext();

const accountsCollectionRef = collection(db, "Accounts");

document.title = "React login page";

const App = () => {
    // const [showLightBox, setShowLightBox] = useState(false);
    // const [currentImageIndex, setCurrentIndex] = useState(0);
    const [encryptedEmailAdrs, setEncryptedEmailAdrs] = useState("");

    const [loginInfo, setLoginInfo] = useState({});

    const imgCollectionRef = collection(db, "Accounts");

    const connectToTodoApp = window.location.href.endsWith("todoApp");
    console.log("connect To TodoApp: ", connectToTodoApp);

    // useEffect(() => {
    //     document.addEventListener("keydown", (event) => {
    //         if (event.key === "Escape") {
    //             setShowLightBox(false);
    //         }
    //     });
    // }, []);

    const navigate = useNavigate();

    const getImgList = async (loginInfo) => {
        try {
            // check if email is new or not
            const accountsQuery = query(
                accountsCollectionRef,
                where("email", "==", loginInfo.email)
            );
            const accountsSnapshot = await getDocs(accountsQuery);

            if (accountsSnapshot.size === 0) {
                const newAccountData = {
                    email: loginInfo.email,
                    UserInfo: loginInfo,
                    UserTodo: [], // want array
                };

                // Use the email as the document ID
                const newAccountRef = doc(
                    accountsCollectionRef,
                    loginInfo.email
                );

                await setDoc(newAccountRef, newAccountData);
            }

            const data = await getDocs(imgCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                // UserTodos: [],
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
            if (connectToTodoApp) {
                getImgList(JSON.parse(JSON.stringify(loginInfo))).then(() => {
                    console.log(loginInfo);

                    setEncryptedEmailAdrs(urlEncoder(loginInfo.email));

                    console.log("Ready to SEND");
                });

                // window.location.href =
                // "http://localhost:5000/" + encryptedEmailAdrs;

                // window.location.href = "https://ali-sdg9093-todo-app.web.app/" + encryptedEmailAdrs;
            } else {
                navigate("/React-Album-Project/album");
            }
            // console.log("login info:", loginInfo);
        }
    }, [loginInfo]);

    useEffect(() => {
        if (encryptedEmailAdrs) {
            console.log("DecodedURL:", urlDecoder(encryptedEmailAdrs));
            console.log("encryptedURL:", encryptedEmailAdrs);
        }
    }, [encryptedEmailAdrs]);

    return (
        <div>
            <AppContext.Provider
                value={{
                    // showLightBox,
                    // setShowLightBox,
                    // currentImageIndex,
                    // setCurrentIndex,
                    loginInfo,
                    setLoginInfo,
                    connectToTodoApp,
                    encryptedEmailAdrs,
                }}
            >
                {/* <Lightbox /> */}
                {/* <Login /> */}
                {/* <Album /> */}

                <Auth method={"reload"} />
                <Routes>
                    <Route path="/React-login-page/" element={<Login />} />
                    <Route path="/React-login-page/*" element={<Login />} />
                    <Route path="/React-login-page/album" element={<Album />} />
                </Routes>
            </AppContext.Provider>
        </div>
    );
};

export default App;
