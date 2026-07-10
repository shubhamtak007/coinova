import { CoingeckoCrypto } from "./coin.interface";

interface Watchlist {
    id?: string,
    name: string,
    description?: string | null
}

interface WatchlistCoin {
    id: string,
    coinId: string,
    name: string,
    symbol: string,
    imageUrl: string,
    watchlistId: string,
    marketData: CoingeckoCrypto
}

export type { Watchlist, WatchlistCoin };