'use client';

import WatchlistService from "@/services/watchlist.service";
import WatchlistCoinService from "@/services/watchlist-coin.service";
import { useState, useEffect } from "react"

const watchlistContextMenuList = ['Edit', 'View Details', 'Delete'].map((name) => {
    return { id: crypto.randomUUID(), name }
})

export default function useWatchlistDialog() {
    const [fetchingWatchlists, setFetchingWatchlists] = useState<boolean>(true);
    const [fetchingWatchlistCoins, setFetchingWatchlistCoins] = useState<boolean>(false);
    const [watchlists, setWatchlists] = useState<Record<string, string>[]>([]);
    const [watchlistCoins, setWatchlistCoins] = useState<Record<string, string>[]>([]);
    const [activeWatchlist, setActiveWatchlist] = useState<Record<string, string> | null>(null);
    const [showCreateWatchlistDialog, setShowCreateWatchlistDialog] = useState<boolean>(false);

    useEffect(() => {
        fetchWatchlists();
    }, []);

    useEffect(() => {
        fetchWatchlistCoins();
    }, [activeWatchlist?.id])

    function onCreateWatchlistDialogClose() {
        fetchWatchlists();
    }

    function onWatchlistClick(event: React.MouseEvent<HTMLButtonElement>, watchlist: Record<string, string>) {
        setActiveWatchlist(watchlist);
        fetchWatchlistCoins();
    }

    async function fetchWatchlists() {
        try {
            setFetchingWatchlists(true);
            const response = await WatchlistService.retrieveWatchlists();
            setWatchlists(response.data.data);

            if (response.data.data.length > 0) {
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

    function onContextMenuItemClicked(watchlist: Record<string, string>, contextMenuItem: Record<string, string>, event: Event) {

    }

    return {
        fetchingWatchlists, watchlists, fetchingWatchlistCoins, watchlistCoins,
        onWatchlistClick, activeWatchlist, showCreateWatchlistDialog, setShowCreateWatchlistDialog,
        onCreateWatchlistDialogClose, watchlistContextMenuList, onContextMenuItemClicked
    };
}