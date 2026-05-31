import { coinovaClientV2 } from '@/lib/api-client';

const UserService = {
    getProfile: async () => {
        try {
            const response = await coinovaClientV2.post(`v0/user/user-profile`);
            return response;
        } catch (error) {
            throw error;
        }
    }
}