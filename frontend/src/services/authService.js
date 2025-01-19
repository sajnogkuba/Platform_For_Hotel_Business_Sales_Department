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

export default registerUser;