import React from "react";
import Styles from "./PageNotFound.module.css";

const PageNotFound = () => {
    return (
        <div className={Styles.container}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
        </div>
    );
};

export default PageNotFound;
