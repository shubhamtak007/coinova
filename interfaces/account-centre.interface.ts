let FormTypes: 'signIn' | 'signUp' | 'forgotPassword' | 'verifyResetCode' | 'changePassword';

type UserFormData = {
    name: string,
    email: string,
    password: string,
    code: string
};

export type { FormTypes, UserFormData };