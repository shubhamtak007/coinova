import { GlobalMarketDataCoinGecko } from '@/interfaces/global-market-stats.interface';
import { formatValueIntoCommaSeparated, roundOffNumber } from '@/services/utils.service';
import { coinGeckoClient } from '@/lib/api-client';
import { NextRequest, NextResponse } from 'next/server';
import { coinGeckoEndpoints } from '@/lib/endpoints';

export async function GET() {
    try {
        const apiResponse = await coinGeckoClient.get(coinGeckoEndpoints.coins.globalMarket);

        if (apiResponse.data && apiResponse.data.data) {
            return NextResponse.json({
                data: createGlobalMarketStatistics(apiResponse.data.data)
            }, {
                status: 200
            })
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500
            })
        }
    }
}

function createGlobalMarketStatistics(globalMarketData: GlobalMarketDataCoinGecko) {
    const marketStats = {
        totalCoins: formatValueIntoCommaSeparated(globalMarketData.active_cryptocurrencies),
        exchanges: formatValueIntoCommaSeparated(globalMarketData.markets),
        totalMarketCapital: {
            value: globalMarketData.total_market_cap.usd,
            marketCapShareList: createMarketCapShareList(globalMarketData.market_cap_percentage)
        },
        marketCapitalChangePercentage24hUsd: globalMarketData.market_cap_change_percentage_24h_usd,
        volumeChangePercentage24hUsd: globalMarketData.volume_change_percentage_24h_usd,
        totalVolume: globalMarketData.total_volume.usd,
        lastUpdatedAt: new Date(globalMarketData.updated_at * 1000)
    }

    return marketStats;
}

function createMarketCapShareList(marketCapSharePercentProperties: Record<string, number>) {
    const marketCapShareList = Object.entries(marketCapSharePercentProperties);
    marketCapShareList.sort((a, b) => b[1] - a[1]);

    let symbolAndPercentList = [];

    for (const marketCapShareItem of marketCapShareList) {
        symbolAndPercentList.push({
            name: marketCapShareItem[0].toUpperCase(),
            value: roundOffNumber(marketCapShareItem[1], 2) + '%'
        })
    }

    return symbolAndPercentList;
}