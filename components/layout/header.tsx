'use client';

import { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';
import GlobalMarketStats from '@/components/features/global-market/global-market-stats';
import Link from 'next/link';

function Header() {
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => { window.removeEventListener('scroll', handleScroll) }
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

                    <div>
                        <GlobalMarketStats />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;