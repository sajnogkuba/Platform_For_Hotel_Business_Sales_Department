import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Button from "../components/Button/Button.jsx";
import Form from "../components/Form/Form.jsx";
import {loginUser} from "../services/authService";
import { useAuth } from "../context/AuthContext";

const CustomerLogin = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const inputs = [
        { label: "Email:", id: "email", type: "email", name: "email", required: true },
        { label: "Password:", id: "password", type: "password", name: "password", required: true }
    ];

    const button = {
        text: "Login",
        type: "submit"
    };

    const handleSubmit = async (formData) => {
        setError(null);

        try {
            const response = await loginUser(formData);
            login(response.user, response.token);
            navigate("/account/");
        } catch (err) {
            setError(err.message || "Failed to log in. Please try again.");
        }
    };

    return (
        <div className="page-container">
            <Navbar />
            <div className="page-content">
                <div className="form">
                    <h2>Customer Login</h2>
                    <p>Nice to see you again!</p>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <Form inputs={inputs} button={button} onSubmit={handleSubmit} />
                    <p>Don't have an account yet?</p>
                    <a href="/registration">
                        <Button text="Register" type="button" />
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CustomerLogin;
