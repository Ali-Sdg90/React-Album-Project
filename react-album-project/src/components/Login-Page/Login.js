import React, { useContext, useEffect, useState } from "react";
import validData from "./validData";

import Styles from "./Login.module.css";
import { Link } from "react-router-dom";
import Auth from "./Auth";

import { AppContext } from "../../App";

import { auth } from "../../config/firebase";

import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
    const { setDoLogin } = useContext(AppContext);

    setDoLogin(false);

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [isFocused, setIsFocused] = useState({});
    const [allowAuth, setAllowAuth] = useState("");

    const [prevEmail, setPrevEmail] = useState("");

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
            setDoLogin(true);
            setAllowAuth("email");
            // console.log(data);
        } else {
            console.log("Error");
            setAllowAuth("");
            setDoLogin(false);
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("is it working?", user.email);
                setPrevEmail(user.email);
            }
        });

        return () => unsubscribe();
    }, []);

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

                    {prevEmail && (
                        <button
                            onClick={(event) => {
                                event.preventDefault();
                                setDoLogin(true);
                            }}
                        >
                            Continue with {prevEmail}
                        </button>
                    )}

                    <div>
                        <hr></hr>
                        <p>OR</p>
                    </div>

                    <button
                        className={Styles.loginWgmail}
                        onClick={(event) => {
                            event.preventDefault();
                            setAllowAuth("gmail");
                        }}
                    >
                        Login With Google
                    </button>

                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            setAllowAuth("logout");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </form>
            {allowAuth.length ? <Auth data={data} method={allowAuth} /> : ""}
        </div>
    );
};

export default Login;
