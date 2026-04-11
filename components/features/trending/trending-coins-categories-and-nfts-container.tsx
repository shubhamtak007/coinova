'use client';

import { Spinner } from '@/components/ui/spinner';
import useTrendingCoinsCategoriesAndNfts from "@/hooks/useTrendingCoinsCategoriesAndNfts";
import TrendingCoinsCategoriesAndNftsTable from "@/components/features/trending/trending-coins-categories-and-nfts-table";
import { TrendingCoinsCategoriesAndNftsClient } from '@/interfaces/trending.interface';

function TrendingCoinsCategoriesAndNftsContainer() {
    const { fetchingTrendingCoinsCategoriesAndNfts, trendingCoinsCategoriesAndNfts } = useTrendingCoinsCategoriesAndNfts();

    return (
        <>
            {fetchingTrendingCoinsCategoriesAndNfts ?
                <div className="hz-and-vert-center">
                    <Spinner className="size-20" />
                </div>
                :
                <div
                    className="trending-coins-categories-and-nfts-container"
                >
                    {
                        trendingCoinsCategoriesAndNfts.map((trendingItem: TrendingCoinsCategoriesAndNftsClient) => {
                            return (
                                <div
                                    key={trendingItem.id}
                                    className="item"
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
            }
        </>
    )
}

export default TrendingCoinsCategoriesAndNftsContainer;