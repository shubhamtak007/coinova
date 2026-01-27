'use client';

import { useState, useEffect } from 'react';
import type { GlobalMarketStats } from '@/interfaces/global-market-data';
import { retrieveGlobalMarketData } from '@/services/crypto-currency.service';

function useGlobalMarketStats() {
    const [globalMarketStats, setGlobalMarketStats] = useState<GlobalMarketStats>({} as GlobalMarketStats);
    const [fetchingGlobalMarketStats, setFetchingGlobalMarketStats] = useState<boolean>(false);

    useEffect(() => {
        fetchGlobalMarketData();
    }, [])

    async function fetchGlobalMarketData() {
        setFetchingGlobalMarketStats(true);

        try {
            const response = await retrieveGlobalMarketData();
            if (response) setGlobalMarketStats(response);
        } catch (error) {

        } finally {
            setFetchingGlobalMarketStats(false);
        }
    }

    return { globalMarketStats, fetchingGlobalMarketStats }
}

export default useGlobalMarketStats;