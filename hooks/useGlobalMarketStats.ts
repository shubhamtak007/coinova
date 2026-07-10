'use client';

import { useState, useEffect } from 'react';
import { retrieveGlobalMarketData } from '@/services/coin.service';
import type { GlobalMarketStats } from '@/interfaces/global-market-stats.interface';

function useGlobalMarketStats() {
    const [globalMarketStats, setGlobalMarketStats] = useState<GlobalMarketStats>({} as GlobalMarketStats);
    const [fetchingGlobalMarketStats, setFetchingGlobalMarketStats] = useState<boolean>(true);
    const [scrollReachedBottom, setScrollReachedBottom] = useState<boolean>(false);

    useEffect(() => {
        fetchGlobalMarketData();
    }, [])

    useEffect(() => {
        function handleScroll() {
            const { innerHeight, scrollY } = globalThis;
            const { offsetHeight } = document.body;

            if ((innerHeight + Math.round(scrollY)) >= offsetHeight) {
                setScrollReachedBottom(true);
            } else {
                setScrollReachedBottom(false);
            }
        }

        globalThis.addEventListener('scroll', handleScroll);

        return () => { globalThis.removeEventListener('scroll', handleScroll) }
    })

    async function fetchGlobalMarketData() {
        try {
            const response = await retrieveGlobalMarketData();
            if (response) setGlobalMarketStats(response);
        } catch (error) {

        } finally {
            setFetchingGlobalMarketStats(false);
        }
    }

    return { globalMarketStats, fetchingGlobalMarketStats, scrollReachedBottom }
}

export default useGlobalMarketStats;