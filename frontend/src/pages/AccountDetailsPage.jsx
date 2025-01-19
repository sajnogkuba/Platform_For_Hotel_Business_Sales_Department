import React from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import AccountDetails from "../components/AcountDetails/AccountDetails.jsx";

const AccountDetailsPage = () => {
    return (
        <div className="page-container">
            <Navbar />
            <div className="page-content">
                <AccountDetails />
            </div>
            <Footer />
        </div>
    );
};

export default AccountDetailsPage;