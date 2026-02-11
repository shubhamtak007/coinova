import axios from 'axios';
import { setupInterceptors } from "./http-interceptor";
import { getCoinovaApiBaseUrl } from '@/services/utils.service';

const coinovaClient = axios.create({
    baseURL: getCoinovaApiBaseUrl(),
    headers: {
        accept: 'application/json',
        "Content-Type": 'application/json'
    }
})

const coinGeckoClient = axios.create({
    baseURL: 'https://api.coingecko.com/api/',
    headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY,
        "Content-Type": 'application/json'
    }
})

const binanceClient = axios.create({
    baseURL: 'https://api.binance.com/api/',
    headers: {
        accept: 'application/json',
        "Content-Type": 'application/json'
    }
})

const clientList = [coinovaClient, coinGeckoClient, binanceClient];

for (const client of clientList) {
    setupInterceptors(client);
}

export { coinovaClient, binanceClient, coinGeckoClient }