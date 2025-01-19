import React from 'react';
import './HallCard.css';

const HallCard = ({ hall }) => {
    return (
        <div className="hall-card">
            <img src={`/assets/ConferenceHalls/conference-hall${hall.id}.webp`} alt={hall.name}/>
            <div>
                <h3>{hall.name}</h3>
                <p>Price per hour: {hall.price_per_hour} PLN</p>
                <p>Square meters: {hall.square_meters} m²</p>
                <a href={`/halls/${hall.id}`} className="details-button">View Details</a>
            </div>
        </div>
    );
};

export default HallCard;
