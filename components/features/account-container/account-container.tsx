import { useState } from 'react';
import { useUser } from '@/contexts/user.context';
import { useLoading } from '@/contexts/loading.context';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import SignIn from '@/components/features/sign-in/sign-in';
import AuthenticationService from '@/services/authentication.service';

function AccountContainer() {
    const [showSignInDialog, setShowSignInDialog] = useState(false);
    const { isLoading, setIsLoading } = useLoading();
    const { user, setUser } = useUser();

    async function logoutUser() {
        try {
            setIsLoading(true);
            const response = await AuthenticationService.signOut();
            if (response.status === 200) {
                setUser(null);
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-[130px] flex justify-end">
            {
                isLoading === true ?
                    <></> :
                    (
                        (user && user.id) ?
                            <div className="profile-container">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="user-icon">
                                            {user.name[0].toUpperCase()}
                                        </div>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        align="start"
                                        className="m-[14px_4px_30px_10px]"
                                    >
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>

                                            {/* <DropdownMenuItem>
                                                Details
                                            </DropdownMenuItem> */}
                                        </DropdownMenuGroup>

                                        <DropdownMenuSeparator />

                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => { logoutUser() }}>
                                                Log out
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            :
                            <Button
                                variant="outline"
                                onClick={() => setShowSignInDialog(true)}
                            >
                                Sign in
                            </Button>
                    )
            }

            {
                <SignIn
                    showDialog={showSignInDialog}
                    setShowDialog={setShowSignInDialog}
                />
            }
        </div>
    )
}

export default AccountContainer;