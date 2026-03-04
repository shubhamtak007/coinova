'use client';

import { useState, useEffect } from 'react';
import type { CoingeckoCrypto } from '@/interfaces/coin.interface';
import { formatValueIntoCommaSeparated } from '@/services/utils.service';
import { retrieveCoinList } from '@/services/coin.service';
import type { CoinAnalysis } from '@/interfaces/coin-analysis.interface';

type Bindings = CoinAnalysis;

function useCoinInfo({ coinProperties }: Bindings) {
    const [coinInfo, setCoinInfo] = useState<CoingeckoCrypto | null>(null);
    const [fetchingCoinInfo, setFetchingCoinInfo] = useState<boolean>(true);

    useEffect(() => {
        if (coinProperties.id) fetchCoinInfoByName();
    }, [])

    async function fetchCoinInfoByName() {
        if (fetchingCoinInfo === false) setFetchingCoinInfo(true);

        try {
            const response = await retrieveCoinList({ ids: coinProperties.id });

            if (response.data?.length > 0) {
                formatValues(response.data);
                setCoinInfo(response.data[0]);
            }
        } catch (error) {

        } finally {
            setFetchingCoinInfo(false);
        }
    }

    function formatValues(data: CoingeckoCrypto[]) {
        for (const coin of data) {
            if (coin.current_price) {
                coin.currentPriceWithCurrencySymbol = formatValueIntoCommaSeparated(coin.current_price, 6, true);
            }
        }
    }

    return { coinInfo, fetchingCoinInfo }
}

export default useCoinInfo;