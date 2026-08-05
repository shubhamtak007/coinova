'use client';

import { useEffect, useState } from 'react';
import { CoinDetailsServerResponse, ClientCoinProperties } from '@/interfaces/coin-details.interface';
import { retrieveCoinDetailsByCoinId } from '@/services/coin.service';

type Bindings = {
    showDialog: boolean,
    coinId?: string
}

export default function useCoinDetailsDialog(bindings: Bindings) {
    const { showDialog, coinId } = bindings;
    const [coinDetails, setCoinDetails] = useState<ClientCoinProperties | null>(null);
    const [fetchingCoinDetails, setFetchingCoinDetails] = useState<boolean>(false);

    useEffect(() => {
        if (!showDialog) return;

        if (coinId) fetchCoinDetailsByCoinId(coinId);
    }, [showDialog, coinId]);

    async function fetchCoinDetailsByCoinId(coinId: string) {
        if (!coinId) return;
        setFetchingCoinDetails(true);

        try {
            const response = await retrieveCoinDetailsByCoinId(coinId);
            const coinProperties = await createCoinProperties(response.data);
            if (coinProperties) setCoinDetails(coinProperties);
        } catch (error) {

        } finally {
            setFetchingCoinDetails(false);
        }
    }

    async function createCoinProperties(serverCoinProperties: CoinDetailsServerResponse) {
        if (!serverCoinProperties) return null;

        const properties = {
            id: serverCoinProperties.id,
            name: serverCoinProperties.name,
            symbol: serverCoinProperties.symbol,
            description: serverCoinProperties.description.en.length > 0 ?
                await summarizeDescription(serverCoinProperties.description.en) : null,
            imageUrl: serverCoinProperties.image.large,
            websiteUrl: serverCoinProperties.links.homepage[0],
            socialLinks: [
                { name: 'Reddit', url: serverCoinProperties.links.subreddit_url },
                { name: 'Github', url: serverCoinProperties.links.repos_url.github[0] }
            ],
            currentPrice: serverCoinProperties.market_data.current_price.usd
        }

        return properties
    }

    async function summarizeDescription(description: string) {
        if ('Summarizer' in self) {
            const summarizer = await (self as any).Summarizer.create({
                type: 'tldr',
                outputLanguage: 'en-GB',
                length: 'medium',
                format: 'plain-text'
            })
            const summary = await summarizer.summarize(description);
            return summary;
        } else {
            return `${description.split('.').slice(0, 3)}.`
        }
    }

    return { fetchingCoinDetails, coinDetails };
}