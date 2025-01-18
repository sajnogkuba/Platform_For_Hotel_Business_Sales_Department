import React from 'react';
import './Input.css';

const Input = ({ label, id, type, name, required = false }) => {
    return (
        <div className="input-group">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={name} required={required} />
        </div>
    );
};

export default Input;
