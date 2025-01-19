import React, { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData, token) => {
        localStorage.setItem("authToken", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    };

    useEffect(() => {
        const initializeSession = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const userData = await getCurrentUser(token);
                console.log("Restored session:", userData);
                setUser(userData);
            } catch (error) {
                console.error("Failed to restore session:", error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        initializeSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {loading ? <p>Loading session...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
