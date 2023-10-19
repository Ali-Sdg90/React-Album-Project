import React, { useState } from "react";

function ErrorBoundary(props) {
    const [findError, setfindError] = useState(false);

    const componentDidCatch = (error, info) => {
        setfindError(true);
        // You can log the error or send it to a logging service here
        console.log("Error caught by error boundary:", error, info);
    };

    if (findError) {
        // You can customize the error message here
        return <div>Something went wrong. Please refresh the page.</div>;
    }

    return props.children;
}

export default ErrorBoundary;
