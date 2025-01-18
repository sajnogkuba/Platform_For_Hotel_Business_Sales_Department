import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Button from "../../components/Button/Button.jsx";
import Form from "../../components/Form/Form.jsx";

const CustomerLogin = () => {
    const inputs = [
        { label: "Email:",  id: "email", type: "email", name:"email", required:true},
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
                <div className="login-form">
                    <h2>Customer Login</h2>
                    <p>Nice to see you again!</p>
                    <Form inputs={inputs} button={button} onSubmit={(e) => e.preventDefault()}/>
                    <p>Don't have an account yet?</p>
                    <a href="/registration">
                        <Button text="Register" type="submit"/>
                    </a>
                </div>
            </div>
            <Footer/>
        </div>
    );
};
export default CustomerLogin;