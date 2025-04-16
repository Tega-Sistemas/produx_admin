"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (token) {
                    const response = await api.get("/usuarios/auth/me");
                    const data = response.data;

                    if (data.success) {
                        setUser({
                            id: String(data.id),
                            email: data.email,
                            isAdmin: data.isAdmin,
                        });
                    } else {
                        throw new Error("Token inválido");
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Erro ao verificar autenticação:", error);
                setUser(null);
                localStorage.removeItem("authToken");
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [router]);

    const login = async (email, senha) => {
        try {
            const response = await api.post("/usuarios/auth/login", {
                email,
                senha,
            });
            const data = response.data;

            if (data.success) {
                setUser({
                    id: String(data.id),
                    email: data.email,
                    isAdmin: data.isAdmin,
                });
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userId", String(data.id));
                router.push(data.isAdmin ? "/admin" : "/wiki");
            } else {
                throw new Error("Credenciais inválidas");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("authToken");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
