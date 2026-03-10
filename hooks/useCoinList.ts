'use client';

import { useEffect, useState, useRef } from 'react';
import { retrieveCoinList, searchCoin } from '@/services/coin.service';
import { useRouter } from 'next/navigation';
import { getUiRoute, getRowsPerPageDefaultValue } from '@/services/utils.service';
import { CoinListApiParams } from '@/interfaces/coin-list.interface';
import { Row } from '@tanstack/react-table';
import { useOptimisticNavigation } from '@/contexts/navigation-context';
import type { MenuItem } from '@/interfaces/data-table.interface';
import type { CoingeckoCrypto } from '@/interfaces/coin.interface';

function useCoinList() {
    const router = useRouter();
    const { navigateOptimistically } = useOptimisticNavigation();
    const [coinList, setCoinList] = useState<CoingeckoCrypto[]>([]);
    const [fetchingCoinList, setFetchingCoinList] = useState<boolean>(true);
    const [rowsPerPage, setRowsPerPage] = useState<number>(getRowsPerPageDefaultValue());
    const [sortingValue, setSortingValue] = useState<string | null>('market_cap_desc');
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [showCoinDetailsDialog, setShowCoinDetailsDialog] = useState<boolean>(false);

    const clickedCoinRef = useRef<CoingeckoCrypto>(null);
    const rowsPerPageListRef = useRef([10, 25, 50, 100, 150, 200, 250]);
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

    function onRowsPerPageChange(value: string) {
        setRowsPerPage(Number(value))
    }

    function setSortingValueFromDt(key: string) {
        setSortingValue(key ? key : null)
    }

    function onSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentPageNumber(1);
        setSearchValue(event.target.value);
    }

    function onRowClicked(row: Row<CoingeckoCrypto>) {
        const route = getUiRoute('coinAnalysis', row.original);

        if (route) {
            navigateOptimistically(route);
            router.push(route);
        }
    }

    function onContextMenuItemClicked(row: Row<CoingeckoCrypto>, contextMenu: MenuItem, event: Event) {
        if (contextMenu.name === 'Analyze Coin') {
            const route = getUiRoute('coinAnalysis', row.original);
            if (route) globalThis?.open(route, '_blank', 'noopener,noreferrer');

        } else if (contextMenu.name === 'View Details') {
            clickedCoinRef.current = row.original;
            setShowCoinDetailsDialog(true);
        }
    }

    return {
        fetchingCoinList, coinList, rowsPerPage, sortingValue, currentPageNumber, searchValue,
        showCoinDetailsDialog, clickedCoinRef, rowsPerPageListRef, setSearchValue, setCurrentPageNumber,
        onRowsPerPageChange, setSortingValueFromDt, onSearchInputChange, onRowClicked, onContextMenuItemClicked,
        setShowCoinDetailsDialog
    };
}

export default useCoinList;