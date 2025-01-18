import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";

const CustomerLogin = () => {
    return (
        <div className="page-container">
            <Navbar />

            <div className="page-content">
                <LoginForm />
            </div>

            <Footer />
        </div>
    );
}

export default CustomerLogin;