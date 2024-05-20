import { createContext } from "react";
import { useState } from "react";
export const AuthContext = createContext();

const TEST_USER = { // Temporary test user
    "name" : "Paco",
    "active_course" : "russian",
    "hearts" : 5,
    "available_xp" : 100,
    'isPremium' : false // Indicates wether user is a premium member or not
};

const AuthProvider = ({children}) => {

    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(localStorage.getItem("user") ? localStorage.getItem("user") : TEST_USER); // Get user from local storage (if possible)

    const data = {
        user: user,
        setUser:setUser
    };

    return <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;