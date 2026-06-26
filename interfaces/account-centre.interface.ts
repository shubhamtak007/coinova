let FormTypes: 'signIn' | 'signUp' | 'forgotPassword' | 'verifyResetCode' | 'changePassword';

type UserFormData = {
    name: string,
    email: string,
    password: string,
    code: string
};

type User = {
    id: string,
    name: string,
    email: string
}

export type { FormTypes, UserFormData, User };