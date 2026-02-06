'use client';

import useMarketSummary from "@/hooks/useMarketSummary";
import { Skeleton } from '@/components/ui/skeleton';
import MarketSummaryCard from "@/components/features/market-summary-card";

function MarketSummary() {
    const { marketSummary, fetchingMarketSummary } = useMarketSummary();

    return (
        <>
            <div className="text-[20px] font-medium mb-[12px]">
                Overview
            </div>

            <div className="market-summary-body">
                {
                    fetchingMarketSummary ?
                        [...Array(4)].map((_, index) => {
                            return (
                                <Skeleton key={'indicator' + index} className="w-full item h-[161.14px]" />
                            )
                        })
                        :
                        marketSummary.map((marketSummaryItem) => {
                            return (
                                <MarketSummaryCard
                                    key={marketSummaryItem.id}
                                    marketSummaryItem={marketSummaryItem}
                                />
                            )
                        })
                }
            </div>
        </>
    )
}

export default MarketSummary;