const coinovaEndpoints = {
    auth: {
        signUp: 'v0/auth/sign-up',
        signIn: 'v0/auth/sign-in',
        signOut: 'v0/auth/sign-out',
        refreshToken: 'v0/auth/refresh-token',
        forgotPassword: 'v0/auth/forgot-password',
        verifyResetCode: 'v0/auth/verify-reset-code',
        changePassword: 'v0/auth/change-password'

    }, users: {
        me: 'v0/users/me'
    }, news: {
        latest: 'v0/news/latest'
    },
    coins: {
        coinList: 'v0/coins',
        trending: 'v0/trending',
        globalMarket: 'v0/global-market'
    },
    watchlists: 'v0/watchlists',
    watchlistCoins: 'v0/watchlistCoins'
}

const coinGeckoEndpoints = {
    coins: {
        coinListWithMarketData: 'v3/coins/markets',
        coinDataById: 'v3/coins',
        search: 'v3/search',
        trending: 'v3/search/trending',
        globalMarket: 'v3/global'
    }
}

const binanceEndpoints = {
    coins: {
        exchangeInfo: 'v3/exchangeInfo',
        '24hrPriceChangeStats': 'v3/ticker/24hr'
    }
}

export { coinovaEndpoints, coinGeckoEndpoints, binanceEndpoints };