'use client';

import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import CoinService from '@/services/coin.service';
import { getUiRoute } from '@/services/utils.service';
import { SearchApiCoin } from '@/interfaces/coin.interface';
import { useRouter } from 'next/navigation';
import { useOptimisticNavigation } from '@/contexts/navigation-context';
import WatchlistCoinService from '@/services/watchlist-coin.service';

type Bindings = {
    setShowDialog: Dispatch<SetStateAction<boolean>>,
    context?: string,
    contextProperties?: Record<string, string>
}

export default function useCoinSearchDialog(bindings: Bindings) {
    const { setShowDialog, contextProperties, context } = bindings;
    const router = useRouter();
    const { navigateOptimistically } = useOptimisticNavigation();
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchingCoins, setSearchingCoins] = useState<boolean>(false);
    const [coins, setCoins] = useState<SearchApiCoin[]>([]);
    const [addingCoinToWatchlist, setAddingCoinToWatchlist] = useState<Record<string, boolean>>({});

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
            const response = await CoinService.search({ query: searchValue })
            prefetchCoinAnalysisRoutes(response.data.coins);
            setCoins(response.data.coins);
        } catch (error) {

        } finally {
            setSearchingCoins(false);
        }
    }

    function prefetchCoinAnalysisRoutes(coins: SearchApiCoin[]) {
        for (const coin of coins) {
            const path = getUiRoute('coinAnalysis', coin)
            if (path) router.prefetch(path);
        }
    }

    function onCoinClick(event: React.SyntheticEvent, coin: SearchApiCoin) {
        // setShowDialog(false);
        // const route = getUiRoute('coinAnalysis', coin);
        // if (route) {
        //     navigateOptimistically(route);
        //     router.push(route);
        // }


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
            setAddingCoinToWatchlist((previousCoins) => ({
                ...previousCoins, [coin.id]: true
            }))

            const data = {
                watchlistId: contextProperties?.id,
                coinId: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                imageUrl: coin.large
            }

            const response = await WatchlistCoinService.addWatchlistCoin(data);
        } catch (error) {

        } finally {
            setAddingCoinToWatchlist((previousCoins) => ({
                ...previousCoins, [coin.id]: false
            }))
        }
    }

    return {
        searchValue, setSearchValue, onSearchValueChange,
        searchingCoins, coins, onCoinClick, addCoinToActiveWatchlist, addingCoinToWatchlist
    };
}