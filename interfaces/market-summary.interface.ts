import type { CryptoCurrency } from '@/interfaces/coin.interface';

interface MarketSummary {
    key: string,
    marketSummaryItem: MarketSummaryItem,
}

interface MarketSummaryItem {
    id: string,
    title: string,
    coins: CryptoCurrency[]
}

export type { MarketSummary, MarketSummaryItem }