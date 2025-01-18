import Navbar from "../components/Navbar/Navbar.jsx";
import ContactInfo from "../components/ContactInfo/ContactInfo.jsx";
import Map from "../components/Map/Map.jsx";
import SocialMedia from "../components/SocialMedia/SocialMedia.jsx";
import ContactForm from "../components/ContactForm/ContactForm.jsx";
import Footer from "../components/Footer/Footer.jsx";
import React from "react";
import "./styles.css";


const ContactPage = () => {
  return (
      <div className="page-container">
          <Navbar/>
          <div className="page-content">
              <ContactInfo/>
              <Map/>
              <SocialMedia/>
              <ContactForm/>
          </div>
          <Footer/>
      </div>
  );
}

export default ContactPage;