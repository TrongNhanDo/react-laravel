import axios from 'axios';

export const callApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: import.meta.env.VITE_API_TIMEOUT,
    headers: {
        Accept: 'application/json',
    },
});
