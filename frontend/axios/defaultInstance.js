import axios from 'axios';

const defaultInstance = axios.create({
    baseURL : 'http://localhost:3000/',
    headers : {
        'Content-Type' : 'application/json',
    }
});

defaultInstance.interceptors.request.use( 
    (config) => {

        const token = localStorage.getItem('authTokens');
        if(token) {
            config.headers['Authorization'] = 'Bearer' + token.access;
        }

        return config;
    }
);

export default defaultInstance;