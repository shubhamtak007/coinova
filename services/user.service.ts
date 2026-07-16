import { coinovaClientV2 } from '@/lib/api-client';
import { coinovaEndpoints } from '@/lib/endpoints';

async function retrieveProfile() {
    try {
        const response = await coinovaClientV2.get(coinovaEndpoints.users.me);
        return response;
    } catch (error) {
        throw error;
    }
};

export { retrieveProfile };