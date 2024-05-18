"use client"
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    useEffect(() => {
        setLoading(true)
        try {
            const userInfo = localStorage.getItem("userInfo");

            if (userInfo) {
                const { name: userName, role: userRole } = JSON.parse(userInfo);
                setName(userName);
                if (userRole) {
                    if (userRole === "ueo") {
                        setRole("উপজেলা শিক্ষা অফিসার");
                    } else if (userRole === "aueo") {
                        setRole("সহকারি উপজেলা শিক্ষা অফিসার");
                    } else if (userRole === "head-master") {
                        setRole("প্রধান শিক্ষক");
                    }
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