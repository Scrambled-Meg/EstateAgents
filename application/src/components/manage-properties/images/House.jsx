import React from 'react';
import house from "./house.jpg"

const House = () => {
    return (
        <div>
        <img className="propimage" src={house} alt="property image" />
        </div>
    );
};

export default House