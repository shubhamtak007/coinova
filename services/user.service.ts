import { coinovaClientV2 } from '@/lib/api-client';


async function retrieveProfile() {
    try {
        const response = await coinovaClientV2.get(`v0/user/profile`);
        return response;
    } catch (error) {
        throw error;
    }
};

const UserService = { retrieveProfile };

export default UserService;