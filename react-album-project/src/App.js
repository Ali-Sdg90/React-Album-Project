import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Lightbox from "./components/Lightbox";

import "./App.css";
import Auth from "./components/Login-Page/Auth";
import Card from "./components/Album-Page/Card";

import { db } from "./config/firebase";
import Album from "./components/Album-Page/Album";
import Login from "./components/Login-Page/Login";
import { Route, Routes, useNavigate } from "react-router-dom";

export const AppContext = React.createContext();

const collectionName = "Images";

const App = () => {
    const [imgList, setImgList] = useState([]);

    const [showLightBox, setShowLightBox] = useState(false);
    const [currentImageIndex, setCurrentIndex] = useState(0);

    const [doLogin, setDoLogin] = useState(false);

    const [loginInfo, setLoginInfo] = useState({});

    const imgCollectionRef = collection(db, collectionName);

    useEffect(() => {
        const getImgList = async () => {
            console.log("in function");
            try {
                const data = await getDocs(imgCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setImgList(filteredData);
                console.log("filteredData:", filteredData);
            } catch (err) {
                console.error(err);
            }
        };

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setShowLightBox(false);
            }
        });

        getImgList();
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("=>", loginInfo.email);
        if (loginInfo.email) {
            navigate("/React-Album-Project/album");
        }
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
                    doLogin,
                    setDoLogin,
                }}
            >
                {/* {imgList.map((imgInfo) => (
                    <Card imgInfo={imgInfo} />
                ))} */}
                {console.log("O=>", imgList)}
                {/* <Lightbox /> */}
                {/* <Album /> */}
                <Auth method={"reload"} />
                {/* <Login /> */}
                <Routes>
                    <Route path="/React-Album-Project/" element={<Login />} />
                    <Route path="/React-Album-Project/*" element={<Login />} />
                    <Route
                        path="/React-Album-Project/album"
                        element={<Album />}
                    />
                </Routes>
            </AppContext.Provider>
        </div>
    );
};

export default App;
