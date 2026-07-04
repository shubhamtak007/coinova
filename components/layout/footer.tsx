'use client';

import GlobalMarketStats from "@/components/features/global-market/global-market-stats";
import BottomTabBar from "./navigation-tab-bar";
import { useState, useEffect } from 'react';
import { userScreenWidth } from "@/constants/app.constants";

function Footer() {
    const [showTabBar, setShowTabBar] = useState<boolean>(false);

    useEffect(() => {
        if (window.innerWidth <= userScreenWidth) setShowTabBar(true);

        const handleWindowSize = () => {
            if (window.innerWidth <= userScreenWidth) {
                setShowTabBar(true);
            } else {
                setShowTabBar(false);
            }
        }

        window.addEventListener('resize', handleWindowSize);
        return (() => { window.removeEventListener('resize', handleWindowSize) })
    }, [])

    return (
        <footer>
            <div className="bottom-sticky-container">
                {showTabBar === true && <BottomTabBar />}
                <div className="m-[6px]"></div>
                <GlobalMarketStats />
            </div>
        </footer>
    )
}

export default Footer;