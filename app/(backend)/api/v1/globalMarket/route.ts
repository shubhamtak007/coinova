import { NextResponse } from 'next/server';
import { GlobalMarketDataCoinGecko } from '@/interfaces/GlobalMarketData';
import { formatValueIntoCommaSeparated } from '@/services/utils.service';
import type { FetchFuncOptions, ApiProperties } from '@/interfaces/Api';

const apiProperties: ApiProperties = {
    baseUrl: 'https://api.coingecko.com/api/',
    headers: {
        'accept': 'application/json'
    }
}

if (process.env.COIN_GECKO_API_KEY) apiProperties.headers['x-cg-demo-api-key'] = process.env.COIN_GECKO_API_KEY;

export async function GET(request: Request) {
    checkApiKeyExistOrNot();

    const { searchParams } = new URL(request.url);
    const queryParameters = {};

    const url = apiProperties.baseUrl + 'v3/global';
    const apiOptions: FetchFuncOptions = {
        method: 'GET',
        headers: apiProperties.headers,
        next: {
            revalidate: 600
        }
    }

    try {
        const response = await fetch(url, apiOptions);
        const responseDataJson = await response.json();

        return NextResponse.json({
            data: responseDataJson.data ? createGlobalMarketStatistics(responseDataJson.data) : {}
        });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: error.message,
                    status: 500
                }
            )
        }
    }
}

function checkApiKeyExistOrNot() {
    if (!process.env.COIN_GECKO_API_KEY) {
        return NextResponse.json(
            { error: 'API key is missing' },
            { status: 500 }
        );
    }
}

function createGlobalMarketStatistics(globalMarketData: GlobalMarketDataCoinGecko) {
    const marketStats = {
        totalCoins: formatValueIntoCommaSeparated(globalMarketData.active_cryptocurrencies),
        exchanges: formatValueIntoCommaSeparated(globalMarketData.markets),
        totalMarketCapital: {
            value: globalMarketData.total_market_cap.usd,
            percent: globalMarketData.market_cap_percentage
        },
        totalMarketCapitalChange24hInUsd: globalMarketData.market_cap_change_percentage_24h_usd,
        totalVolume: globalMarketData.total_volume.usd,
        lastUpdatedAt: new Date(globalMarketData.updated_at * 1000)
    }

    return marketStats;
}
