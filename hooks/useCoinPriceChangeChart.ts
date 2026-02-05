'use client'

import { useState, useEffect } from 'react';
import { retrieveCoinPriceHistory } from '@/services/crypto-currency.service';
import type { CoinDetails } from '@/interfaces/coin-details';

type ComponentProps = {
    days: string
}

type UseCoinPriceChartProps = CoinDetails & ComponentProps;

export default function useCoinPriceChart({ coinProperties, days }: UseCoinPriceChartProps) {
    const [priceChangeList, setPriceChangeList] = useState<{ price: number, date: string }[]>([]);
    const [fetchingPriceChangeList, setFetchingPriceChangeList] = useState(true);

    useEffect(() => {
        if (coinProperties && coinProperties.name) fetchCoinPriceHistory();
    }, [coinProperties.name, days]);

    async function fetchCoinPriceHistory() {
        const params = {
            vs_currency: 'usd',
            days: days,
            precision: '6',
            interval: 'daily'
        }

        if (fetchingPriceChangeList === false) setFetchingPriceChangeList(true);

        try {
            const response = await retrieveCoinPriceHistory(coinProperties.name.toLowerCase(), params);
            const priceChangeHistory = [];

            for (const pricePoint of response.data.prices) {
                priceChangeHistory.push({
                    date: new Intl.DateTimeFormat('en-GB', {
                        day: 'numeric',
                        month: 'short'
                    }).format(new Date(pricePoint[0])),
                    price: pricePoint[1]
                })
            }

            setPriceChangeList(priceChangeHistory);
        } catch (error) {

        } finally {
            setFetchingPriceChangeList(false);
        }
    }


    return { priceChangeList, fetchingPriceChangeList }
}