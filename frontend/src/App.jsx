import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import CustomerLogin from "./pages/CustomerLogin/CustomerLogin.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/customerLogin" element={<CustomerLogin />} />
                <Route path="/registration" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;
