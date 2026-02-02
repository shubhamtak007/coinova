import { Coins } from 'lucide-react';
import GlobalMarketStats from '@/components/features/global-market-stats';
import Link from 'next/link';

function Header() {
    return (
        <>
            <div className="header-container">
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