import { secretTerminalClientV2 } from '@/lib/api-client';
import { secretTerminalEndpoints } from '@/lib/endpoints';

async function retrieveProfile() {
    try {
        const response = await secretTerminalClientV2.get(secretTerminalEndpoints.users.me);
        return response;
    } catch (error) {
        throw error;
    }
};

export { retrieveProfile };