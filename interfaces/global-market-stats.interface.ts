interface GlobalMarketDataCoinGecko {
    active_cryptocurrencies: number,
    markets: number,
    total_market_cap: {
        [key: string]: number
    },
    total_volume: {
        [key: string]: number
    },
    market_cap_percentage: {
        [key: string]: number
    },
    market_cap_change_percentage_24h_usd: number,
    volume_change_percentage_24h_usd: number,
    updated_at: number
}

interface GlobalMarketStats {
    totalCoins: number,
    exchanges: number,
    totalMarketCapital: {
        value: number,
        marketCapShareList: Record<string, string>[]
    },
    marketCapitalChangePercentage24hUsd: number,
    volumeChangePercentage24hUsd: number,
    totalVolume: number,
    lastUpdatedAt: number
}

export type { GlobalMarketDataCoinGecko, GlobalMarketStats };