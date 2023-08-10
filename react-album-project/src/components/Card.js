import React from "react";

const Card = ({ imgInfo }) => {
    return (
        <div>
            <p>
                Date <sapn>{imgInfo.NODate}</sapn>
            </p>
            <sapn>{imgInfo.date}</sapn>
            <p>
                Location <sapn>{imgInfo.location}</sapn>
            </p>
        </div>
    );
};

export default Card;
