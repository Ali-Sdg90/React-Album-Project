import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// minified version is also included
import "react-toastify/dist/ReactToastify.min.css";

function Tostify({ errorMsg, errorTimer, errorPosition }) {
    // toast.error(errorMsg, {
    //     position: errorPosition,
    //     autoClose: errorTimer,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    // });

    toast.error(errorMsg);

    return (
        <div>
            {console.log(">>>", errorMsg)}
            <ToastContainer
                position={errorPosition}
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default Tostify;
