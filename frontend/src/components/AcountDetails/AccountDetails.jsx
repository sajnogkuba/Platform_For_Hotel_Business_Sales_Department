import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { getAccountDetails } from "../../services/authService.js";
import "./AccountDetails.css";

const AccountDetails = () => {
    const { user, logout } = useAuth();
    const [accountDetails, setAccountDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccountDetails = async () => {
            if (!user?.id) {
                setUnauthorized(true);
                setLoading(false);
                return;
            }

            try {
                const response = await getAccountDetails(user.id);
                setAccountDetails(response);
            } catch (error) {
                console.error("Error fetching account details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccountDetails();
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (unauthorized) {
        return (
            <div className="unauthorized-message">
                <h2>Unauthorized</h2>
                <p>You need to log in to access this page.</p>
                <button onClick={() => navigate("/login")} className="account-button">
                    Go to Login
                </button>
            </div>
        );
    }

    if (!accountDetails) {
        return <p>Unable to load account details.</p>;
    }

    return (
        <div className="account-content">
            <div className="account-details">
                <h2>Account Details</h2>
                <p>Below are your account details:</p>

                <div className="account-info">
                    <p><strong>ID:</strong> {accountDetails.id}</p>
                    <p><strong>Name:</strong> {accountDetails.name}</p>
                    <p><strong>Email:</strong> {accountDetails.email}</p>
                    <p><strong>Role:</strong> {accountDetails.role_name}</p>
                    <p><strong>Phone:</strong> {accountDetails.phone || "Not provided"}</p>
                </div>
                <a href="/editAccount" className="account-button">Edit Account</a>
                <button className="account-button" onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default AccountDetails;
