import { coinovaClientV2 } from '@/lib/api-client';

async function retrieveProfile() {
    try {
        const response = await coinovaClientV2.get(`v0/users/me`);
        return response;
    } catch (error) {
        throw error;
    }
};

export { retrieveProfile };