"use client"
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    useEffect(() => {
        setLoading(true)
        console.log(document.cookie);
        try {
            const userInfo = localStorage.getItem("userInfo");
            const { name, role } = JSON.parse(userInfo);
            setName(name);
            if (role) {
                if (role === "ueo") {
                    setRole("উপজেলা শিক্ষা অফিসার");
                } else if (role === "aueo") {
                    setRole("সহকারি উপজেলা শিক্ষা অফিসার");
                } else {
                    setRole("প্রধান শিক্ষক");
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }, [])
    
    const authInfo = {
        role,
        name,
        loading
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthContextProvider;