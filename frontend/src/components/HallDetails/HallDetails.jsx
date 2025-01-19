import React from 'react';
import './HallDetails.css';

const HallDetailsContent = ({ hall }) => {
    return (
        <div className="hall-details">
            <div>
            <h2>{hall.name}</h2>
            <p>Below are {hall.name} details:</p>
            <div className="hall-info">
                <p><strong>Hall name:</strong> {hall.name}</p>
                <p><strong>Price per hour:</strong> {hall.price_per_hour} PLN</p>
                <p><strong>Surface:</strong> {hall.square_meters} sqm</p>
            </div>
            </div>
            <img src={`/assets/ConferenceHalls/conference-hall${hall.id}.webp`} alt={hall.name} />
        </div>
    );
};

export default HallDetailsContent;