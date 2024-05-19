import { createContext } from "react";
import { useState } from "react";
export const AuthContext = createContext();

const TEST_USER = {
    "name" : "Paco",
    "active_course" : "russian",
    "hearts" : 5,
    "available_xp" : 100
};

const AuthProvider = ({children}) => {

    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(localStorage.getItem("user") ? localStorage.getItem("user") : TEST_USER);

    const data = {
        user: user
    };

    return <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;