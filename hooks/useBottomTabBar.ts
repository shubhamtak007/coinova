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
        router.prefetch('/trending');
        router.prefetch('/');
        const rootScope = globalThis ?? window ?? null;

        function handleScroll() {
            const { innerHeight, scrollY } = rootScope;
            const { offsetHeight } = document.body;

            if ((innerHeight + Math.round(scrollY)) >= offsetHeight) {
                setScrollEnded(true);
            } else {
                setScrollEnded(false);
            }
        }

        rootScope.addEventListener('scroll', handleScroll);

        return () => { rootScope.removeEventListener('scroll', handleScroll) }
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