'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useOptimisticNavigation } from '@/contexts/navigation-context';

function useBottomTabBar() {
    const router = useRouter();
    const pathName = usePathname();
    const [activeTab, setActiveTab] = useState<string>('home');
    const { navigateOptimistically } = useOptimisticNavigation();

    useEffect(() => {
        if (pathName === '/') {
            setActiveTab('home');
        } else {
            const route = pathName.split('/')[1];
            setActiveTab(route);
        }
    }, [pathName]);

    function onTabChange(value: string) {
        let route;

        if (value === 'home') {
            route = '/';
        } else if (value === 'trending') {
            route = 'trending';
        } else if (value === 'categories') {
            route = 'categories';
        }

        if (route) {
            navigateOptimistically(route);
            router.push(route);
        }
    }

    return { activeTab, onTabChange }
}

export default useBottomTabBar;