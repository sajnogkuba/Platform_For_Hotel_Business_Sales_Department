import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CustomerLogin from "./pages/CustomerLogin.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

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
