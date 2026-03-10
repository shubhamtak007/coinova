interface CoinDetailsServerResponse {
    id: string,
    name: string,
    symbol: string,
    description: {
        en: string
    },
    image: {
        [key: string]: string
    },
    links: {
        homepage: string[],
        subreddit_url: string,
        repos_url: {
            [key: string]: string[]
        }
    },
    market_data: {
        current_price: {
            usd: number
        }
    }
}

interface ClientCoinProperties {
    id: string,
    name: string,
    symbol: string,
    description: string | null,
    imageUrl: string,
    websiteUrl: string,
    socialLinks: { [key: string]: string }[],
    currentPrice: number
}

export type { CoinDetailsServerResponse, ClientCoinProperties }