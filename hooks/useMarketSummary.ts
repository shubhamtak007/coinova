'use client';

import { useEffect, useState, useRef } from 'react';
import { retrieveCoinList, retrieveAllCoins, retrieveTrendingCoins } from '@/services/crypto-currency.service';
import { CryptoCurrency, MarketSummaryItem, CoingeckoCrypto, TrendingCoin, MarketSummaryRefMap } from '@/interfaces/crypto-currency';
import { roundOffNumber } from '@/services/utils.service';

function useMarketSummary() {
    let marketSummaryRef = useRef<MarketSummaryRefMap>({ gainers: [], losers: [], volumes: [], trendingCoins: [] }).current;
    const numberOfItemsRef = useRef<number>(3).current;
    const [marketSummary, setMarketSummary] = useState<MarketSummaryItem[]>([]);
    const [fetchingMarketSummary, setFetchingMarketSummary] = useState<boolean>(true);

    useEffect(() => {
        fetchAllCoinsAndTrendingCoins();
    }, [])

    async function fetchAllCoinsAndTrendingCoins() {
        try {
            const promises = [
                retrieveTrendingCoins(),
                retrieveAllCoins()
            ]

            const responses = await Promise.all(promises);

            if (responses.length > 0) {
                if (responses[0].length > 0) createTrendingCoinList(responses[0]);
                if (responses[1].length > 0) createGainerLoserAndVolumeList(responses[1]);
                fetchNameAndImageOfCryptoCurrencies();
            }
        } catch (error) {
            setFetchingMarketSummary(false);
        } finally {

        }
    }

    function createTrendingCoinList(serverTrendingCoinsData: TrendingCoin[]) {
        marketSummaryRef.trendingCoins = [];
        const localTrendingCoins = serverTrendingCoinsData.map((coinData: TrendingCoin) => coinData.item).slice(0, numberOfItemsRef);

        for (const coin of localTrendingCoins) {
            marketSummaryRef.trendingCoins.push({
                id: coin.id,
                name: coin.name,
                imageUrl: coin.large,
                symbol: coin.symbol,
                lastPrice: roundOffNumber(coin.data?.price, 5),
                priceChangePercent: roundOffNumber(coin.data?.price_change_percentage_24h?.usd, 2),
            })
        }
    }

    function createGainerLoserAndVolumeList(cryptoCurrencyList: CryptoCurrency[]) {
        marketSummaryRef.gainers = cryptoCurrencyList.sort((a: CryptoCurrency, b: CryptoCurrency) => {
            return Number(b.priceChangePercent) - Number(a.priceChangePercent)
        }).slice(0, numberOfItemsRef);

        marketSummaryRef.losers = cryptoCurrencyList.sort((a: CryptoCurrency, b: CryptoCurrency) => {
            return Number(a.priceChangePercent) - Number(b.priceChangePercent)
        }).slice(0, numberOfItemsRef);

        marketSummaryRef.volumes = cryptoCurrencyList.sort((a: CryptoCurrency, b: CryptoCurrency) => {
            return Number(b.quoteVolume) - Number(a.quoteVolume)
        }).slice(0, numberOfItemsRef);
    }

    async function fetchNameAndImageOfCryptoCurrencies() {
        const coins = [...marketSummaryRef.gainers, ...marketSummaryRef.losers, ...marketSummaryRef.volumes];

        const symbolsInLowerCase = [...new Set(coins)].map((item: CryptoCurrency) => {
            return item.symbol.toLowerCase();
        })

        try {
            const response = await retrieveCoinList({ symbols: symbolsInLowerCase.join(',') });

            if (response && response.data) {
                for (const crypto of coins) {
                    const matchedCrypto = response.data.find((item: CoingeckoCrypto) => crypto.symbol.toLowerCase() === item.symbol);

                    if (matchedCrypto) {
                        const info = {
                            id: matchedCrypto.id,
                            name: matchedCrypto.name,
                            imageUrl: matchedCrypto.image ? matchedCrypto.image : '',
                            lastPrice: matchedCrypto.current_price,
                            priceChangePercent: roundOffNumber(matchedCrypto.price_change_percentage_24h, (
                                (matchedCrypto.price_change_percentage_24h < -100) ? 5 : 2
                            ))
                        }

                        Object.assign(crypto, info);
                    }
                }
            }

            createMarketSummary();
        } catch (error) {

        } finally {
            setFetchingMarketSummary(false);
        }
    }

    function createMarketSummary() {
        const localMarketSummary = [
            { id: 'topGainer', title: 'Top Gainer', coins: marketSummaryRef.gainers },
            { id: 'topLoser', title: 'Top Loser', coins: marketSummaryRef.losers },
            { id: 'trending', title: 'Trending', coins: marketSummaryRef.trendingCoins },
            { id: 'topVolume', title: 'Top Volume', coins: marketSummaryRef.volumes }
        ]

        setMarketSummary(localMarketSummary);
    }

    return { marketSummary, fetchingMarketSummary }
}

export default useMarketSummary;