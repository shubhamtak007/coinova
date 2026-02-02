'use client';

import { useEffect, useState, useRef } from 'react';
import { retrieveCoinList } from '@/services/crypto-currency.service';
import type { CoingeckoCrypto } from '@/interfaces/crypto-currency';
import { useRouter } from 'next/navigation';

interface CoinListHookProps {
    currentPageNumber: number,
    searchValue: string,
    rowsPerPage: number,
    sortingValue: string | null
}

function useCoinList({ currentPageNumber, searchValue, rowsPerPage, sortingValue }: CoinListHookProps) {
    const [coinList, setCoinList] = useState<CoingeckoCrypto[]>([]);
    const [fetchingCoinList, setFetchingCoinList] = useState<boolean>(false);
    let coinName = useRef<string | null>(null).current;
    const router = useRouter();

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
        setFetchingCoinList(true);

        const params = {
            page: currentPageNumber,
            per_page: rowsPerPage,
            names: coinName,
            order: sortingValue
        }

        try {
            const response = await retrieveCoinList(params);

            for (const coin of coinList) {
                router.prefetch(`/coin/${coin.symbol + '+' + coin.name}`)
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