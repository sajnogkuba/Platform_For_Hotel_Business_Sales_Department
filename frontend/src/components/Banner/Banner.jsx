import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <div className="banner">
            <h1>Welcome to Martyard Hotel!</h1>
            <p>
                Martyard Hotel is a place where you can relax and enjoy the luxury of our services.
                Our hotel is located in the heart of Warsaw, close to the most important tourist attractions.
                We offer comfortable rooms, a restaurant with a wide selection of dishes, and a spa where you can relax.
            </p>
            <div className="hotel-img">
                <img src="/assets/background.webp" alt="Martyard Hotel" />
            </div>
        </div>
    );
};

export default Banner;
