import axios from 'axios';
import { CryptoCurrency } from '@/interfaces/crypto-currency';
import { roundOffNumber } from '@/services/utils.service';

interface MasterSymbol {
    symbol: string,
    quoteAsset: string
}

const binanceApiConfig = axios.create({
    baseURL: 'https://api.binance.com/api/',
    headers: {
        accept: 'application/json'
    }
})


const coinovaApiConfig = axios.create({
    // baseURL: `${window.location.origin}/api/`,
    baseURL: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEV_API_BASE_URL :
        `${globalThis.location.origin}/api/`,
    headers: {
        accept: 'application/json'
    }
})

const coinRankingApiConfig = axios.create({
    baseURL: 'https://api.coinranking.com/v2/',
    headers: {
        'x-access-token': process.env.NEXT_PUBLIC_COIN_RANKING_API_KEY
    }
})

const coinGeckoApiConfig = axios.create({
    baseURL: 'https://api.coingecko.com/api/',
    headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY
    }
})

const retrieveCoinList = async (apiParams: unknown) => {
    try {
        const response = await coinovaApiConfig.get('v1/coins', { params: apiParams });
        return response;
    } catch (error) {
        throw error;
    } finally {

    }
}

const retrieveTrendingCoins = async () => {
    try {
        const response = await coinovaApiConfig.get('v1/trending');
        return response.data.coins;
    } catch (error) {
        throw error;
    } finally {

    }
}

const retrieveGlobalMarketData = async () => {
    try {
        const response = await coinovaApiConfig.get(`v1/globalMarket`);
        return response.data.data;
    } catch (error) {
        throw error;
    } finally {

    }
}

const retrieveAllCoins = async () => {
    const queryParameters = {
        symbolStatus: 'TRADING'
    }

    try {
        const promises = [
            binanceApiConfig.get('v3/exchangeInfo', { params: queryParameters }),
            binanceApiConfig.get('v3/ticker/24hr', { params: queryParameters })
        ]

        const responses = await Promise.all(promises);
        const masterSymbolList = responses[0].data.symbols.filter((symbol: MasterSymbol) => {
            return symbol.quoteAsset === 'USDT' && !symbol.symbol.includes('WBTC')
        });

        const cryptoPriceList = responses[1].data;
        return createCryptoCurrencyList(masterSymbolList, cryptoPriceList);

    } catch (error) {
        throw error;
    }
}

function createCryptoCurrencyList(masterSymbolList: MasterSymbol[], cryptoPriceList: CryptoCurrency[]) {
    let cryptoCurrencyList = [];

    for (const masterSymbol of masterSymbolList) {
        let symbolWithoutUSDT;

        const matchedCrypto = cryptoPriceList.find((cryptoPrice: CryptoCurrency) => {
            return cryptoPrice.symbol === masterSymbol.symbol
        })

        const symbols = matchedCrypto ? matchedCrypto.symbol.split('USDT') : [];

        for (const symbol of symbols) {
            if (symbol.length > 0) symbolWithoutUSDT = symbol;
        }

        if (matchedCrypto) {
            cryptoCurrencyList.push({
                id: self.crypto.randomUUID(),
                symbol: symbolWithoutUSDT,
                lastPrice: roundOffNumber(Number(matchedCrypto.lastPrice), 5),
                priceChange: roundOffNumber(Number(matchedCrypto.priceChange), 5),
                priceChangePercent: roundOffNumber(Number(matchedCrypto.priceChangePercent), 2),
                volume: Number(matchedCrypto.volume),
                quoteVolume: Number(matchedCrypto.quoteVolume),
                weightedAvgPrice: Number(matchedCrypto.weightedAvgPrice),
                count: matchedCrypto.count
            })
        }
    }

    return cryptoCurrencyList;
}

const retrieveCoinInfoFromCoinRanking = async (queryParams: unknown) => {
    try {
        const response = await coinRankingApiConfig.get('search-suggestions', { params: queryParams })
        return response;
    } catch (error) {
        throw error;
    }
}

const retrieveCoinPriceHistory = async (coinUuid: string, queryParams: unknown) => {
    try {
        const response = await coinGeckoApiConfig.get(`v3/coins/${coinUuid}/market_chart/range`, { params: queryParams });
        return response;
    } catch (error) {
        throw error;
    }
}


export {
    retrieveCoinList, retrieveTrendingCoins, retrieveGlobalMarketData,
    retrieveAllCoins, retrieveCoinInfoFromCoinRanking, retrieveCoinPriceHistory
}