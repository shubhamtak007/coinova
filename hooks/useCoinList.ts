'use client';

import { useEffect, useState, useRef } from 'react';
import { retrieveCoinList, searchCoin } from '@/services/coin.service';
import { useRouter } from 'next/navigation';
import { getUiRoute } from '@/services/utils.service';
import { CoinListApiParams } from '@/interfaces/coin-list.interface';
import type { CoingeckoCrypto } from '@/interfaces/coin.interface';

interface CoinListHookProps {
    currentPageNumber: number,
    searchValue: string,
    rowsPerPage: number,
    sortingValue: string | null
}

function useCoinList({ currentPageNumber, searchValue, rowsPerPage, sortingValue }: CoinListHookProps) {
    const router = useRouter();
    const [coinList, setCoinList] = useState<CoingeckoCrypto[]>([]);
    const [fetchingCoinList, setFetchingCoinList] = useState<boolean>(true);
    const abortControllerRef = useRef<AbortController | null>(null);
    const previousSearchValueRef = useRef<string | null>(null);
    const searchedCoinsSymbolsRef = useRef<string | null>(null);
    const requestIdRef = useRef<number>(0);

    useEffect(() => {
        let debounceHandler: ReturnType<typeof setTimeout>;

        if (searchValue.length > 0 && (searchValue !== previousSearchValueRef.current)) {
            debounceHandler = setTimeout(() => {
                fetchCoins();
            }, 500);
        } else {
            fetchCoins();
            previousSearchValueRef.current = null;
            searchedCoinsSymbolsRef.current = null;
        }

        return () => { clearTimeout(debounceHandler) }
    }, [searchValue, currentPageNumber, rowsPerPage, sortingValue]);

    async function fetchCoins() {
        setFetchingCoinList(true);
        if (coinList.length !== 0) setCoinList([]);
        const requestId = ++requestIdRef.current;

        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        const { signal } = abortControllerRef.current;

        let params: CoinListApiParams = {
            page: currentPageNumber,
            per_page: rowsPerPage,
            order: sortingValue
        }

        try {
            if (searchValue.length > 0) {
                if (searchValue !== previousSearchValueRef.current) {
                    previousSearchValueRef.current = searchValue;
                    const response = await searchCoin({ query: searchValue }, signal);
                    searchedCoinsSymbolsRef.current = createSymbolsFromSearchedCoins(response.data.data.coins);
                }

                params.symbols = searchedCoinsSymbolsRef.current;
            }

            const coinGeckoApiResponse = await retrieveCoinList(params, signal);

            if (requestId !== requestIdRef.current) return;

            prefetchCoinDetailsPageRoutes(coinGeckoApiResponse.data);
            setCoinList((coinGeckoApiResponse && coinGeckoApiResponse.data) ? coinGeckoApiResponse.data : []);

        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') return;
            if (requestId !== requestIdRef.current) return;

        } finally {
            if (requestId === requestIdRef.current) {
                setFetchingCoinList(false);
            }
        }
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
            const path = getUiRoute('coinAnalysis', coin)
            if (path) router.prefetch(path);
        }
    }

    return { coinList, fetchingCoinList };
}

export default useCoinList;