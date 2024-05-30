import React, { useState, createContext, SetStateAction, Dispatch, ReactNode, useContext} from 'react';
import defaultInstance from '../axios/defaultInstance.js';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { StatusContext } from './StatusContext.tsx';

type User = {
    id : number
    username : string,
    pfp ? : string
}

type AuthContextType = {
    user : User,
    setUser : Dispatch<SetStateAction<User>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider : React.FC<{ children : ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User|undefined>(localStorage.getItem('user') ? localStorage.getItem('user') : null);
    const [authTokens, setAuthTokens] = useState( localStorage.getItem('authTokens') ? localStorage.getItem('authToken') : null);
    const navigate = useNavigate();

    const { getStatus } = useContext(StatusContext);

    const logInUser = (data, setLoading) => {
        setLoading(true);
        defaultInstance.post('token/', data)
        .then( res => {
            setAuthTokens(res.data);
            setUser(jwtDecode(res.data.access));
            localStorage.setItem('authTokens', JSON.stringify(res.data));
            getStatus(setLoading);
        })
        .catch ( err => {
            console.log(err);
            setLoading(false);
        })
    };
    
    const registerUser = (data, setLoading) => {
        setLoading(true);
        defaultInstance.post('register', data)
        .then( () =>{
            logInUser({ email : data.email, password : data.password}, setLoading)
        })
        .catch( err => {
            console.log('Error during registration: ', err)
        })
    };

    const values = {
        user:user,
        setUser:setUser,
        authTokens:authTokens,
        logInUser:logInUser,
        registerUser:registerUser
    }


    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;