import { coinovaClientV2 } from '@/lib/api-client';
import { sign } from 'crypto';

type SignUpApiBodyType = {
    name: string,
    email: string,
    password: string
}

async function signUp(apiBody: SignUpApiBodyType) {
    try {
        const response = await coinovaClientV2.post(`v0/auth/sign-up`, apiBody);
        return response;
    } catch (error) {
        throw error;
    }
};

async function signIn(apiBody: { email: string, password: string }) {
    try {
        const response = await coinovaClientV2.post(`v0/auth/sign-in`, apiBody);
        return response;
    } catch (error) {
        throw error;
    }
};

async function signOut() {
    try {
        const response = await coinovaClientV2.post(`v0/auth/sign-out`);
        return response;
    } catch (error) {
        throw error;
    }
};

async function refreshToken() {
    try {
        const response = await coinovaClientV2.post(`v0/auth/refresh-token`);
        return response;
    } catch (error) {
        throw error;
    }
};

const AuthenticationService = { signUp, signIn, refreshToken, signOut };

export default AuthenticationService;