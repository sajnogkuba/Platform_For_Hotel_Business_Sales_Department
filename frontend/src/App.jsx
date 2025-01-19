import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CustomerLogin from "./pages/CustomerLogin.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import EmpLogin from "./pages/EmpLogin.jsx";
import HallsPage from "./pages/HallsPage.jsx";
import HallDetailsPage from "./pages/HallDetailsPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/customerLogin" element={<CustomerLogin />} />
                <Route path="/registration" element={<RegisterPage />} />
                <Route path="/empLogin" element={<EmpLogin />} />
                <Route path="/halls" element={<HallsPage />} />
                <Route path="/halls/:id" element={<HallDetailsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
