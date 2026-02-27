'use client';

import { useEffect, useState } from 'react';
import { CoinDetailsServerResponse, ClientCoinProperties } from '@/interfaces/coin-details.interface';
import { retrieveCoinDetailsByCoinId } from '@/services/crypto-currency.service';

type Bindings = {
    coinId: string
}

export default function useCoinDetailsDialog({ coinId }: Bindings) {
    const [coinDetails, setCoinDetails] = useState<ClientCoinProperties | null>(null);
    const [fetchingCoinDetails, setFetchingCoinDetails] = useState<boolean>(false);

    useEffect(() => {
        if (coinId) fetchCoinDetailsByCoinId();
    }, [coinId]);

    async function fetchCoinDetailsByCoinId() {
        setFetchingCoinDetails(true);

        try {
            const response = await retrieveCoinDetailsByCoinId(coinId);
            const coinProperties = createCoinProperties(response.data);
            if (coinProperties) setCoinDetails(coinProperties);
        } catch (error) {

        } finally {
            setFetchingCoinDetails(false);
        }
    }

    function createCoinProperties(serverCoinProperties: CoinDetailsServerResponse) {
        if (!serverCoinProperties) return null;

        const properties = {
            id: serverCoinProperties.id,
            name: serverCoinProperties.name,
            symbol: serverCoinProperties.symbol,
            description: `${serverCoinProperties.description.en.split('.').slice(0, 3)}.`,
            imageUrl: serverCoinProperties.image.large,
            websiteUrl: serverCoinProperties.links.homepage[0],
            socialLinks: [
                { name: 'Reddit', url: serverCoinProperties.links.subreddit_url },
                { name: 'Github', url: serverCoinProperties.links.repos_url.github[0] }
            ]
        }

        return properties
    }

    return { fetchingCoinDetails, coinDetails };
}