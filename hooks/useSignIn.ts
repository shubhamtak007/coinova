'use client';

import { z } from 'zod';
import { SetStateAction, Dispatch } from 'react';
import { useUser } from '@/contexts/user.context';
import { useLoading } from '@/contexts/loading.context';
import { useState } from 'react';
import { toast } from 'sonner';
import AuthenticationService from '@/services/authentication.service';
import UserService from '@/services/user.service';
import axios, { isAxiosError } from 'axios';

type Bindings = {
    password: string,
    formType: string,
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

export default function useSignIn({ password, formType, setShowDialog }: Bindings) {
    const { setUser } = useUser();
    const { setIsLoading } = useLoading();
    const [signingIn, setSigningIn] = useState<boolean | false>(false);

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
            setSigningIn(true);
            let response;
            const serverUser = { email: userDetails.email, password: userDetails.password };

            switch (formType) {
                case 'signIn': response = await AuthenticationService.signIn(serverUser); break;
                case 'signUp': response = await AuthenticationService.signUp({ name: userDetails.fullName, ...serverUser }); break;
                default: throw new Error('Invalid form type');
            }

            if (response.status === 200) {
                toast.success(
                    `${formType === 'signIn' ? `Welcome back! Glad to see you again.` :
                        'Welcome to Coinova! Your account is ready.'}`,
                    { className: 'success-toast' }
                );
                fetchProfile();
                setShowDialog(false);
            }
        } catch (error: unknown) {
            if (!isAxiosError(error)) throw new Error(JSON.stringify(error));
            toast.error(error.response?.data.message, { className: 'error-toast' });
        } finally {
            setSigningIn(false);
        }
    }

    async function fetchProfile() {
        try {
            setIsLoading(true);
            const response = await UserService.retrieveProfile();
            if (response.data.data.id) setUser(response.data.data);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    return {
        passwordCriteriaList, userFormSchema, authenticateUser, signingIn
    }
}