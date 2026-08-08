import { secretTerminalClientV2 } from "@/lib/api-client";
import { secretTerminalEndpoints } from "@/lib/endpoints";
import { handleError } from "@/services/error.service";

async function retrieveWatchlistCoinsByWatchlistId(params: Record<string, string | null | undefined>) {
    try {
        const response = await secretTerminalClientV2.get(secretTerminalEndpoints.watchlistCoins, { params: params });
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

async function addWatchlistCoin(apiBody: Record<string, string | null | undefined>) {
    try {
        const response = await secretTerminalClientV2.post(secretTerminalEndpoints.watchlistCoins, apiBody);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

async function deleteWatchlistCoin(watchlistCoinId: string) {
    try {
        const response = await secretTerminalClientV2.delete(`${secretTerminalEndpoints.watchlistCoins}/${watchlistCoinId}`);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

export {
    retrieveWatchlistCoinsByWatchlistId, addWatchlistCoin, deleteWatchlistCoin
};