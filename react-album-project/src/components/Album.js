import React from 'react';

import Styles from "Album.module.css"
import Header from './Header';

const Album = () => {
    return (
        <div className={Styles.container}>
            <Header />
        </div>
    );
};

export default Album;