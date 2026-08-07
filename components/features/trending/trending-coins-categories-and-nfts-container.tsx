'use client';

import useTrendingCoinsCategoriesAndNfts from "@/hooks/use-trending-coins-categories-and-nfts";
import TrendingCoinsCategoriesAndNftsTable from "@/components/features/trending/trending-coins-categories-and-nfts-table";
import { TrendingCoinsCategoriesAndNftsClient } from '@/interfaces/trending.interface';
import { Skeleton } from '@/components/ui/skeleton';

function TrendingCoinsCategoriesAndNftsContainer() {
    const { fetchingTrendingCoinsCategoriesAndNfts, trendingCoinsCategoriesAndNfts } = useTrendingCoinsCategoriesAndNfts();

    return (
        <div
            className="trending-coins-categories-and-nfts-container"
        >
            {fetchingTrendingCoinsCategoriesAndNfts ?
                [...Array(4)].map((_, index) => {
                    return (
                        <Skeleton key={'indicator' + index} className="w-full item h-[262px]" />
                    )
                })
                :
                trendingCoinsCategoriesAndNfts.map((trendingItem: TrendingCoinsCategoriesAndNftsClient) => {
                    return (
                        <div
                            key={trendingItem.id}
                            className="item min-w-fit"
                        >
                            <div className="text-[12px] mb-[12px]">
                                {trendingItem.header}
                            </div>

                            <div>
                                <TrendingCoinsCategoriesAndNftsTable
                                    type={trendingItem.type}
                                    list={trendingItem.list}
                                />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TrendingCoinsCategoriesAndNftsContainer;