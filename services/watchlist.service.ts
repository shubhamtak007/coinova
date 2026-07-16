import { coinovaClientV2 } from "@/lib/api-client";
import { coinovaEndpoints } from "@/lib/endpoints";
import { handleError } from "@/services/error.service";

async function retrieveWatchlists() {
    try {
        const response = await coinovaClientV2.get(coinovaEndpoints.watchlists);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

async function addWatchlist(apiBody: Record<string, string>) {
    try {
        const response = await coinovaClientV2.post(coinovaEndpoints.watchlists, apiBody);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

async function updateWatchlist(watchlistId: string, apiBody: Record<string, string>) {
    try {
        const response = await coinovaClientV2.patch(`${coinovaEndpoints.watchlists}/${watchlistId}`, apiBody);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

async function deleteWatchlist(watchlistId: string) {
    try {
        const response = await coinovaClientV2.delete(`${coinovaEndpoints.watchlists}/${watchlistId}`);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

export {
    retrieveWatchlists, addWatchlist, updateWatchlist, deleteWatchlist
};