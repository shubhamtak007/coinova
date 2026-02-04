'use client';

import CoinPriceChangeChart from '@/components/features/coin-details/coin-price-change-chart';
import CoinInfo from '@/components/features/coin-details/coin-info';

interface CoinDetailsProps {
    name: string,
    symbol: string
}

function CoinDetailsContainer({ name, symbol }: CoinDetailsProps) {
    let properties = {
        name: name,
        symbol: symbol
    }

    return (
        <div className="coin-details-container grid grid-cols-12">
            <div className="coin-info-section col-span-12 2xl:col-span-4 lg:col-span-4 md:col-span-12 sm:col-span-12">
                <CoinInfo coinProperties={properties} />
            </div>

            <div className="coin-price-change-chart-section col-span-12 2xl:col-span-8 lg:col-span-8 md:col-span-12 sm:col-span-12">
                <CoinPriceChangeChart coinProperties={properties} />
            </div>
        </div>
    )
}

export default CoinDetailsContainer;