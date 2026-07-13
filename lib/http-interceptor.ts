import { toast } from 'sonner';
import { AxiosInstance, InternalAxiosRequestConfig, isAxiosError } from 'axios';

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

            if (error.response?.data && error.response.data.message) {
                if (['Access token missing', 'Invalid or expired token'].includes(error.response.data.message)) {
                    originalRequest.retry = true;
                    await client.post(endpoints.getRefreshToken);
                    return client(originalRequest);

                } else {
                    toast.error(error.response.data.message, { className: 'error-toast' });
                }
            } else {
                throw new Error(error.message);
            }

            return Promise.reject(error);
        }
    )
}



