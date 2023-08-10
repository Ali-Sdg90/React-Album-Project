import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import "./App.css";
import Auth from "./components/Auth";
import Card from "./components/Card";

import { db } from "./config/firebase";

const collectionName = "Images";

const App = () => {
    const [imgList, setImgList] = useState([]);

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
        };
        getMovieList();
    }, []);

    return (
        <div>
            {/* <h1>Hello</h1> */}
            {/* <Auth /> */}
            {imgList.map((imgInfo) => (
                <Card imgInfo={imgInfo} />
            ))}
        </div>
    );
};

export default App;
