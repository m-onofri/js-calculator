import React from 'react';

const Button = ({id, view, value, handleChange}) => {
    return (
        <div 
            id={id} 
            className={"button" + " " + view}  
            onClick={(e) => handleChange(e)}>
            {value}
        </div>
    );
}

export default Button;