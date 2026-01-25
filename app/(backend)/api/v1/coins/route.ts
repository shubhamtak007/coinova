import { NextResponse } from 'next/server';
import axios from 'axios';
import { getRowsPerPageDefaultValue } from '@/services/utils.service';

const coinGeckoApiProperties = axios.create({
    baseURL: 'https://api.coingecko.com/api/',
    headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY
    }
})

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    if (!process.env.COIN_GECKO_API_KEY) {
        return NextResponse.json({
            error: 'API key is missing',
            status: 500
        })
    }

    const queryParameters = {
        vs_currency: 'usd',
        symbols: searchParams.get('symbols') ? searchParams.get('symbols') : null,
        page: searchParams.get('page') ? searchParams.get('page') : 1,
        per_page: searchParams.get('per_page') ? searchParams.get('per_page') : getRowsPerPageDefaultValue(),
        price_change_percentage: '1h,7d,14d,30d',
        order: searchParams.get('order') ? searchParams.get('order') : 'market_cap_desc',
        names: searchParams.get('names') ? searchParams.get('names') : null,
    }

    try {
        const response = await coinGeckoApiProperties.get('v3/coins/markets', { params: queryParameters });
        return NextResponse.json(response.data);

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


