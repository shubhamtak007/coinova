import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'sonner';

export const setupInterceptors = (client: AxiosInstance) => {
    if (client.defaults.baseURL?.includes('coinova-backend')) {
        client.interceptors.request.use((config) => {
            const accessToken = localStorage.getItem("xat");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        })
    }

    client.interceptors.response.use(
        (response) => {
            if (client.defaults.baseURL?.includes('coinova-backend')) {
                console.log(response.headers);
                const at = response.headers['x-access-token'];
                if (at) {
                    localStorage.setItem("xat", at);
                }
            }
            return response;
        },
        (error: AxiosError) => {
            if (error.response?.status === 429) {

            } else if (error.code === 'ERR_NETWORK') {

            }

            showError(error);
            // toast.error(error.message, { className: 'error-toast' });
            return Promise.reject(error);
        }
    )
}

function showError(error: AxiosError) {
    if (axios.isAxiosError(error) && error.message) {
        console.error(error.message);
    }
}



