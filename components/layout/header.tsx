'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { Coins } from 'lucide-react';
import Link from 'next/link';
import NavigationTabBar from '@/components/layout/navigation-tab-bar';
import useHeader from '@/hooks/useHeader';
import AccountCentre from '@/components/features/account/account-centre';
import CoinSearchDialog from '@/components/features/coin-search/coin-search-dialog';
import { cnvIconStrokeWidth } from '@/constants/app.constants';
import { Search } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

type SearchDialogBindings = {
    showSearchDialog: boolean,
    setShowSearchDialog: Dispatch<SetStateAction<boolean>>
}

function Header() {
    const { scrolled, showTabBar, showSearchDialog, setShowSearchDialog } = useHeader();

    return (
        <div className={`header-container ${scrolled ? 'with-shadow' : ''}`}>
            <div className="navbar max-w-[calc(var(--container-width)_-_20px)] mx-auto">
                <Link href="/" className="logo uppercase flex items-center">
                    <Coins
                        strokeWidth={cnvIconStrokeWidth}
                        size={30}
                        className="pr-[4px]"
                    />

                    <div className="tracking-[1px]">
                        Coinova
                    </div>
                </Link>

                {showTabBar === true && <div className="m-auto">
                    <NavigationTabBar />
                </div>}

                <div className="header-right-side-container">
                    <div
                        className="hover:cursor-pointer"
                        onClick={() => { setShowSearchDialog(true); }}
                    >
                        <Search className="size-5" strokeWidth={cnvIconStrokeWidth} />
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
                            strokeWidth={cnvIconStrokeWidth}
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