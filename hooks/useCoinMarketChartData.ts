'use client'

import { useState, useEffect, useRef } from 'react';
import { retrieveCoinMarketChartData } from '@/services/crypto-currency.service';
import type { CoinDetails } from '@/interfaces/coin-details';

type DataPoint = { date: number, value: number };

type MarketData = {
    priceList: DataPoint[],
    marketCapitalList: DataPoint[],
    volumeList: DataPoint[]
}

type ComponentProps = {
    days: string,
    currentChartView: string
}

type Bindings = CoinDetails & ComponentProps;

export default function useCoinMarketChartData({ coinProperties, days, currentChartView }: Bindings) {
    const [fetchingMarketDataPointList, setFetchingMarketDataPointList] = useState(true);
    const [marketDataPointList, setMarketDataPointList] = useState<Record<number, number>[]>([]);
    const marketDataRef = useRef<MarketData>({ priceList: [], marketCapitalList: [], volumeList: [] });

    useEffect(() => {
        if (coinProperties && coinProperties.id) fetchCoinPriceHistory();
    }, [coinProperties.name, days]);

    useEffect(() => {
        createMarketDataPointListByView();
    }, [currentChartView])

    async function fetchCoinPriceHistory() {
        const params = {
            vs_currency: 'usd',
            days: days,
            precision: '6',
            interval: null
        }

        setFetchingMarketDataPointList(true);
        setMarketDataPointList([]);

        try {
            const response = await retrieveCoinMarketChartData(coinProperties.id, params);
            marketDataRef.current = { priceList: [], marketCapitalList: [], volumeList: [] };

            for (const priceDataPoint of response.data.prices) {
                marketDataRef.current.priceList.push({
                    date: priceDataPoint[0],
                    value: priceDataPoint[1]
                })
            }

            for (const marketCapPoint of response.data.market_caps) {
                marketDataRef.current.marketCapitalList.push({
                    date: marketCapPoint[0],
                    value: marketCapPoint[1]
                })
            }

            for (const volumePoint of response.data.total_volumes) {
                marketDataRef.current.volumeList.push({
                    date: volumePoint[0],
                    value: volumePoint[1]
                })
            }

            createMarketDataPointListByView();
        } catch (error) {

        } finally {
            setFetchingMarketDataPointList(false);
        }
    }

    function createMarketDataPointListByView() {
        switch (currentChartView) {
            case 'price': return setMarketDataPointList(marketDataRef.current.priceList);
            case 'marketCapital': return setMarketDataPointList(marketDataRef.current.marketCapitalList);
            case 'volume': return setMarketDataPointList(marketDataRef.current.volumeList);
            default: return setMarketDataPointList(marketDataRef.current.priceList);
        }
    }

    return { fetchingMarketDataPointList, marketDataPointList }
}