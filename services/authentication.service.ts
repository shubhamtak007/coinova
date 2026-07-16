import { coinovaClientV2 } from '@/lib/api-client';
import { coinovaEndpoints } from '@/lib/endpoints';

type SignUpApiBody = {
    name: string,
    email: string,
    password: string
}

async function signUp(apiBody: SignUpApiBody) {
    try {
        const response = await coinovaClientV2.post(coinovaEndpoints.auth.signUp, apiBody);
        return response;
    } catch (error) {
        throw error;
    }
};

async function signIn(apiBody: { email: string, password: string }) {
    try {
        const response = await coinovaClientV2.post(coinovaEndpoints.auth.signIn, apiBody);
        return response;
    } catch (error) {
        throw error;
    }
};

async function signOut() {
    try {
        const response = await coinovaClientV2.post(coinovaEndpoints.auth.signOut);
        return response;
    } catch (error) {
        throw error;
    }
};

async function refreshToken() {
    try {
        const response = await coinovaClientV2.post(coinovaEndpoints.auth.refreshToken);
        return response;
    } catch (error) {
        throw error;
    }
};

async function forgotPassword(jsonData: object) {
    try {
        const response = await coinovaClientV2.post(coinovaEndpoints.auth.forgotPassword, jsonData);
        return response;
    } catch (error) {
        throw error;
    }
}

async function verifyResetCode(jsonData: object) {
    try {
        const response = await coinovaClientV2.post(coinovaEndpoints.auth.verifyResetCode, jsonData);
        return response;
    } catch (error) {
        throw error;
    }
}

async function changePassword(jsonData: object) {
    try {
        const response = await coinovaClientV2.patch(coinovaEndpoints.auth.changePassword, jsonData);
        return response;
    } catch (error) {
        throw error;
    }
}

export { signUp, signIn, refreshToken, signOut, forgotPassword, verifyResetCode, changePassword };