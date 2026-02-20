'use client';

import { useEffect, useState, useRef } from 'react';
import { retrieveCoinList } from '@/services/crypto-currency.service';
import { useRouter } from 'next/navigation';
import { getPathName } from '@/services/utils.service';
import type { CoingeckoCrypto } from '@/interfaces/crypto-currency';

interface CoinListHookProps {
    currentPageNumber: number,
    searchValue: string,
    rowsPerPage: number,
    sortingValue: string | null
}

let previousSearchValue: string | null = null;
let searchedCoinSymbols: string | null = null;

function useCoinList({ currentPageNumber, searchValue, rowsPerPage, sortingValue }: CoinListHookProps) {
    const router = useRouter();
    const [coinList, setCoinList] = useState<CoingeckoCrypto[]>([]);
    const [fetchingCoinList, setFetchingCoinList] = useState<boolean>(true);
    let abortController = useRef<AbortController | null>(null).current;

    useEffect(() => {
        let debounceHandler: ReturnType<typeof setTimeout>;

        if (searchValue.length > 0 && (searchValue !== previousSearchValue)) {
            debounceHandler = setTimeout(() => {
                fetchCoins();
            }, 1500);
        } else {
            fetchCoins();
        }

        return () => { clearTimeout(debounceHandler) }
    }, [searchValue, currentPageNumber, rowsPerPage, sortingValue]);

    async function fetchCoins() {
        if (fetchingCoinList === false) setFetchingCoinList(true);
        if (coinList.length !== 0) setCoinList([]);

        abortController?.abort();
        abortController = new AbortController();

        let params: Record<string, string | number | null> = {
            page: currentPageNumber,
            per_page: rowsPerPage,
            order: sortingValue
        }

        try {
            if (searchValue.length > 0) {
                if (searchValue !== previousSearchValue) {
                    previousSearchValue = searchValue;
                    const response = await fetch(getSearchApiUrl(), { signal: abortController.signal });
                    const responseJson = await response.json();
                    searchedCoinSymbols = createSymbolsFromSearchedCoins(responseJson.data.coins);
                }

                params.symbols = searchedCoinSymbols;
            }

            const coinGeckoApiResponse = await retrieveCoinList(params, abortController.signal);

            prefetchCoinDetailsPageRoutes(coinGeckoApiResponse.data);
            setCoinList((coinGeckoApiResponse && coinGeckoApiResponse.data) ? coinGeckoApiResponse.data : []);
        } catch (error) {

        } finally {
            setFetchingCoinList(false);
        }
    }

    function getSearchApiUrl() {
        const url = new URL('https://api.coinranking.com/v2/search-suggestions');
        const params = {
            query: searchValue
        }

        url.search = new URLSearchParams(params).toString();
        return url;
    }

    function createSymbolsFromSearchedCoins(coins: Record<string, string>[]) {
        const symbols = [];
        for (const coin of coins) {
            symbols.push(coin.symbol.toLowerCase())
        }

        return symbols.join();
    }

    function prefetchCoinDetailsPageRoutes(coins: CoingeckoCrypto[]) {
        for (const coin of coins) {
            const path = getPathName('coinDetails', coin)
            if (path) router.prefetch(path);
        }
    }

    return { coinList, fetchingCoinList };
}

export default useCoinList;