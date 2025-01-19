import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import hallService from "../services/HallService.js";
import HallDetailsContent from "../components/HallDetails/HallDetails.jsx";

const HallDetailsPage = () => {
    const { id } = useParams();
    const [hall, setHall] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHallDetails();
    }, [id]);

    const fetchHallDetails = async () => {
        try {
            const hallData = await hallService.fetchHallById(id);
            setHall(hallData);
        } catch (error) {
            console.error('Error fetching hall details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!hall) {
        return <p>Hall not found.</p>;
    }
    return (
        <div className="page-container">
            <Navbar/>
            <div className="page-content">
                <HallDetailsContent hall={hall}/>
            </div>
            <Footer/>
        </div>
    );
}

export default HallDetailsPage;