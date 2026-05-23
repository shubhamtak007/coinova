'use client';

import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import useSignIn from '@/hooks/useSignIn';

type Bindings = {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

function SignIn({ showDialog, setShowDialog }: Bindings) {
    const { signUpUser } = useSignIn();

    useEffect(() => {
        return () => {
            setShowDialog(false);
        };
    }, []);

    return (
        <>
            <Dialog
                open={showDialog}
                onOpenChange={setShowDialog}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex items-center">
                                Join Coinova Today
                            </div>

                            <DialogDescription className="sr-only">
                                Login
                            </DialogDescription>
                        </DialogTitle>
                    </DialogHeader>

                    <DialogBody>
                        <form className="sign-in-form">
                            <div className="mb-[12px]">
                                <label className="label">Name<span className="required">*</span></label>
                                <InputGroup>
                                    <InputGroupInput
                                        placeholder="Enter Name"
                                        required={true}
                                    />
                                </InputGroup>
                            </div>

                            <div className="mb-[12px]">
                                <label className="label">Email<span className="required">*</span></label>
                                <InputGroup>
                                    <InputGroupInput
                                        placeholder="Enter Email"
                                        required={true}
                                    />
                                </InputGroup>
                            </div>

                            <div>
                                <label className="label">Password<span className="required">*</span></label>
                                <InputGroup>
                                    <InputGroupInput
                                        placeholder="Enter Password"
                                        required={true}
                                    />
                                </InputGroup>
                            </div>

                            <div className="text-center">
                                <Button
                                    className="mt-[12px] bg-[var(--main-color-2)]"
                                    type={'button'}
                                    onClick={() => { signUpUser(); }}
                                >
                                    Sign in
                                </Button>
                            </div>
                        </form>
                    </DialogBody>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SignIn;