import { coinovaClientV2 } from "@/lib/api-client";
import { coinovaEndpoints } from "@/lib/endpoints";
import { handleError } from "@/services/error.service";

async function retrieveWatchlistCoinsByWatchlistId(params: Record<string, string | null | undefined>) {
    try {
        const response = await coinovaClientV2.get(coinovaEndpoints.watchlistCoins, { params: params });
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

async function addWatchlistCoin(apiBody: Record<string, string | null | undefined>) {
    try {
        const response = await coinovaClientV2.post(coinovaEndpoints.watchlistCoins, apiBody);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

async function deleteWatchlistCoin(watchlistCoinId: string) {
    try {
        const response = await coinovaClientV2.delete(`${coinovaEndpoints.watchlistCoins}/${watchlistCoinId}`);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

export {
    retrieveWatchlistCoinsByWatchlistId, addWatchlistCoin, deleteWatchlistCoin
};