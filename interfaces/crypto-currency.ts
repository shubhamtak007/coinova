interface CryptoCurrency {
    id: string,
    name: string,
    imageUrl: string,
    symbol: string,
    lastPrice?: number,
    priceChange?: number,
    priceChangePercent?: number,
    volume?: number,
    quoteVolume?: number,
    weightedAvgPrice?: number,
    count?: number
}

interface CoingeckoCrypto {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number,
    currentPriceWithCurrencySymbol?: string,
    price_change_percentage_24h: number,
    price_change_24h: number,
    market_cap: number,
    market_cap_rank: number,
    total_volume: number,
    price_change_percentage_1h_in_currency: number,
    price_change_percentage_7d_in_currency: number,
    circulating_supply: number
}

interface MarketSummaryItem {
    id: string,
    title: string,
    coins: CryptoCurrency[]
}

interface TrendingCoinItem {
    id: string,
    name: string,
    large: string,
    symbol: string,
    data: {
        price: number,
        price_change_percentage_24h: {
            usd: number
        }
    }
}

interface TrendingCoin {
    item: TrendingCoinItem
}

interface MarketSummaryRefMap {
    gainers: CryptoCurrency[],
    losers: CryptoCurrency[],
    volumes: CryptoCurrency[],
    trendingCoins: CryptoCurrency[]
}

export type {
    CryptoCurrency, CoingeckoCrypto, MarketSummaryItem,
    TrendingCoinItem, TrendingCoin, MarketSummaryRefMap
}