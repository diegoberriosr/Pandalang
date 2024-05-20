import React, { useState, createContext, SetStateAction, Dispatch, ReactNode} from 'react';

type User = {
    username : string,
    active_course : string,
    hearts : number,
    available_xp : number,
    isPremium : boolean
}

type AuthContextType = {
    user : User,
    setUser : Dispatch<SetStateAction<User>>;
}

const TEST_USER : User = { // Temporary test user
    "username" : "Paco",
    "active_course" : "russian",
    "hearts" : 3,
    "available_xp" : 100,
    'isPremium' : false // Indicates wether user is a premium member or not
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider : React.FC<{ children : ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(TEST_USER);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;