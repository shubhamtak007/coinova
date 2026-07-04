import { coinovaClientV2 } from "@/lib/api-client";
import ErrorService from "@/services/error.service";

async function retrieveWatchlists() {
    try {
        const response = await coinovaClientV2.get('v0/watchlists');
        return response;
    } catch (error: unknown) {
        return ErrorService.handleError(error);
    }
}

async function addWatchlist(apiBody: Record<string, string>) {
    try {
        const response = await coinovaClientV2.post('v0/watchlists', apiBody);
        return response;
    } catch (error: unknown) {
        return ErrorService.handleError(error);
    }
}

async function updateWatchlist(watchlistId: string, apiBody: Record<string, string>) {
    try {
        const response = await coinovaClientV2.patch(`v0/watchlists/${watchlistId}`, apiBody);
        return response;
    } catch (error: unknown) {
        return ErrorService.handleError(error);
    }
}

async function deleteWatchlist(watchlistId: string) {
    try {
        const response = await coinovaClientV2.delete(`v0/watchlists/${watchlistId}`);
        return response;
    } catch (error: unknown) {
        return ErrorService.handleError(error);
    }
}

const WatchlistService = {
    retrieveWatchlists, addWatchlist, updateWatchlist, deleteWatchlist
}

export default WatchlistService;