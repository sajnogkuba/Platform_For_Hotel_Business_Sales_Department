import React from 'react';
import './Input.css';

const Input = ({ label, id, type, name, placeholder = "", required = false }) => {
    return (
        <div className="input-group">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={name} required={required} placeholder={placeholder}/>
        </div>
    );
};

export default Input;
