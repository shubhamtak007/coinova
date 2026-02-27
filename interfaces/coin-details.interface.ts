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
    }
}

interface ClientCoinProperties {
    id: string,
    name: string,
    symbol: string,
    description: string,
    imageUrl: string,
    websiteUrl: string,
    socialLinks: { [key: string]: string }[]
}

export type { CoinDetailsServerResponse, ClientCoinProperties }