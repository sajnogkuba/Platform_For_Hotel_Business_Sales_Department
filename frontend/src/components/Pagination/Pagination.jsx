import React from 'react';
import './Pagination.css';

const Pagination = ({ page, totalPages, limit, onPageChange, onLimitChange }) => {
    return (
        <div className="pagination">
            <div>
                Records per page:
                <select value={limit} onChange={(e) => onLimitChange(Number(e.target.value))}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div className="pagination-buttons">
                <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;