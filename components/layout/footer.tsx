'use client';

import GlobalMarketStats from "@/components/features/global-market/global-market-stats";
import BottomTabBar from "./bottom-tab-bar";
import { useState, useEffect } from 'react';

function Footer() {
    const [showBottomTabBar, setShowBottomTabBar] = useState<boolean>(false);

    useEffect(() => {
        if (window.innerWidth <= 1080) setShowBottomTabBar(true);

        const handleWindowSize = () => {
            if (window.innerWidth <= 1080) {
                setShowBottomTabBar(true);
            } else {
                setShowBottomTabBar(false);
            }
        }

        window.addEventListener('resize', handleWindowSize);
        return (() => { window.removeEventListener('resize', handleWindowSize) })
    }, [])

    return (
        <footer>
            <div className="bottom-sticky-container">
                {showBottomTabBar === true && <BottomTabBar />}
                <div className="m-[6px]"></div>
                <GlobalMarketStats />
            </div>
        </footer>
    )
}

export default Footer;