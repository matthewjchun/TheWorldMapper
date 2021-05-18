import React from 'react';

const Logo = (props) => {
    return (
        <div className='logo' onClick={props.setShowHome}>
            The World 
            <br></br>
            Data Mapper
        </div>
    );
};

export default Logo;