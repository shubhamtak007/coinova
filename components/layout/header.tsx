'use client';

import { useState } from 'react';
import { Coins } from 'lucide-react';
import Link from 'next/link';
import BottomTabBar from '@/components/layout/bottom-tab-bar';
import useHeader from '@/hooks/useHeader';
import AccountContainer from '@/components/features/account-container/account-container';

function Header() {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [showBottomTabBar, setShowBottomTabBar] = useState<boolean>(false);
    const { } = useHeader({ setShowBottomTabBar, setScrolled });

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

                    <AccountContainer />
                </div>
            </div>
        </>
    )
}

export default Header;