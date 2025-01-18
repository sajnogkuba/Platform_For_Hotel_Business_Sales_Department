import React from 'react';
import './Map.css';

const Map = () => {
    return (
        <div className="map-container">
            <h2>Our Location</h2>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2446.247596872264!2d20.98352!3d52.184371999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTLCsDExJzAzLjciTiAyMMKwNTknMDAuNyJF!5e0!3m2!1spl!2spl!4v1734710354968!5m2!1spl!2spl"
                title="Our Location"
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default Map;
