import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'sonner';

export const setupInterceptors = (client: AxiosInstance) => {
    client.interceptors.response.use(
        (response) => {
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

function showError(error: unknown) {
    if (axios.isAxiosError(error) && error.message) {
        console.error(error.message);
    }
}



