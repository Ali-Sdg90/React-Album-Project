import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Lightbox from "./components/Lightbox";

import "./App.css";
import Auth from "./components/old-components/Auth";
import Card from "./components/Card";

import { db } from "./config/firebase";
import Album from "./components/Album";
import Login from "./components/LoginPage/Login";

export const AppContext = React.createContext();

const collectionName = "Images";

const App = () => {
    const [imgList, setImgList] = useState([]);

    const [showLightBox, setShowLightBox] = useState(false);
    const [currentImageIndex, setCurrentIndex] = useState(0);

    const [loginInfo, setLoginInfo] = useState({});

    const imgCollectionRef = collection(db, collectionName);

    useEffect(() => {
        const getMovieList = async () => {
            try {
                const data = await getDocs(imgCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setImgList(filteredData);
                // console.log(filteredData);
            } catch (err) {
                console.error(err);
            }
            getMovieList();

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    setShowLightBox(false);
                }
            });
        };
    }, []);

    useEffect(() => {
        console.log("=>", loginInfo.email);
    }, [loginInfo]);

    return (
        <div>
            <AppContext.Provider
                value={{
                    showLightBox,
                    setShowLightBox,
                    currentImageIndex,
                    setCurrentIndex,
                    loginInfo,
                    setLoginInfo,
                }}
            >
                {/* <h1>Hello</h1> */}
                {/* {imgList.map((imgInfo) => (
                <Card imgInfo={imgInfo} />))} */}
                {/* <Lightbox /> */}
                {/* <Album /> */}
                {/* <Auth /> */}
                <Login />
            </AppContext.Provider>
        </div>
    );
};

export default App;
