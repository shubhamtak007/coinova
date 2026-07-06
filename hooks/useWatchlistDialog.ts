'use client';

import { useState, useEffect, useRef } from "react"
import WatchlistService from "@/services/watchlist.service";
import WatchlistCoinService from "@/services/watchlist-coin.service";
import CoinService from "@/services/coin.service";
import { CoingeckoCrypto } from "@/interfaces/coin.interface";

const watchlistContextMenuList = ['Delete'].map((name) => {
    return { id: crypto.randomUUID(), name }
})

const watchlistCoinContextMenuList = ['Delete'].map((name) => {
    return { id: crypto.randomUUID(), name }
})

export default function useWatchlistDialog() {
    const [fetchingWatchlists, setFetchingWatchlists] = useState<boolean>(true);
    const [fetchingWatchlistCoins, setFetchingWatchlistCoins] = useState<boolean>(false);
    const [watchlists, setWatchlists] = useState<Record<string, string>[]>([]);
    const [watchlistCoins, setWatchlistCoins] = useState<Record<string, string | boolean | CoingeckoCrypto>[]>([]);
    const [activeWatchlist, setActiveWatchlist] = useState<Record<string, string> | null>(null);
    const [showCreateWatchlistDialog, setShowCreateWatchlistDialog] = useState<boolean>(false);
    const [showCoinSearchDialog, setShowCoinSearchDialog] = useState<boolean>(false);
    const [deletingItem, setDeletingItem] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [rightClickedItem, setRightClickedItem] = useState<Record<string, string> | null>(null);
    const [fetchingMarketData, setFetchingMarketData] = useState<boolean>(false);
    let deleteDialogType = useRef<string | null>(null);

    useEffect(() => {
        fetchWatchlists();
    }, []);

    useEffect(() => {
        if (activeWatchlist?.id) fetchWatchlistCoins();
    }, [activeWatchlist?.id])

    useEffect(() => {
        if (watchlistCoins.length > 0) fetchCoinsMarketData();
    }, [watchlistCoins])

    function onCreateWatchlistDialogClose() {
        fetchWatchlists();
    }

    function onDeleteDialogClose() {
        fetchWatchlists();
    }

    function onCoinSearchDialogClose() {
        fetchWatchlists();
    }

    function onWatchlistClick(event: React.MouseEvent<HTMLButtonElement>, watchlist: Record<string, string>) {
        setActiveWatchlist(watchlist);
    }

    async function fetchWatchlists() {
        try {
            const localActiveWatchlist = activeWatchlist;
            setActiveWatchlist(null);

            setFetchingWatchlists(true);
            const response = await WatchlistService.retrieveWatchlists();
            setWatchlists(response.data.data);

            if (localActiveWatchlist) {
                setActiveWatchlist(localActiveWatchlist);

            } else if (response.data.data.length > 0) {
                setActiveWatchlist(response.data.data[0]);
            }
        } catch (error) {

        } finally {
            setFetchingWatchlists(false);
        }
    }

    async function fetchWatchlistCoins() {
        if (!activeWatchlist?.id) return;

        try {
            setFetchingWatchlistCoins(true);
            const response = await WatchlistCoinService.retrieveWatchlistCoinsByWatchlistId({ watchlistId: activeWatchlist?.id });
            setWatchlistCoins(response.data.data);
        } catch (error) {

        } finally {
            setFetchingWatchlistCoins(false);
        }
    }

    async function fetchCoinsMarketData() {
        try {
            setFetchingMarketData(true);

            const params = {
                symbols: (watchlistCoins.map((watchlistCoin) => {
                    return String(watchlistCoin.symbol).toLowerCase()
                })).toString()
            }

            const marketDataList = (await CoinService.retrieveCoinList(params)).data;

            watchlistCoins.map((watchlistCoin) => {
                const foundMarketData = marketDataList.find((marketData: CoingeckoCrypto) => {
                    return watchlistCoin.coinId === marketData.id
                })

                watchlistCoin.marketData = foundMarketData;
                return watchlistCoin;
            })
        } catch (error) {

        } finally {
            setFetchingMarketData(false);
        }
    }

    function onContextMenuItemClicked(watchlist: Record<string, string>, contextMenuItem: Record<string, string>, event: Event, context: string) {
        setRightClickedItem(watchlist);

        switch (contextMenuItem.name) {
            case 'Edit': break;
            case 'View Details': break;
            case 'Delete': {
                deleteDialogType.current = context;
                setShowDeleteDialog(true);
            }
                break;
            default: return;
        }
    }

    function onDeleteBtnClicked() {
        deleteWatchlist();
    }

    async function deleteWatchlist() {
        if (!rightClickedItem) return;

        try {
            setDeletingItem(true);

            let response;

            switch (deleteDialogType.current) {
                case 'watchlist': {
                    response = await WatchlistService.deleteWatchlist(rightClickedItem.id);

                }; break;

                case 'watchlistCoin': {
                    response = await WatchlistCoinService.deleteWatchlistCoin(rightClickedItem.id);

                }; break;
            }

            if (response.status === 200) setShowDeleteDialog(false);
        } catch (error) {

        } finally {
            setDeletingItem(false);
        }
    }

    return {
        fetchingWatchlists, watchlists, fetchingWatchlistCoins, watchlistCoins,
        onWatchlistClick, activeWatchlist, showCreateWatchlistDialog, setShowCreateWatchlistDialog,
        onCreateWatchlistDialogClose, watchlistContextMenuList, onContextMenuItemClicked,
        showCoinSearchDialog, setShowCoinSearchDialog, onCoinSearchDialogClose,
        showDeleteDialog, setShowDeleteDialog, onDeleteBtnClicked,
        deletingItem, setDeletingItem, onDeleteDialogClose, fetchingMarketData,
        watchlistCoinContextMenuList, rightClickedItem, deleteDialogType
    };
}