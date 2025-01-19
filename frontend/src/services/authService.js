import api from "../utils/axiosConfig";

export const registerUser = async (userData) => {
    try {
        const response = await api.post("auth/register", userData);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || "Registration failed");
    }
};

export const loginUser = async (data) => {
    try {
        const response = await api.post("/auth/login", data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

export const getAccountDetails = async (userId) => {
    const token = localStorage.getItem("authToken");
    const response = await api.get(`/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const getCurrentUser = async (token) => {
    const response = await api.get("/auth/currentUser", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};