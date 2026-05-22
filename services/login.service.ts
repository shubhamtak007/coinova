import { coinovaBackendClient } from '@/lib/api-client';

type BodyJson = {
    name: string,
    email: string,
    password: string
}

async function signUp(apiBody: BodyJson) {
    try {
        const response = await coinovaBackendClient.post(`v0/auth/sign-up`, apiBody);
        return response;
    } catch (error) {
        throw error;
    }
}

export { signUp }