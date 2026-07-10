import { coinovaClientV2 } from "@/lib/api-client";
import { handleError } from "@/services/error.service";

async function retrieveWatchlistCoinsByWatchlistId(params: Record<string, string | null | undefined>) {
    try {
        const response = await coinovaClientV2.get(`v0/watchlistCoins`, { params: params });
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

async function addWatchlistCoin(apiBody: Record<string, string | null | undefined>) {
    try {
        const response = await coinovaClientV2.post('v0/watchlistCoins', apiBody);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

async function deleteWatchlistCoin(watchlistCoinId: string) {
    try {
        const response = await coinovaClientV2.delete(`v0/watchlistCoins/${watchlistCoinId}`);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

export {
    retrieveWatchlistCoinsByWatchlistId, addWatchlistCoin, deleteWatchlistCoin
};