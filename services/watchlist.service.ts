import { secretTerminalClientV2 } from "@/lib/api-client";
import { secretTerminalEndpoints } from "@/lib/endpoints";
import { handleError } from "@/services/error.service";

async function retrieveWatchlists() {
    try {
        const response = await secretTerminalClientV2.get(secretTerminalEndpoints.watchlists);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

async function addWatchlist(apiBody: Record<string, string>) {
    try {
        const response = await secretTerminalClientV2.post(secretTerminalEndpoints.watchlists, apiBody);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

async function updateWatchlist(watchlistId: string, apiBody: Record<string, string>) {
    try {
        const response = await secretTerminalClientV2.patch(`${secretTerminalEndpoints.watchlists}/${watchlistId}`, apiBody);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

async function deleteWatchlist(watchlistId: string) {
    try {
        const response = await secretTerminalClientV2.delete(`${secretTerminalEndpoints.watchlists}/${watchlistId}`);
        return response;
    } catch (error: unknown) {
        return handleError(error);
    }
}

export {
    retrieveWatchlists, addWatchlist, updateWatchlist, deleteWatchlist
};