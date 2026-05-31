'use client';

import { z } from 'zod';
import { useState } from 'react';
import AuthenticationService from '@/services/authentication.service';

type Bindings = {
    password: string,
    formType: string
}

export default function useSignIn({ password, formType }: Bindings) {
    const [authenticatingUser, setAuthenticatingUser] = useState<boolean>(false);

    const passwordCriteriaList = {
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!?<>@#$%]/.test(password),
        length: password.length >= 8,
    };

    const userFormSchema = z.object({
        fullName: formType === 'signUp' ? z.string().min(2) : z.string().nullable(),
        email: z.email().min(5),
        password: z.string().min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Must contain an uppercase letter')
            .regex(/[a-z]/, 'Must contain a lowercase letter')
            .regex(/[0-9]/, 'Must contain a number')
            .regex(/[!?<>@#$%]/, 'Must contain a special character'),
    })

    async function authenticateUser(formType: string, userDetails: { fullName: string, email: string, password: string }) {
        try {
            const serverUser = {
                name: userDetails.fullName,
                email: userDetails.email,
                password: userDetails.password
            };

            const promise = formType === 'signIn' ? AuthenticationService.signIn({ email: userDetails.email, password: userDetails.password }) :
                formType === 'signUp' ? AuthenticationService.signUp(serverUser) : null;
            const response = await promise;
        } catch (error) {

        } finally {

        }
    }

    return {
        passwordCriteriaList, userFormSchema, authenticateUser
    }
}