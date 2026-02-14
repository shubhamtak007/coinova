'use client';

import { useEffect, useState, useRef } from 'react';
import { retrieveCoinList } from '@/services/crypto-currency.service';
import type { CoingeckoCrypto } from '@/interfaces/crypto-currency';
import { useRouter } from 'next/navigation';
import { getPathName } from '@/services/utils.service';

interface CoinListHookProps {
    currentPageNumber: number,
    searchValue: string,
    rowsPerPage: number,
    sortingValue: string | null
}

function useCoinList({ currentPageNumber, searchValue, rowsPerPage, sortingValue }: CoinListHookProps) {
    let coinName = useRef<string | null>(null).current;
    const [coinList, setCoinList] = useState<CoingeckoCrypto[]>([]);
    const [fetchingCoinList, setFetchingCoinList] = useState<boolean>(true);
    const router = useRouter();
    let abortController = useRef<AbortController | null>(null).current;

    useEffect(() => {
        let debounceHandler: ReturnType<typeof setTimeout>;
        coinName = null;

        if (searchValue) {
            debounceHandler = setTimeout(() => {
                coinName = searchValue;
                fetchCoins();
            }, 1500)
        } else {
            fetchCoins();
        }

        return () => { clearTimeout(debounceHandler) }
    }, [searchValue, currentPageNumber, rowsPerPage, sortingValue])

    const fetchCoins = async () => {
        if (fetchingCoinList === false) setFetchingCoinList(true);
        if (coinList.length !== 0) setCoinList([]);
        abortController = new AbortController();

        const params = {
            page: currentPageNumber,
            per_page: rowsPerPage,
            names: coinName,
            order: sortingValue
        }

        try {
            const response = await retrieveCoinList(params, abortController.signal);

            for (const coin of response.data) {
                const path = getPathName('coinDetails', coin)
                if (path) router.prefetch(path);
            }

            setCoinList((response && response.data) ? response.data : []);
        } catch (error) {

        } finally {
            setFetchingCoinList(false);
        }
    }

    return { coinList, fetchingCoinList };
}

export default useCoinList;