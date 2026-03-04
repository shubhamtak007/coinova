import axios from 'axios';
import { setupInterceptors } from "./http-interceptor";

const coinovaClient = axios.create({
    baseURL: `${globalThis.location?.origin}/api/`,
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const coinGeckoClient = axios.create({
    baseURL: 'https://api.coingecko.com/api/',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY
    }
})

const binanceClient = axios.create({
    baseURL: 'https://api.binance.com/api/',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
})


const coinRankingClient = axios.create({
    baseURL: 'https://api.coinranking.com/',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': process.env.COIN_RANKING_API_KEY
    }
})

const clientList = [coinovaClient, coinGeckoClient, binanceClient, coinRankingClient];

for (const client of clientList) {
    setupInterceptors(client);
}

export { coinovaClient, binanceClient, coinGeckoClient, coinRankingClient }