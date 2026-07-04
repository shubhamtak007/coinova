'use client';

import { useEffect, useState } from 'react';
import { userScreenWidth } from '@/constants/app.constants';

export default function useHeader() {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [showTabBar, setShowTabBar] = useState<boolean>(false);
    const [showSearchDialog, setShowSearchDialog] = useState<boolean>(false);

    useEffect(() => {
        if (window.innerWidth > userScreenWidth) setShowTabBar(true);

        const handleWindowSize = () => {
            if (window.innerWidth > userScreenWidth) {
                setShowTabBar(true);
            } else {
                setShowTabBar(false);
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
    }, []);

    return { scrolled, setScrolled, showTabBar, setShowTabBar, showSearchDialog, setShowSearchDialog };
}