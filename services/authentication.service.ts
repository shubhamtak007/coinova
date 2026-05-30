import { coinovaClientV2 } from '@/lib/api-client';

type SignUpApiBodyType = {
    name: string,
    email: string,
    password: string
}

const AuthenticationService = {
    signUp: async (apiBody: SignUpApiBodyType) => {
        try {
            const response = await coinovaClientV2.post(`v0/auth/sign-up`, apiBody);
            return response;
        } catch (error) {
            throw error;
        }
    },

    signIn: async (apiBody: { email: string, password: string }) => {
        try {
            const response = await coinovaClientV2.post(`v0/auth/sign-in`, apiBody);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthenticationService;