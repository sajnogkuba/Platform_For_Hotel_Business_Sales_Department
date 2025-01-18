import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import CustomerLogin from "./pages/CustomerLogin/CustomerLogin.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/customerLogin" element={<CustomerLogin />} />
            </Routes>
        </Router>
    );
}

export default App;
