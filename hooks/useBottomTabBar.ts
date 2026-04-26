'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useOptimisticNavigation } from '@/contexts/navigation-context';

function useBottomTabBar() {
    const router = useRouter();
    const pathName = usePathname();
    const { navigateOptimistically } = useOptimisticNavigation();
    const [activeTab, setActiveTab] = useState<string>('home');
    const [scrollEnded, setScrollEnded] = useState<boolean>(false);
    const [showCoinSearchDialog, setShowCoinSearchDialog] = useState<boolean>(false);

    useEffect(() => {
        function handleScroll() {
            const { innerHeight, scrollY } = globalThis;
            const { offsetHeight } = document.body;

            if ((innerHeight + Math.round(scrollY)) >= offsetHeight) {
                setScrollEnded(true);
            } else {
                setScrollEnded(false);
            }
        }

        globalThis.addEventListener('scroll', handleScroll);

        return () => { globalThis.removeEventListener('scroll', handleScroll) }
    }, [])

    useEffect(() => {
        if (pathName === '/') {
            setActiveTab('home');
        } else if (pathName.includes('coin-analysis')) {
            setActiveTab('analyzeCoin');
        } else {
            const route = pathName.split('/')[1];
            setActiveTab(route);
        }
    }, [pathName]);

    function onTabClick(event: React.MouseEvent<HTMLButtonElement>, value: string) {
        if (value === 'github' && typeof window !== "undefined") {
            window.open('https://github.com/shubhamtak007/coinova', '_blank', 'noopener, noreferrer');
            return;
        }

        let route;

        switch (value) {
            case 'home': route = '/'; break;
            case 'analyzeCoin': setShowCoinSearchDialog(true); break;
            case 'trending': route = 'trending'; break;
            default: route = '/'; break;
        }

        if (route) {
            navigateOptimistically(route);
            router.push(route);
        }
    }

    return { scrollEnded, activeTab, onTabClick, showCoinSearchDialog, setShowCoinSearchDialog }
}

export default useBottomTabBar;