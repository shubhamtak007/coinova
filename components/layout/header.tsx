'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { Coins } from 'lucide-react';
import Link from 'next/link';
import BottomTabBar from '@/components/layout/bottom-tab-bar';
import useHeader from '@/hooks/useHeader';
import AccountCentre from '@/components/features/account/account-centre';
import { Search } from 'lucide-react';
import CoinSearchDialog from '@/components/features/coin-search/coin-search-dialog';
import { FiGithub } from 'react-icons/fi';

type SearchDialogBindings = {
    showSearchDialog: boolean,
    setShowSearchDialog: Dispatch<SetStateAction<boolean>>
}

type Bindings = {

}

function Header(bindings: Bindings) {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [showBottomTabBar, setShowBottomTabBar] = useState<boolean>(false);
    const [showSearchDialog, setShowSearchDialog] = useState<boolean>(false);
    const { } = useHeader({ setShowBottomTabBar, setScrolled });

    return (
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

                <div className="header-right-side-container">
                    <div
                        className="hover:cursor-pointer"
                        onClick={() => { setShowSearchDialog(true); }}
                    >
                        <Search className="size-5" />
                        {(showSearchDialog === true) && showCoinSearchDialog({ showSearchDialog, setShowSearchDialog })}
                    </div>

                    <AccountCentre />

                    <a
                        href="https://github.com/shubhamtak007/coinova"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`max-h-[38px] max-w-[33px]`}
                    >
                        <FiGithub
                            className="size-4 m-auto"
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}

function showCoinSearchDialog({ showSearchDialog, setShowSearchDialog }: SearchDialogBindings) {
    return (
        <CoinSearchDialog
            showDialog={showSearchDialog}
            setShowDialog={setShowSearchDialog}
        />
    )
}

export default Header;