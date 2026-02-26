interface CoinDetails {
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

export type { CoinDetails }