'use client';

import { useState, useEffect, SetStateAction, Dispatch, use } from 'react';
import { search } from '@/services/coin.service';
import { getUiRoute } from '@/services/utils.service';
import { SearchApiCoin } from '@/interfaces/coin.interface';
import { useRouter } from 'next/navigation';
import { addWatchlistCoin } from '@/services/watchlist-coin.service';

type Bindings = {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>,
    context?: string,
    contextProperties?: Record<string, string>
}

export default function useCoinSearchDialog(bindings: Bindings) {
    const { showDialog, setShowDialog, contextProperties, context } = bindings;
    const router = useRouter();
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchingCoins, setSearchingCoins] = useState<boolean>(false);
    const [coins, setCoins] = useState<SearchApiCoin[]>([]);

    useEffect(() => {
        if (!showDialog) return;
    }, [showDialog])

    useEffect(() => {
        let debounceHandler: ReturnType<typeof setTimeout>;

        if (searchValue.length > 0) {
            debounceHandler = setTimeout(() => {
                searchCoin();
            }, 300);
        } else {
            if (coins.length > 0) setCoins([]);
        }

        return () => { clearTimeout(debounceHandler) }
    }, [searchValue]);

    function onSearchValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value)
    }

    async function searchCoin() {
        setSearchingCoins(true);

        try {
            const response = await search({ query: searchValue })
            setCoins(response.data.coins);
        } catch (error) {

        } finally {
            setSearchingCoins(false);
        }
    }

    function onCoinClick(event: React.SyntheticEvent, coin: SearchApiCoin) {
        event.preventDefault();
        event.stopPropagation();

        const route = getUiRoute('coinAnalysis', coin);

        if (route) {
            const externalLink = document.createElement('a')
            Object.assign(externalLink, {
                href: route,
                target: '_blank',
                rel: 'noopener noreferrer'
            }).click();

            externalLink.remove();
        }
    }

    async function addCoinToActiveWatchlist(coin: SearchApiCoin) {
        try {
            coin.loading = true;
            updateLoadingValue(coin);

            const data = {
                watchlistId: contextProperties?.id,
                coinId: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                imageUrl: coin.large
            }

            await addWatchlistCoin(data);
        } catch (error) {

        } finally {
            coin.loading = false;
            updateLoadingValue(coin);
        }
    }

    function updateLoadingValue(coin: SearchApiCoin) {
        setCoins((previousCoins) => {
            return previousCoins.map((previousCoin) => {
                return (previousCoin.id === coin.id) ? coin : previousCoin
            })
        })
    }

    return {
        searchValue, setSearchValue, onSearchValueChange,
        searchingCoins, coins, onCoinClick, addCoinToActiveWatchlist
    };
}