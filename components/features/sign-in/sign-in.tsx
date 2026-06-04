import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogContent } from '@/components/ui/dialog';
import { useState, useEffect, Dispatch, SetStateAction, memo } from 'react';
import { useForm } from '@tanstack/react-form';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { EyeOff, Eye, Circle } from 'lucide-react';
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from '@/components/ui/spinner';
import useSignIn from '@/hooks/useSignIn';

type Bindings = {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

export default memo(function signIn(bindings: Bindings) {
    const { showDialog, setShowDialog } = bindings;
    const [formType, setFormType] = useState<'signIn' | 'signUp'>('signIn');
    const [showEyeIcon, setShowEyeIcon] = useState<boolean>(true);
    const [password, setPassword] = useState('');
    const { passwordCriteriaList, userFormSchema, authenticateUser, signingIn } = useSignIn({ password, formType, setShowDialog });

    useEffect(() => {
        if (showDialog === false) {
            setFormType('signIn');
            resetForm();
        }
    }, [showDialog])

    const signInForm = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        },

        validators: {
            onChange: userFormSchema as any,
            onMount: userFormSchema as any
        },

        onSubmit: async ({ value }) => {
            authenticateUser(formType, value);
        },
    });

    function resetForm() {
        setPassword('');
        signInForm.reset();
        signInForm.mount();
    }

    return (
        <Dialog
            open={showDialog}
            onOpenChange={(showDialog) => {
                setShowDialog(showDialog);
            }}
        >
            <DialogContent>
                <DialogHeader disableCloseButton={signingIn}>
                    <DialogTitle>
                        {formType === 'signIn' ? 'Sign in your account' : 'Get Started - Create a new account'}

                        <DialogDescription className="sr-only">
                            sign-{formType === 'signIn' ? 'in' : 'up'} dialog
                        </DialogDescription>
                    </DialogTitle>
                </DialogHeader>

                <DialogBody>
                    <form
                        className="sign-in-form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            signInForm.handleSubmit();
                        }}
                    >
                        {formType === 'signUp' && <div className="form-group">
                            <signInForm.Field
                                name="fullName"
                                validators={{}}
                                children={(field) => {
                                    return (
                                        <>
                                            <label htmlFor={field.name}>
                                                Name<span className="required">*</span>
                                            </label>
                                            <InputGroup>
                                                <InputGroupInput
                                                    id={field.name}
                                                    required={true}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    placeholder={'Your name'}
                                                    autoFocus={formType === 'signUp' && true}
                                                    disabled={signingIn}
                                                />
                                            </InputGroup>
                                        </>
                                    )
                                }}
                            />
                        </div>}

                        <div className="form-group">
                            <signInForm.Field
                                name="email"
                                validators={{}}
                                children={(field) => {
                                    return (
                                        <>
                                            <label htmlFor={field.name}>
                                                Email<span className="required">*</span>
                                            </label>
                                            <InputGroup>
                                                <InputGroupInput
                                                    id={field.name}
                                                    required={true}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => { field.handleChange(e.target.value); }}
                                                    placeholder={'you@example.com'}
                                                    autoFocus={formType === 'signIn' && true}
                                                    disabled={signingIn}
                                                />
                                            </InputGroup>
                                        </>
                                    )
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <signInForm.Field
                                name="password"
                                validators={{}}
                                children={(field) => {
                                    return (
                                        <>
                                            <label htmlFor={field.name}>
                                                Password<span className="required">*</span>
                                            </label>

                                            <InputGroup>
                                                <InputGroupInput
                                                    type={`${showEyeIcon === true ? 'password' : 'text'}`}
                                                    id={field.name}
                                                    required={true}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => {
                                                        field.handleChange(e.target.value);
                                                        if (formType === 'signUp') { setPassword(e.target.value) }
                                                    }}
                                                    placeholder={'Enter Password'}
                                                    disabled={signingIn}
                                                />

                                                <InputGroupAddon
                                                    align={'inline-end'}
                                                    onClick={() => { setShowEyeIcon(!showEyeIcon); }}
                                                >
                                                    {showEyeIcon === true ? <Eye /> : <EyeOff />}
                                                </InputGroupAddon>
                                            </InputGroup>

                                            {formType === 'signUp' &&
                                                <div
                                                    className="password-criteria-container"
                                                >
                                                    <div>
                                                        {passwordCriteriaList.uppercase ? <FaCheckCircle /> : <Circle />}
                                                        <div>Uppercase letter</div>
                                                    </div>

                                                    <div>
                                                        {passwordCriteriaList.lowercase ? <FaCheckCircle /> : <Circle />}
                                                        <div>
                                                            Lowercase letter
                                                        </div>
                                                    </div>

                                                    <div>
                                                        {passwordCriteriaList.number ? <FaCheckCircle /> : <Circle />}
                                                        <div>
                                                            Number
                                                        </div>
                                                    </div>

                                                    <div>
                                                        {passwordCriteriaList.special ? <FaCheckCircle /> : <Circle />}
                                                        <div>Special character (e.g. !?&lt;&gt;@#$%)</div>
                                                    </div>

                                                    <div>
                                                        {passwordCriteriaList.length ? <FaCheckCircle /> : <Circle />}
                                                        <div>8 characters or more</div>
                                                    </div>
                                                </div>}
                                        </>
                                    )
                                }}
                            />
                        </div>

                        <div className="text-center">
                            <signInForm.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                            >
                                {([canSubmit, isSubmitting]) => (
                                    <Button
                                        type="submit"
                                        disabled={!signInForm.state.isValid || !canSubmit || isSubmitting || signingIn}
                                    >
                                        {signingIn && <Spinner className="size-4" />}
                                        Sign {formType === 'signIn' ? 'in' : 'up'}
                                    </Button>
                                )}
                            </signInForm.Subscribe>
                        </div>
                    </form>

                    <div
                        className="text-center text-[12px]"
                    >
                        {formType === 'signIn' ? 'Don’t have an account?' : 'Have an account?'}
                        <a
                            className="underline cursor-pointer ml-[3px]"
                            onClick={() => {
                                setFormType(formType === 'signIn' ? 'signUp' : 'signIn');
                                resetForm();
                            }}
                        >
                            {formType === 'signIn' ? 'Sign up' : 'Sign in'}
                        </a>
                    </div>
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
})


