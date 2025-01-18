import React from "react";
import "./HomePage.css";
import Footer from "../../components/Footer/Footer.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Banner from "../../components/Banner/Banner.jsx";

const HomePage = () => {
    return (
        <div className="homepage">
            <Navbar />
            <Banner />
            <Footer />
        </div>
    );
}

export default HomePage;