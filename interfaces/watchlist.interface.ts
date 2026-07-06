import { CoingeckoCrypto } from "./coin.interface";

interface WatchlistCoin {
    id: string,
    coinId: string,
    name: string,
    symbol: string,
    imageUrl: string,
    watchlistId: string,
    marketData: CoingeckoCrypto
}

export type { WatchlistCoin }