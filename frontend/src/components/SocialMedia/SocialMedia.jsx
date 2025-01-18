import React from 'react';
import './SocialMedia.css';

const SocialMedia = () => {
    return (
        <div className="social-media">
            <h2>Follow Us!</h2>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                Facebook
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                Instagram
            </a>
            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                X
            </a>
        </div>
    );
};

export default SocialMedia;
