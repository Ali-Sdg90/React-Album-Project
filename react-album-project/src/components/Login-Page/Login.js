import React, { useContext, useEffect, useState } from "react";
import validData from "./validData";

import Styles from "./Login.module.css";
import { Link } from "react-router-dom";
import Auth from "./Auth";

import { AppContext } from "../../App";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const { loginInfo, encryptedEmailAdrs } = useContext(AppContext);

    const [errors, setErrors] = useState({});
    const [isFocused, setIsFocused] = useState({});
    const [allowAuth, setAllowAuth] = useState("");

    useEffect(() => {
        setErrors(validData(data, "login"));
        // console.log(errors);
    }, [data, isFocused]);

    const changeHandler = (event) => {
        if (event.target.name === "acceptTAS") {
            setData({
                ...data,
                [event.target.name]: event.target.checked,
            });
        } else {
            setData({
                ...data,
                [event.target.name]: event.target.value,
            });
        }
    };

    const focusHandler = (event) => {
        setIsFocused({ ...isFocused, [event.target.name]: true });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            console.log("OK");
            setAllowAuth("email");
            // console.log(data);
        } else {
            console.log("Error");
            setAllowAuth("");
            setIsFocused({
                email: true,
                password: true,
            });
        }
    };

    useEffect(() => {
        if (Object.keys(errors).length) {
            setAllowAuth("");
        }
    }, [Object.keys(errors).length]);

    return (
        <div className={Styles.container}>
            <form className={Styles.formContainer}>
                <h1 className={Styles.header}>Login</h1>

                <div className={Styles.formField}>
                    <label>Email: </label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        value={data.email}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        className={
                            errors.email && isFocused.email
                                ? Styles.uncompleted
                                : Styles.formInput
                        }
                    ></input>
                    {errors.email && isFocused.email && (
                        <span>{errors.email}</span>
                    )}
                </div>

                <div className={Styles.formField}>
                    <label>Password: </label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        className={
                            errors.password && isFocused.password
                                ? Styles.uncompleted
                                : Styles.formInput
                        }
                    ></input>
                    {errors.password && isFocused.password && (
                        <span>{errors.password}</span>
                    )}
                </div>
                <br></br>
                <div className={Styles.formButtones}>
                    <button onClick={submitHandler}>Login</button>
                    <div>
                        <hr></hr>
                        <p>OR</p>
                    </div>
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            setAllowAuth("gmail");
                        }}
                    >
                        Login With Google
                    </button>
                    {loginInfo.email ? (
                        <div className={Styles.withAccountBtns}>
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    console.log("SEND");
                                    window.location.href =
                                        "http://localhost:5000/" +
                                        encryptedEmailAdrs;
                                }}
                            >
                                <div>Continue with {loginInfo.email}</div>
                            </button>
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    setAllowAuth("logout");
                                }}
                            >
                                <div>Logout of {loginInfo.email}</div>
                            </button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </form>
            {allowAuth.length ? <Auth data={data} method={allowAuth} /> : ""}
        </div>
    );
};

export default Login;
