'use client';

import useCoinInfo from '@/hooks/useCoinInfo';
import type { CoinDetails } from '@/interfaces/coin-details';
import { Skeleton } from '@/components/ui/skeleton';
import { Item, ItemContent } from '@/components/ui/item';
import { formatValueIntoCommaSeparated } from '@/services/utils.service';

type CoinInfoProps = CoinDetails;

function CoinInfo({ coinProperties }: CoinInfoProps) {
    const { coinInfo, fetchingCoinInfo } = useCoinInfo({ coinProperties })

    return (
        fetchingCoinInfo ? <Skeleton className="w-full min-h-[220px]" /> :
            <div className="coin-info-container">
                {
                    coinInfo &&
                    <>
                        <div className="header">
                            <div className="rank">
                                #{coinInfo.market_cap_rank}
                            </div>

                            <img
                                className="coin-img"
                                src={coinInfo.image}
                            />

                            <div className="name">
                                {coinProperties.name}
                            </div>
                        </div>

                        <div className="coin-price">
                            {coinInfo.currentPriceWithCurrencySymbol}
                        </div>

                        <div className="other-info-wrapper">
                            <div className="pair">
                                <div className="key">Total Volume</div>
                                <div>
                                    {formatValueIntoCommaSeparated(coinInfo.total_volume, 5, true)}
                                </div>
                            </div>

                            <div className="pair">
                                <div className="key">Market Cap.</div>
                                <div>
                                    {formatValueIntoCommaSeparated(coinInfo.market_cap, 5, true)}
                                </div>
                            </div>

                            <div className="pair">
                                <div className="key">Circulating Supply</div>
                                <div>
                                    {formatValueIntoCommaSeparated(coinInfo.circulating_supply, 5, true)}
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
    )
}

export default CoinInfo;