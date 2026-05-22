'use client';

import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { signUp } from '@/services/login.service';

type Bindings = {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

function Login({ showDialog, setShowDialog }: Bindings) {
    useEffect(() => {
        return () => {
            setShowDialog(false);
        };
    }, []);

    async function signUpUser() {
        try {
            const response = await signUp({ name: 'working', email: 'working', password: 'working' })
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {

        }
    }

    return (
        <>
            <Dialog
                open={showDialog}
                onOpenChange={setShowDialog}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div>
                                Login
                            </div>

                            <DialogDescription className="sr-only">
                                Login
                            </DialogDescription>
                        </DialogTitle>
                    </DialogHeader>

                    <DialogBody>
                        <div className="mb-[12px]">
                            <label className="label">Name</label>
                            <InputGroup>
                                <InputGroupInput
                                    placeholder="Enter Name"
                                />
                            </InputGroup>
                        </div>

                        <div className="mb-[12px]">
                            <label className="label">Email</label>
                            <InputGroup>
                                <InputGroupInput
                                    placeholder="Enter Email"
                                />
                            </InputGroup>
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <InputGroup>
                                <InputGroupInput
                                    placeholder="Enter Password"
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
                    </DialogBody>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Login;