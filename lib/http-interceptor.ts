import ErrorService from '@/services/error.service';
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, isAxiosError } from 'axios';
import { toast } from 'sonner';

const endpoints = {
    getUser: 'v0/users/me',
    getRefreshToken: 'v0/auth/refresh-token'
}

export const setupInterceptors = (client: AxiosInstance) => {
    client.interceptors.response.use(
        (response) => {
            if ((response.status === 200) && response.data.message &&
                response.config.method && ['post', 'put', 'patch', 'delete'].includes(response.config.method)
                && (response.config.url !== endpoints.getRefreshToken)
            ) {
                toast.success(`${response.data.message}`, { className: 'success-toast' });
            }

            return response;

        }, async (error: unknown) => {
            if (!isAxiosError(error)) throw new Error(JSON.stringify(error));

            const originalRequest = error.config as InternalAxiosRequestConfig & {
                retry?: boolean;
            };

            if (error.response?.status === 401) {
                if (error.response.data && (error.response.data.message === 'Invalid or expired token' ||
                    error.response.data.message === 'Access token missing')
                ) {
                    originalRequest.retry = true;
                    await client.post(endpoints.getRefreshToken);
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



