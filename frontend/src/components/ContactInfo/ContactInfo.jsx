import React from 'react';
import './ContactInfo.css';

const ContactInfo = () => {
    return (
        <div className="contact-info">
            <h2>Contact Information</h2>
            <p><strong>Address:</strong> Mostowa 54, Warsaw, Poland</p>
            <p><strong>Phone:</strong> <a href="tel:+123456789">+123 456 789</a></p>
            <p><strong>Email:</strong> <a href="mailto:info@martyardhotel.com">info@martyardhotel.com</a></p>
            <p><strong>Reception:</strong> Open 24/7</p>
        </div>
    );
};

export default ContactInfo;
