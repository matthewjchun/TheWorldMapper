
import React from 'react';

const IntroScreen = (props) => {
    return (
        <div>
        <img src={props.globe} className="intro-globe"></img>
        <div className="welcome-msg">
        <p>Welcome to the <br></br>World Data Mapper</p>
        </div>
        </div>
    );
};

export default IntroScreen;