'use client';

import { useEffect, Dispatch, SetStateAction, } from 'react';
import { useUser } from '@/contexts/user.context';
import { useLoading } from '@/contexts/loading.context';
import UserService from '@/services/user.service';

type Bindings = {
    setShowBottomTabBar: Dispatch<SetStateAction<boolean>>;
    setScrolled: Dispatch<SetStateAction<boolean>>;
}

export default function useHeader(bindings: Bindings) {
    const { setScrolled, setShowBottomTabBar } = bindings;

    useEffect(() => {
        if (window.innerWidth > 1080) setShowBottomTabBar(true);

        const handleWindowSize = () => {
            if (window.innerWidth > 1080) {
                setShowBottomTabBar(true);
            } else {
                setShowBottomTabBar(false);
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

    return {};
}