'use client';

import { useEffect, useState } from 'react';
import { CoinDetails } from '@/interfaces/coin-details.interface';
import { retrieveCoinDetailsByCoinId } from '@/services/crypto-currency.service';

type Bindings = {
    coinId: string
}

export default function useCoinDetailsDialog({ coinId }: Bindings) {
    const [coinDetails, setCoinDetails] = useState<CoinDetails | null>(null);
    const [fetchingCoinDetails, setFetchingCoinDetails] = useState<boolean>(false);

    useEffect(() => {
        if (coinId) fetchCoinDetailsByCoinId();
    }, [coinId]);

    async function fetchCoinDetailsByCoinId() {
        setFetchingCoinDetails(true);

        try {
            const response = await retrieveCoinDetailsByCoinId(coinId);
            setCoinDetails(response.data);
        } catch (error) {

        } finally {
            setFetchingCoinDetails(false);
        }
    }

    return { fetchingCoinDetails, coinDetails };
}