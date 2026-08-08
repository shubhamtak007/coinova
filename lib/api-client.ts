import axios from 'axios';
import { setupInterceptors } from "./http-interceptor";

const secretTerminalClientV2 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const secretTerminalClient = axios.create({
    baseURL: `${globalThis.location?.origin}/api/`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const coinGeckoClient = axios.create({
    baseURL: 'https://api.coingecko.com/api/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY
    }
})

const binanceClient = axios.create({
    baseURL: 'https://api.binance.com/api/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})


const coinRankingClient = axios.create({
    baseURL: 'https://api.coinranking.com/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': process.env.COIN_RANKING_API_KEY
    }
})

const clientList = [secretTerminalClient, coinGeckoClient, binanceClient, coinRankingClient, secretTerminalClientV2];

for (const client of clientList) {
    setupInterceptors(client);
}

export { secretTerminalClient, binanceClient, coinGeckoClient, coinRankingClient, secretTerminalClientV2 }