import React from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Form from "../components/Form/Form.jsx";
import { registerUser } from "../services/authService.js";

const RegisterPage = () => {
    const inputs = [
        { label: "First Name", id: "first-name", type: "text", name: "first-name", placeholder: "Enter your first name", required: true },
        { label: "Last Name", id: "last-name", type: "text", name: "last-name", placeholder: "Enter your last name", required: true },
        { label: "Email", id: "email", type: "email", name: "email", required: true },
        { label: "Phone Number", id: "phone", type: "tel", name: "phone", placeholder: "+48 123 456 789", required: true },
        { label: "Password", id: "password", type: "password", name: "password", placeholder: "Enter your password", required: true },
        { label: "Confirm Password", id: "confirm-password", type: "password", name: "confirm-password", placeholder: "Re-enter your password", required: true },
    ];

    const button = {
        text: "Register",
        type: "submit"
    };

    const handleRegister = async (formData) => {
        if (formData.password !== formData["confirm-password"]) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const userData = {
                name: `${formData["first-name"]} ${formData["last-name"]}`,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                role_id: 2, // Domyślna rola użytkownika
            };
            console.log(userData);
            const result = await registerUser(userData);
            alert("Registration successful! Your ID is: " + result.id);
        } catch (error) {
            alert("Registration failed: " + error.message);
        }
    };

  return (
      <div className="page-container">
          <Navbar />

          <div className="page-content">
              <div className="form">
                  <h2>Registration</h2>
                  <p>Please fill in the form below to create your account.</p>
                    <Form inputs={inputs} button={button} onSubmit={handleRegister} />
                  <p>If you need assistance, please contact Tech-Support: tel. +48 603 608 605</p>
              </div>
          </div>

          <Footer />
      </div>
  );
};

export default RegisterPage;