import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import LoginButton from "../components/LoginButton/LoginButton.jsx";

const LoginPage = () => {
    return (
        <div className="page-container">
            <Navbar />
            <div className="page-content">
                <img src="/assets/logo.png" alt="Martyard logo"/>


                <div>
                    <LoginButton href="/empLogin" icon="&#128188;" text="Employee Login" />
                    <LoginButton href="/customerLogin" icon="&#128100;" text="Customer Login" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginPage;