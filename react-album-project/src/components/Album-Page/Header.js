import React, { useContext, useState } from "react";

import Styles from "./Header.module.css";

import { AppContext } from "../../App";
import Auth from "../Login-Page/Auth";

import noPhoto from "../../imgs/no-photo.png";

const Header = () => {
    const { loginInfo } = useContext(AppContext);
    const [logout, setLogout] = useState(false);

    const logoutHandler = () => {
        setLogout(true);
    };

    return (
        <div className={Styles.container}>
            <h1>- Header -</h1>
            {logout && <Auth method="logout" />}
            {/* {console.log(loginInfo)} */}
            <div>
                {loginInfo.photoURL ? (
                    <img src={loginInfo.photoURL} alt="profile-pic"></img>
                ) : (
                    <img src={noPhoto} alt="profile-pic"></img>
                )}
                {loginInfo.displayName ? (
                    <h2>{loginInfo.displayName}</h2>
                ) : (
                    <h2>{loginInfo.email}</h2>
                )}
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    );
};

export default Header;
