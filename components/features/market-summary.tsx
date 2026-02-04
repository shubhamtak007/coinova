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

            <div className="flex flex-wrap gap-3 justify-between">
                {
                    fetchingMarketSummary ?
                        <Skeleton className="w-full h-[161.14px]" /> :
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