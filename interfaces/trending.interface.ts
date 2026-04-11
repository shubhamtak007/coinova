import { TrendingCoin } from "./coin.interface";

interface Nft {
    id: string,
    name: string,
    native_currency_symbol: string,
    nft_contract_id: number,
    symbol: string,
    thumb: string,
    data: {
        floor_price: string,
        floor_price_in_usd_24h_percentage_change: number,
        h24_average_sale_price: string,
        h24_volume: string
    }
}

interface Category {
    id: number,
    coins_count: string,
    market_cap_1h_change: number,
    name: string,
    slug: string,
    data: {
        market_cap: number,
        market_cap_change_percentage_24h: {
            usd: number
        },
        total_volume: number
    }
}

interface TrendingCoinsCategoriesAndNftsServerResponse {
    coins: TrendingCoin[],
    categories: Category[],
    nfts: Nft[]
}

interface TrendingCoinsCategoriesAndNftsClient {
    id: string,
    type: string,
    header: string,
    list: CoinCategoryOrNft[]
}

interface CoinCategoryOrNft {
    id: string,
    symbol: string | null,
    name: string,
    image: string | null,
    price: number | string | null,
    priceChangePercentIn24hr: number | null,
    marketCap: number | null,
    marketCapChangePercentIn24hr: number | null
}

export type {
    TrendingCoinsCategoriesAndNftsServerResponse, TrendingCoinsCategoriesAndNftsClient,
    Nft, Category, TrendingCoin, CoinCategoryOrNft
};