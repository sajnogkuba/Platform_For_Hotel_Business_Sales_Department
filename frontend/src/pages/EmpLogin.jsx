import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Button from "../components/Button/Button.jsx";
import Form from "../components/Form/Form.jsx";

const CustomerLogin = () => {
    const inputs = [
        { label: "Work Email::",  id: "email", type: "email", name:"email", required:true},
        { label: "Password:", id: "password", type: "password", name:"password", required:true}
    ];

    const button = {
        text: "Login",
        type: "submit"
    };

    return (
        <div className="page-container">
            <Navbar/>
            <div className="page-content">
                <div className="form">
                    <h2>Employee Login</h2>
                    <p>Welcome back! Please log in to access your account.</p>
                    <Form inputs={inputs} button={button} onSubmit={(e) => e.preventDefault()}/>
                    <p>If you do not have an account, please with Tech-Support. tel. +48 603 608 605</p>
                </div>
            </div>
            <Footer/>
        </div>
    );
};
export default CustomerLogin;