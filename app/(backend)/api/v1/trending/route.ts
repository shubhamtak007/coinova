import axios from 'axios';
import { coinGeckoClient } from '@/lib/api-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const endPoint = 'v3/search/trending';
        const trendingApiResponse = await coinGeckoClient.get(endPoint);
        return NextResponse.json({
            data: trendingApiResponse.data
        }, {
            status: 200
        });

    } catch (error: unknown) {
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
}