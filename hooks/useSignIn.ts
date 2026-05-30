'use client';

import { z } from 'zod';

type Bindings = {
    password: string
}

export default function useSignIn({ password }: Bindings) {
    const passwordCriteriaList = {
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!?<>@#$%]/.test(password),
        length: password.length >= 8,
    };

    const signFormValidations = z.object({
        fullName: z.string().min(2),
        email: z.email().min(5),
        password: z.string().min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Must contain an uppercase letter')
            .regex(/[a-z]/, 'Must contain a lowercase letter')
            .regex(/[0-9]/, 'Must contain a number')
            .regex(/[!?<>@#$%]/, 'Must contain a special character'),
    })

    return {
        passwordCriteriaList, signFormValidations
    }
}