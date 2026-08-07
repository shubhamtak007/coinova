import TrendingCoinsCategoriesAndNftsContainer from '@/components/features/trending/trending-coins-categories-and-nfts-container';
import { Suspense } from 'react';

async function Trending() {
    return (
        <Suspense>
            <TrendingCoinsCategoriesAndNftsContainer />
        </Suspense>
    )
}

export default Trending;