import { useState, Dispatch, SetStateAction } from 'react';
import { useUser } from '@/contexts/user.context';
import { useLoading } from '@/contexts/loading.context';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { CircleUserRound } from 'lucide-react';
import ProfileDialog from './profile-dialog';
import SignIn from '@/components/features/sign-in/sign-in';
import { signOut } from '@/services/authentication.service';
import { cnvIconStrokeWidth } from '@/constants/app.constants';

type PdBindings = {
    setShowSignInDialog: Dispatch<SetStateAction<boolean>>
}

function AccountCentre() {
    const [showSignInDialog, setShowSignInDialog] = useState(false);
    const { isLoading } = useLoading();

    return (
        <div className="account-container">
            {
                isLoading === true ?
                    <Skeleton className="w-[36px] h-[33px] rounded-[var(--border-radius)]" />
                    : <ProfileDropdown setShowSignInDialog={setShowSignInDialog} />
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

function ProfileDropdown(pdBindings: PdBindings) {
    const { setShowSignInDialog } = pdBindings;
    const { setIsLoading } = useLoading();
    const { user, setUser } = useUser();
    const [openProfileDialog, setOpenProfileDialog] = useState<boolean>(false);

    async function logoutUser() {
        try {
            setIsLoading(true);
            const response = await signOut();
            if (response.status === 200) {
                setUser(null);
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            {
                (user && user.id) ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="user-icon">
                                <CircleUserRound
                                    style={{ color: 'var(--text-color)' }}
                                    className="size-5"
                                    strokeWidth={cnvIconStrokeWidth}
                                />
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="center"
                            className="m-[16px_5px_30px_10px]"
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => { setOpenProfileDialog(true) }}>
                                    Profile
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => { logoutUser() }}>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    : <Button
                        className="sign-in-btn"
                        onClick={() => setShowSignInDialog(true)}
                    >
                        Sign in
                    </Button>
            }

            {
                <ProfileDialog
                    openDialog={openProfileDialog}
                    setOpenDialog={setOpenProfileDialog}
                />
            }
        </div>
    )
}

export default AccountCentre;