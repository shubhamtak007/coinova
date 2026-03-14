'use client';

import { useState, useEffect } from 'react';
import { search } from '@/services/coin.service';
import { getUiRoute } from '@/services/utils.service';
import { SearchApiCoin } from '@/interfaces/coin.interface';

export default function useCoinSearchDialog() {
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchingCoins, setSearchingCoins] = useState<boolean>(false);
    const [coins, setCoins] = useState<SearchApiCoin[]>([]);

    useEffect(() => {
        let debounceHandler: ReturnType<typeof setTimeout>;

        if (searchValue.length > 0) {
            debounceHandler = setTimeout(() => {
                searchCoin();
            }, 500);
        } else {
            if (coins.length > 0) setCoins([]);
        }

        return () => { clearTimeout(debounceHandler) }
    }, [searchValue])

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

    function onSymbolClick(event: React.MouseEvent<HTMLElement>, coin: SearchApiCoin) {
        const route = getUiRoute('coinAnalysis', coin);
        if (route) globalThis?.open(route, '_blank', 'noopener,noreferrer');
        event.preventDefault();
    }

    return { searchValue, setSearchValue, onSearchValueChange, searchingCoins, coins, onSymbolClick };
}