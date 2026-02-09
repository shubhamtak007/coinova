'use client';

import { lazy } from 'react';
const CoinPriceChangeChart = lazy(() => import('@/components/features/coin-details/coin-price-change-chart'));
const CoinInfo = lazy(() => import('@/components/features/coin-details/coin-info'));

interface CoinDetailsProps {
    coinId: string
}

function CoinDetailsContainer({ coinId }: CoinDetailsProps) {
    let properties = {
        id: coinId
    }

    return (
        <div className="coin-details-page-container grid grid-cols-12">
            <div className="coin-info-col col-span-12 2xl:col-span-4 lg:col-span-4 md:col-span-12 sm:col-span-12">
                <CoinInfo coinProperties={properties} />
            </div>

            <div className="coin-price-change-chart-col col-span-12 2xl:col-span-8 lg:col-span-8 md:col-span-12 sm:col-span-12">
                <CoinPriceChangeChart coinProperties={properties} />
            </div>
        </div>
    )
}

export default CoinDetailsContainer;