'use client';

import { useState, useEffect } from 'react';
import { search } from '@/services/coin.service';
import { getUiRoute } from '@/services/utils.service';
import { SearchApiCoin } from '@/interfaces/coin.interface';
import { useRouter } from 'next/navigation';
import { useOptimisticNavigation } from '@/contexts/navigation-context';

type bindings = {
    setShowDialog: (value: boolean) => void;
}

export default function useCoinSearchDialog({ setShowDialog }: bindings) {
    const router = useRouter();
    const { navigateOptimistically } = useOptimisticNavigation();
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchingCoins, setSearchingCoins] = useState<boolean>(false);
    const [coins, setCoins] = useState<SearchApiCoin[]>([]);

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
        const route = getUiRoute('coinAnalysis', coin);
        setShowDialog(false);
        if (route) {
            navigateOptimistically(route);
            router.push(route);
        }
    }

    return {
        searchValue, setSearchValue, onSearchValueChange,
        searchingCoins, coins, onCoinClick
    };
}