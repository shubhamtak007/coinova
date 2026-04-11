'use client';

import { useState, useEffect } from 'react';
import { retrieveTrendingCoinsCategoriesAndNfts } from '@/services/coin.service';
import { TrendingCoinsCategoriesAndNftsServerResponse, TrendingCoinsCategoriesAndNftsClient, CoinCategoryOrNft } from '@/interfaces/trending.interface';

function useTrendingCoinsCategoriesAndNfts() {
    const [fetchingTrendingCoinsCategoriesAndNfts, setFetchingTrendingCoinsCategoriesAndNfts] = useState(false);
    const [trendingCoinsCategoriesAndNfts, setTrendingCoinsCategoriesAndNfts] = useState<TrendingCoinsCategoriesAndNftsClient[]>([]);

    useEffect(() => {
        fetchTrendingCoinsCategoriesAndNfts();
    }, []);

    async function fetchTrendingCoinsCategoriesAndNfts() {
        setFetchingTrendingCoinsCategoriesAndNfts(true);

        try {
            const response = await retrieveTrendingCoinsCategoriesAndNfts();
            console.log(response);
            createTopFiveTrendingCoinCategoryAndNftList(response);
        } catch (error) {

        } finally {
            setFetchingTrendingCoinsCategoriesAndNfts(false);
        }
    }

    function createTopFiveTrendingCoinCategoryAndNftList(serverResponse: TrendingCoinsCategoriesAndNftsServerResponse) {
        const trendingPageCards: TrendingCoinsCategoriesAndNftsClient[] = [
            { id: globalThis.crypto.randomUUID(), header: 'Coins', type: 'coins', list: [] },
            { id: globalThis.crypto.randomUUID(), header: `NFT's`, type: 'nfts', list: [] },
            { id: globalThis.crypto.randomUUID(), header: 'Categories', type: 'categories', list: [] }
        ]

        serverResponse.coins.slice(0, 5).forEach((coin) => {
            trendingPageCards[0].list.push({
                id: coin.item.id,
                symbol: coin.item.symbol,
                name: coin.item.id,
                image: coin.item.large,
                price: coin.item.data.price,
                priceChangePercentIn24hr: coin.item.data.price_change_percentage_24h.usd,
                marketCap: null,
                marketCapChangePercentIn24hr: null
            })
        })

        serverResponse.nfts.slice(0, 5).forEach((nft) => {
            trendingPageCards[1].list.push({
                id: nft.id,
                symbol: null,
                name: nft.name,
                image: nft.thumb,
                price: nft.data.floor_price,
                priceChangePercentIn24hr: Number(nft.data.floor_price_in_usd_24h_percentage_change),
                marketCap: null,
                marketCapChangePercentIn24hr: null
            })
        })

        serverResponse.categories.slice(0, 5).forEach((category) => {
            trendingPageCards[2].list.push({
                id: String(category.id),
                symbol: null,
                name: category.name,
                image: null,
                price: null,
                priceChangePercentIn24hr: null,
                marketCap: category.data.market_cap,
                marketCapChangePercentIn24hr: Number(category.data.market_cap_change_percentage_24h.usd),
            })
        })

        setTrendingCoinsCategoriesAndNfts(trendingPageCards)
    }

    return { fetchingTrendingCoinsCategoriesAndNfts, trendingCoinsCategoriesAndNfts }
}

export default useTrendingCoinsCategoriesAndNfts;