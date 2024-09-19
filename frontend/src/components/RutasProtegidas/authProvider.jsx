import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [rol, setRol] = useState('');

    const login = (userRole) => {
        setIsLogin(true);
        setRol(userRole);
    };

    const logout = () => {
        setIsLogin(false);
        setRol('');
    };

    return (
        <AuthContext.Provider value={{ isLogin, rol, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);