'use client';

import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { retrieveCoinPriceHistory } from '@/services/crypto-currency.service';

interface CoinPriceChartProps {
    details: { [key: string]: string }
}

function CoinPriceChart({ details }: CoinPriceChartProps) {
    let coinName = useRef<string>(details.name).current;
    const [priceHistoryInfo, setPriceHistoryInfo] = useState();

    useEffect(() => {
        if (coinName) fetchCoinPriceHistory();
    }, [coinName]);

    async function fetchCoinPriceHistory() {
        const params = {
            vs_currency: 'usd',
            from: new Date().setDate(new Date().getDate() - 1),
            to: Math.floor(Date.now() - 1000)
        }

        try {
            const response = await retrieveCoinPriceHistory(details.name.toLowerCase(), params);
            const priceChangeList = response.data.prices;

            for (const priceChangeEntry of priceChangeList) {
                priceChangeEntry.push(new Date(priceChangeEntry[0]))
            }

            // console.log(priceChangeList);

            // setPriceHistoryInfo(response.data.data);
        } catch (error) {

        } finally {

        }
    }

    return (
        <div>
            <LineChart>

            </LineChart>
        </div>
    )
}

export default CoinPriceChart;