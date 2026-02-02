'use client';

import CoinPriceChart from '@/components/features/coin-details/coin-price-chart';

interface CoinDetailsProps {
    name: string,
    symbol: string
}

function CoinDetailsContainer({ name, symbol }: CoinDetailsProps) {
    return (
        <CoinPriceChart details={{
            name: name,
            symbol: symbol
        }} />
    )
}

export default CoinDetailsContainer;