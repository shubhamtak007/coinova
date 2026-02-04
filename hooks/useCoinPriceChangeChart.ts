'use client'

import { useState, useEffect } from 'react';
import { retrieveCoinPriceHistory } from '@/services/crypto-currency.service';
import type { CoinDetails } from '@/interfaces/coin-details';

type UseCoinPriceChartProps = CoinDetails;

export default function useCoinPriceChart({ coinProperties }: UseCoinPriceChartProps) {
    const [priceChangeList, setPriceChangeList] = useState<{ time: string, price: number }[]>([]);
    const [fetchingPriceChangeList, setFetchingPriceChangeList] = useState(true);

    useEffect(() => {
        if (coinProperties && coinProperties.name) fetchCoinPriceHistory();
    }, [coinProperties.name]);

    async function fetchCoinPriceHistory() {
        const params = {
            vs_currency: 'usd',
            days: 30,
            precision: 6,
            interval: 'daily'
        }

        try {
            const response = await retrieveCoinPriceHistory(coinProperties.name.toLowerCase(), params);
            const priceChangeHistory = [];

            for (const pricePoint of response.data.prices) {
                priceChangeHistory.push({
                    time: new Date(pricePoint[0]).toDateString(),
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