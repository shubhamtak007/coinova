'use client';

import useCoinInfo from '@/hooks/useCoinInfo';
import type { CoinDetails } from '@/interfaces/coin-details';
import { Skeleton } from '@/components/ui/skeleton';

type CoinInfoProps = CoinDetails;

function CoinInfo({ coinProperties }: CoinInfoProps) {
    const { coinInfo, fetchingCoinInfo } = useCoinInfo({ coinProperties })

    return (
        fetchingCoinInfo ? <Skeleton className="w-full min-h-[300px]" /> :
            <>
                {
                    coinInfo &&
                    <>
                        <div className="flex mb-[8px]">
                            <img
                                className="object-contain w-[30px] h-[30px] mr-[8px]"
                                src={coinInfo.image}
                            />

                            <div className="font-semibold text-[20px]">
                                {coinProperties.name}
                            </div>
                        </div>

                        <div className="font-semibold text-[36px]">
                            {coinInfo.currentPriceWithCurrencySymbol}
                        </div>
                    </>
                }
            </>
    )
}

export default CoinInfo;