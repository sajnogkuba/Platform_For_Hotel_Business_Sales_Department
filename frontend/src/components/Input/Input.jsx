import React from 'react';
import './Input.css';

const Input = ({ label, id, type, name, placeholder = "", required = false, onChange }) => {
    return (
        <div className="input-group">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={name} required={required} placeholder={placeholder} onChange={onChange}/>
        </div>
    );
};

export default Input;
