import React, { useState, createContext, SetStateAction, Dispatch, ReactNode} from 'react';

type Course = {
    id : number,
    title : string,
    current_lesson : number
}

type User = {
    username : string,
    active_course : Course,
    enrolled_courses : number[],
    hearts : number,
    xp : number,
    available_xp : number,
    isPremium : boolean
}

type AuthContextType = {
    user : User,
    setUser : Dispatch<SetStateAction<User>>;
}

const TEST_USER : User = { // Temporary test user
    "username" : "Paco",
    "active_course" : {
        'id' : 1,
        'title' : 'russian',
        'current_lesson' : 3 
    },
    "enrolled_courses" : [1],
    "hearts" : 5,
    "xp" : 100,
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