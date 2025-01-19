import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import HallCard from "../components/HallCard/HallCard.jsx";
import hallService from "../services/HallService.js";
import Pagination from "../components/Pagination/Pagination.jsx";

const HallsPage = () => {
    const [halls, setHalls] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchHalls();
    }, [page, limit]);

    const fetchHalls = async () => {
        try {
            const response = await hallService.fetchHalls(page, limit);
            const { data, total, totalPages } = response;
            setHalls(data);
            setTotal(total);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching halls:', error);
        }
    };

    const handlePageChange = (newPage) => setPage(newPage);
    const handleLimitChange = (newLimit) => setLimit(newLimit);

    return (
        <div className="page-container">
            <Navbar/>
            <div className="page-content">
                <div className="container">
                    <h1>Available Conference Halls</h1>
                    <div id="hall-list">
                        {halls.map(hall => (
                            <HallCard key={hall.id} hall={hall}/>
                        ))}
                    </div>
                    <Pagination page={page} totalPages={totalPages} limit={limit} onPageChange={handlePageChange} onLimitChange={handleLimitChange}/>
                </div>
            </div>
            <Footer/>
        </div>

    );
}

export default HallsPage;