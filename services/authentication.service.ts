import { coinovaBackendClient } from '@/lib/api-client';

type SignUpApiBodyType = {
    name: string,
    email: string,
    password: string
}

const AuthenticationService = {
    signUp: async (apiBody: SignUpApiBodyType) => {
        try {
            const response = await coinovaBackendClient.post(`v0/auth/sign-up`, apiBody);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthenticationService;