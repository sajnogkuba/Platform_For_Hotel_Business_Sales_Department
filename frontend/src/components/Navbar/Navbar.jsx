import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-menu">
                    <ul>
                        <li><a href="/frontend/public"><img src="/assets/logo.png" alt="Martyard logo"/></a></li>
                        <li><a href="/frontend/public" className="active">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/halls">Conference halls</a></li>
                        <li><a href="/reservations">Reservations</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/account">Account</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;