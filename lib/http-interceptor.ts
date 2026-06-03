import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

export const setupInterceptors = (client: AxiosInstance) => {
    client.interceptors.response.use(
        (response) => {
            return response;

        }, async (error: AxiosError | any) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & {
                retry?: boolean;
            };

            if (error.response?.status === 401) {
                if (originalRequest?.url === 'v0/user/profile' && !originalRequest.retry &&
                    error.response.data && (error.response.data.message === 'Invalid or expired token' ||
                        error.response.data.message === 'Access token missing')
                ) {
                    originalRequest.retry = true;
                    await client.post('v0/auth/refresh-token');
                    return client(originalRequest);
                }
            } else if (error.response?.status === 429) {

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



