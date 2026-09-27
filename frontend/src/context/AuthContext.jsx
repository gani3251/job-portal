import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = (loginResponse) => {

        localStorage.setItem(
            "token",
            loginResponse.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify({
                userId: loginResponse.userId,
                name: loginResponse.name,
                email: loginResponse.email,
                role: loginResponse.role
            })
        );

        setToken(loginResponse.token);

        setUser({
            userId: loginResponse.userId,
            name: loginResponse.name,
            email: loginResponse.email,
            role: loginResponse.role
        });
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isLoggedIn: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}