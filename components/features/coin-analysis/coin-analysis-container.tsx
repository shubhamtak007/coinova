'use client';

import { lazy } from 'react';
import { CoinAnalysisContextProvider } from '@/contexts/coin-analysis-context';
const CoinMarketChart = lazy(() => import('@/components/features/coin-analysis/coin-market-chart'));
const CoinInfo = lazy(() => import('@/components/features/coin-analysis/coin-info'));

type Bindings = {
    coinId: string
}

function CoinAnalysisContainer({ coinId }: Bindings) {
    let properties = {
        id: coinId
    }

    return (
        <CoinAnalysisContextProvider>
            <div className="coin-analysis-container grid grid-cols-12">
                <div className="coin-info-col col-span-12 2xl:col-span-4 lg:col-span-4 md:col-span-12 sm:col-span-12">
                    <CoinInfo coinProperties={properties} />
                </div>

                <div className="coin-price-change-chart-col col-span-12 2xl:col-span-8 lg:col-span-8 md:col-span-12 sm:col-span-12">
                    <CoinMarketChart coinProperties={properties} />
                </div>
            </div>
        </CoinAnalysisContextProvider>
    )
}

export default CoinAnalysisContainer;