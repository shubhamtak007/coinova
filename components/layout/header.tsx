import { Coins } from 'lucide-react';
import GlobalMarketStats from '@/components/features/global-market-stats';

function Header() {
    return (
        <>
            <div className="header-container">
                <div className="navbar max-w-6xl mx-auto">
                    <div className="logo uppercase flex items-center">
                        <Coins
                            strokeWidth={2}
                            size={30}
                            className="pr-[4px]"
                        />

                        <div className="tracking-[1px]">
                            Coinova
                        </div>
                    </div>

                    <div>
                        <GlobalMarketStats />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;