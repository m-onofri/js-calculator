import React from 'react';

const Display = ({expression, result}) => {
    return (
        <div id="result">
            <div id="expression">{expression}</div>
            <div id="display">{result}</div>
        </div>
    );
}

export default Display;