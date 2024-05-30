import axios from 'axios';

const defaultInstance = axios.create({
    baseURL : 'http://127.0.0.1:8000/',
    headers : {
        'Content-Type' : 'application/json',
    }
});

defaultInstance.interceptors.request.use( 
    (config) => {

        const token = JSON.parse(localStorage.getItem('authTokens'));
        if(token) {
            config.headers['Authorization'] = 'Bearer ' + String(token.access);
        }

        return config;
    }
);

export default defaultInstance;