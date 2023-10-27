import React from "react";
import ReactDOM from "react-dom/client";

import { HashRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import axios from "axios";

import Tostify from "./helper/Tostify";
import setCookie from "./helper/setCookie";
import checkCookie from "./helper/checkCookie";

axios.interceptors.request.use(
    (request) => {
        console.log(`A "${request.method}" request sent to ${request.url}`);
        return request;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        console.log(`A response has been received from ${response.config.url}`);
        return response;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <HashRouter>
        {!checkCookie("todoAppVPNWarning") && (
            <>
                {setCookie("todoAppVPNWarning", "Cookie value", 5)}
                <Tostify
                    errorMsg={
                        "Make sure your VPN is turned on for connecting to Firebase servers."
                    }
                    errorTimer={8000}
                    errorPosition="top-center"
                />
            </>
        )}
        <App />
    </HashRouter>
);
