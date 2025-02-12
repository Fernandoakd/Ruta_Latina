import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(Boolean(sessionStorage.getItem("access_token")));
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (access_token, user_info) => {
        sessionStorage.setItem("access_token", access_token);
        sessionStorage.setItem("user", JSON.stringify(user_info));
        setIsAuthenticatedState(true);
        setUser(user_info);
    };

    const logout = () => {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("user");
        setIsAuthenticatedState(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticatedState, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};
