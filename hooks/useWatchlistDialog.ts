'use client';

import { useState, useEffect, useRef } from "react"
import { retrieveWatchlists, deleteWatchlist } from "@/services/watchlist.service";
import { retrieveWatchlistCoinsByWatchlistId, deleteWatchlistCoin } from "@/services/watchlist-coin.service";
import { retrieveCoinList } from "@/services/coin.service";
import { CoingeckoCrypto } from "@/interfaces/coin.interface";
import { Watchlist } from "@/interfaces/watchlist.interface";

const watchlistContextMenuList = ['Edit', 'Delete'].map((name) => {
    return { id: crypto.randomUUID(), name }
})

const watchlistCoinContextMenuList = ['Delete'].map((name) => {
    return { id: crypto.randomUUID(), name }
})

export default function useWatchlistDialog() {
    const [fetchingWatchlists, setFetchingWatchlists] = useState<boolean>(true);
    const [fetchingWatchlistCoins, setFetchingWatchlistCoins] = useState<boolean>(false);
    const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
    const [watchlistCoins, setWatchlistCoins] = useState<Record<string, string | boolean | CoingeckoCrypto>[]>([]);
    const [activeWatchlist, setActiveWatchlist] = useState<Record<string, string> | null>(null);
    const [showWatchlistFormDialog, setShowWatchlistFormDialog] = useState<boolean>(false);
    const [showCoinSearchDialog, setShowCoinSearchDialog] = useState<boolean>(false);
    const [deletingItem, setDeletingItem] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [rightClickedItem, setRightClickedItem] = useState<Record<string, string> | null>(null);
    const [fetchingMarketData, setFetchingMarketData] = useState<boolean>(false);
    const deleteDialogType = useRef<string | null>(null);
    const selectedWatchlist = useRef<Record<string, string>>(null);

    useEffect(() => {
        fetchWatchlists();
    }, []);

    useEffect(() => {
        if (activeWatchlist?.id) fetchWatchlistCoins();
    }, [activeWatchlist?.id])

    useEffect(() => {
        if (watchlistCoins.length > 0) fetchCoinsMarketData();
    }, [watchlistCoins])

    function onWatchlistFormDialogClose() {
        selectedWatchlist.current = null;
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
            const response = await retrieveWatchlists();
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
            const response = await retrieveWatchlistCoinsByWatchlistId({ watchlistId: activeWatchlist?.id });
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

            const marketDataList = (await retrieveCoinList(params)).data;

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
            case 'Edit': {
                selectedWatchlist.current = watchlist;
                setShowWatchlistFormDialog(true);
            }; break;
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
        deleteWatchlistEntry();
    }

    async function deleteWatchlistEntry() {
        if (!rightClickedItem) return;

        try {
            setDeletingItem(true);

            let response;

            switch (deleteDialogType.current) {
                case 'watchlist': {
                    response = await deleteWatchlist(rightClickedItem.id);
                }; break;

                case 'watchlistCoin': {
                    response = await deleteWatchlistCoin(rightClickedItem.id);
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
        onWatchlistClick, activeWatchlist, showWatchlistFormDialog, setShowWatchlistFormDialog,
        onWatchlistFormDialogClose, watchlistContextMenuList, onContextMenuItemClicked,
        showCoinSearchDialog, setShowCoinSearchDialog, onCoinSearchDialogClose,
        showDeleteDialog, setShowDeleteDialog, onDeleteBtnClicked,
        deletingItem, setDeletingItem, onDeleteDialogClose, fetchingMarketData,
        watchlistCoinContextMenuList, rightClickedItem, deleteDialogType, selectedWatchlist
    };
}