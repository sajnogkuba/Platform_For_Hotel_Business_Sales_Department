import React from 'react';
import './LoginButton.css';

const LoginButton = ({ href, icon, text }) => {
    return (
        <a href={href} className="login-button">
            <span className="icon">{icon}</span>
            {text}
        </a>
    );
};

export default LoginButton;
