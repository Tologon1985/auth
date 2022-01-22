import React from 'react';
import "./index.css"

const Spinner = () => {
    return (
        <div className="spinner">
            <div className="semipolar-spinner">
                <div className="ring"/>
                <div className="ring"/>
                <div className="ring"/>
                <div className="ring"/>
                <div className="ring"/>
            </div>
        </div>
    );
};

export default Spinner;