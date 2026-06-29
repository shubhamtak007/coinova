'use client';

import { SetStateAction, Dispatch, useEffect, useState, useRef } from 'react';
import { useUser } from '@/contexts/user.context';
import { useLoading } from '@/contexts/loading.context';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { useForm } from '@tanstack/react-form';
import type { UserFormData, FormTypes } from '@/interfaces/account-centre.interface';
import AuthenticationService from '@/services/authentication.service';
import UserService from '@/services/user.service';
import authenticationFormSchemaMap from '@/schemas/authentication-form.schema';
import { CaptchaData } from '@/interfaces/captcha.interface';

type Bindings = {
    defaultFormType: typeof FormTypes,
    formType: string,
    setFormType: Dispatch<SetStateAction<typeof FormTypes>>,
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

export default function useSignIn(bindings: Bindings) {
    const { formType, setShowDialog, showDialog, setFormType, defaultFormType } = bindings;
    const [submittingData, setSubmittingData] = useState<boolean>(false);
    const [captchaData, setCaptchaData] = useState<CaptchaData | null>(null);
    const { setUser } = useUser();
    const { setIsLoading } = useLoading();
    const formData = useRef<UserFormData | null>(null);
    let emailRef = useRef<string>(null);
    let passwordCriteriaList = useRef<{ name: string; criteria: RegExp; }[]>([]);

    function handleCaptchaData(childCaptchaData: CaptchaData) {
        setCaptchaData(childCaptchaData);
    }

    const signInForm = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            code: ''
        },

        validators: {
            onChange: authenticationFormSchemaMap[formType] as any,
            onMount: authenticationFormSchemaMap[formType] as any
        },

        onSubmit: async ({ value }) => {
            setSubmittingData(true);
            formData.current = value;

            if (['signIn', 'signUp'].includes(formType)) {
                captchaData?.ref.current?.execute();
            } else {
                onFormSubmit(formData?.current);
            }
        }
    });

    useEffect(() => {
        if (!showDialog) return;

        resetForm();
        setFormType(defaultFormType);
    }, [showDialog]);


    useEffect(() => {
        if (captchaData?.token && formData.current) onFormSubmit(formData.current);
    }, [captchaData?.token]);

    useEffect(() => {
        resetForm();

        if (['verifyResetCode'].includes(formType) && emailRef.current) {
            signInForm.setFieldValue('email', emailRef.current);
        }
    }, [formType]);

    function resetForm() {
        signInForm.reset();
        signInForm.mount();
    };

    useEffect(() => {
        passwordCriteriaList.current = [
            { name: 'Uppercase letter', criteria: /[A-Z]/ },
            { name: 'Lowercase letter', criteria: /[a-z]/ },
            { name: 'Number', criteria: /[0-9]/ },
            { name: 'Special character (e.g. !?&lt;&gt;@#$%)', criteria: /[!?<>@#$%]/ },
            { name: '8 characters or more', criteria: /^\S{9,}$/ }
        ]
    }, []);

    async function authenticateUser(userDetails: UserFormData) {
        try {
            let response;

            switch (formType) {
                case 'signIn': {
                    const serverData = {
                        email: userDetails.email,
                        password: userDetails.password,
                        captchaToken: captchaData?.token
                    }
                    response = await AuthenticationService.signIn(serverData);
                }; break;

                case 'signUp': {
                    const serverData = {
                        name: userDetails.name,
                        email: userDetails.email,
                        password: userDetails.password,
                        captchaToken: captchaData?.token
                    }
                    response = await AuthenticationService.signUp(serverData);
                }; break;

                default: throw new Error('Invalid form type');
            }

            if (response.status === 200) {
                displaySuccessNotification(response);
                fetchProfile();
                setShowDialog(false);
            }
        } catch (error: unknown) {
            throwError(error);
        } finally {
            setSubmittingData(false);
        }
    }

    async function fetchProfile() {
        try {
            setIsLoading(true);
            const response = await UserService.retrieveProfile();
            if (response.data.data.id) setUser(response.data.data);
        } catch (error) {
            throwError(error);
        } finally {
            setIsLoading(false);
        }
    }

    function onFormSubmit(userDetails: UserFormData) {
        switch (formType) {
            case 'signIn': authenticateUser(userDetails); break;
            case 'signUp': authenticateUser(userDetails); break;
            case 'forgotPassword': getResetCode(userDetails); break;
            case 'verifyResetCode': resetCodeVerification(userDetails); break;
            case 'changePassword': updatePassword(userDetails); break;
            default: return;
        }
    }

    async function getResetCode(userDetails: UserFormData) {
        emailRef.current = userDetails.email;

        try {
            const response = await AuthenticationService.retrieveResetCode({ email: userDetails.email });
            displaySuccessNotification(response);
            setFormType('verifyResetCode');
        } catch (error) {
            throwError(error);
        } finally {
            setSubmittingData(false);
        }
    }

    async function resetCodeVerification(userDetails: UserFormData) {
        try {
            const serverData = {
                email: userDetails.email,
                resetCode: userDetails.code
            }

            const response = await AuthenticationService.verifyResetCode(serverData);
            displaySuccessNotification(response);
            setFormType('changePassword');
        } catch (error) {
            throwError(error);
        } finally {
            setSubmittingData(false);
        }
    }

    async function updatePassword(userDetails: UserFormData) {
        try {
            const response = await AuthenticationService.changePassword({ password: userDetails.password });
            displaySuccessNotification(response);
            setFormType('signIn');
        } catch (error) {
            throwError(error);
        } finally {
            setSubmittingData(false);
        }
    }

    const displaySuccessNotification = (response: { status: number, data: { message: string } }) => {
        if (!response || response.status !== 200) return;
        toast.success(`${response.data.message}`, { className: 'success-toast' });
    }

    function throwError(error: unknown) {
        let errorMessage;
        if (error instanceof Error) errorMessage = error.message;
        if (isAxiosError(error)) errorMessage = error.response?.data.message;
        toast.error(errorMessage, { className: 'error-toast' });
    }

    return {
        signInForm, passwordCriteriaList, submittingData, resetForm, handleCaptchaData
    }
}