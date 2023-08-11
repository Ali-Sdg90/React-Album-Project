import React, { useContext, useState } from "react";

import Styles from "./Header.module.css";

import { AppContext } from "../../App";
import Auth from "../Login-Page/Auth";


const Header = () => {
    const { loginInfo } = useContext(AppContext);
    const [logout, setLogout] = useState(false);

    const logoutHandler = () => {
        setLogout(true);
    };

    return (
        <div className={Styles.container}>
            <h1>Hello</h1>
            <button onClick={logoutHandler}>Logout</button>
            {logout && <Auth method="logout" />}
        </div>
    );
};

export default Header;
