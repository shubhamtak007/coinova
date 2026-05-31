'use client';

import { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SignIn from '@/components/features/sign-in/sign-in';
import BottomTabBar from '@/components/layout/bottom-tab-bar';

function Header() {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [showBottomTabBar, setShowBottomTabBar] = useState<boolean>(false);
    const [showSignInDialog, setShowSignInDialog] = useState(false);

    useEffect(() => {
        if (window.innerWidth > 1080) setShowBottomTabBar(true);

        const handleWindowSize = () => {
            if (window.innerWidth > 1080) {
                setShowBottomTabBar(true);
            } else {
                setShowBottomTabBar(false);
            }
        }

        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('resize', handleWindowSize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleWindowSize);
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <>
            <div className={`header-container ${scrolled ? 'with-shadow' : ''}`}>
                <div className="navbar max-w-[calc(var(--container-width)_-_20px)] mx-auto">
                    <Link href="/" className="logo uppercase flex items-center">
                        <Coins
                            strokeWidth={2}
                            size={30}
                            className="pr-[4px]"
                        />

                        <div className="tracking-[1px]">
                            Coinova
                        </div>
                    </Link>

                    {showBottomTabBar === true && <div className="m-auto">
                        <BottomTabBar />
                    </div>}

                    <div className="w-[130px] invisible">
                        <Button
                            className="hidden"
                            variant="outline"
                            onClick={() => setShowSignInDialog(true)}
                        >
                            Sign in
                        </Button>
                    </div>
                </div>
            </div>

            {
                <SignIn
                    showDialog={showSignInDialog}
                    setShowDialog={setShowSignInDialog}
                />
            }
        </>
    )
}

export default Header;