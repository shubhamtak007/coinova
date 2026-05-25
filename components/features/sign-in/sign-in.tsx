import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogContent } from '@/components/ui/dialog';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useForm, useStore } from '@tanstack/react-form';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';

type Bindings = {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

export default function signIn(bindings: Bindings) {
    const { showDialog, setShowDialog } = bindings;
    const [formType, setFormType] = useState<string>('signIn');

    useEffect(() => {
        return (() => {
            signInForm.reset();
        })
    }, []);

    const signInForm = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        }, onSubmit: async ({ value }) => {
            console.log(value)
            console.log('submit');
        }, validators: {
            onChange: (event) => {

            }
        }
    });

    return (
        <Dialog
            open={showDialog}
            onOpenChange={setShowDialog}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Join Coinova Today

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
                                                    id={field.name}
                                                    required={true}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    placeholder={'Enter Password'}
                                                />
                                            </InputGroup>
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
                                        disabled={!canSubmit || isSubmitting}
                                    >
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
                                signInForm.reset();
                            }}
                        >
                            {formType === 'signIn' ? 'Sign up' : 'Sign in'}
                        </a>
                    </div>
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}