'use client';

import { useState, useEffect } from 'react';
import type { CoingeckoCrypto } from '@/interfaces/crypto-currency';
import { formatValueIntoCommaSeparated } from '@/services/utils.service';
import { retrieveCoinList } from '@/services/crypto-currency.service';
import type { CoinDetails } from '@/interfaces/coin-details';

type UseCoinInfoProps = CoinDetails;

function useCoinInfo({ coinProperties }: UseCoinInfoProps) {
    const [coinInfo, setCoinInfo] = useState<CoingeckoCrypto | null>(null);
    const [fetchingCoinInfo, setFetchingCoinInfo] = useState<boolean>(true);

    useEffect(() => {
        fetchCoinInfoByName(coinProperties.name);
    }, [])

    async function fetchCoinInfoByName(coinName: string) {
        try {
            const response = await retrieveCoinList({ names: coinName });

            if (response.data?.length > 0) {
                formatValues(response.data);
                setCoinInfo(response.data[0]);
            }
        } catch (error) {

        } finally {
            setFetchingCoinInfo(false)
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