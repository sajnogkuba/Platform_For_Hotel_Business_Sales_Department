import React from "react";
import Footer from "../../components/Footer/Footer.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Banner from "../../components/Banner/Banner.jsx";

const HomePage = () => {
    return (
        <div className="page-container">
            <Navbar/>
            <Banner/>
            <Footer/>
        </div>
    );
}

export default HomePage;