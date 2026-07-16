import axios from 'axios';
import { coinGeckoClient } from '@/lib/api-client';
import { NextRequest, NextResponse } from 'next/server';
import { coinGeckoEndpoints } from '@/lib/endpoints';

export async function GET() {
    try {
        const apiResponse = await coinGeckoClient.get(coinGeckoEndpoints.coins.trending);

        if (apiResponse.data) {
            return NextResponse.json({
                data: apiResponse.data
            }, {
                status: 200
            });
        }
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