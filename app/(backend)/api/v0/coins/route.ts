import axios from 'axios';
import { getRowsPerPageDefaultValue } from '@/services/utils.service';
import { CoinListApiParams } from '@/interfaces/coin-list.interface';
import { coinGeckoClient } from '@/lib/api-client';
import { NextRequest, NextResponse } from 'next/server';
import { coinGeckoEndpoints } from '@/lib/endpoints';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const queryParams: CoinListApiParams = {
        vs_currency: 'usd',
        precision: 3,
        symbols: searchParams.get('symbols') ? searchParams.get('symbols') : null,
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
        per_page: searchParams.get('per_page') ? Number(searchParams.get('per_page')) : getRowsPerPageDefaultValue(),
        price_change_percentage: '1h,24h,7d,14d,30d,200d,1y',
        order: searchParams.get('order') ? searchParams.get('order') : 'market_cap_desc',
        names: searchParams.get('names') ? searchParams.get('names') : null,
        ids: searchParams.get('ids') ? searchParams.get('ids') : null
    }

    try {
        const apiResponse = await coinGeckoClient.get(coinGeckoEndpoints.coins.coinListWithMarketData, { params: queryParams });

        if (apiResponse.data) {
            return NextResponse.json({
                data: apiResponse.data
            }, {
                status: 200
            });
        }
    } catch (error) {
        return handleApiError(error);
    }
}

function handleApiError(error: unknown) {
    if (axios.isAxiosError(error)) {
        return NextResponse.json(
            {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            },
            { status: error.response?.status ?? 500 }
        )
    }

    if (error instanceof Error) {
        return NextResponse.json(
            {
                message: error.message,
                status: 500,
            }
        )
    }

    return NextResponse.json(
        {
            message: 'Unknown error occurred',
            status: 500
        }
    )
}


