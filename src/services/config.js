import Axios from 'axios';

const apiConfig = {
    backendUrl: 'http://localhost:3000',
};

export const api = Axios.create({
    baseURL: apiConfig.backendUrl
});

export const securedApi = Axios.create({
    baseURL: apiConfig.backendUrl
});

securedApi.interceptors.request.use(
    config => {
        console.log('config')
        const newConfig = config;
        if (localStorage.getItem('session_token')) {
            newConfig.data = {
                ...config.data,
                session_token: JSON.parse(localStorage.getItem('session_token'))
            }
        }
        return newConfig;
    },
    error => Promise.reject(error)
);
