'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatValueIntoCommaSeparated, roundOffNumber } from '@/services/utils.service';
import { useCoinDetailsContext } from '@/contexts/coin-details-context';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import type { CoinDetails } from '@/interfaces/coin-details';
import useCoinInfo from '@/hooks/useCoinInfo';

type CoinInfoProps = CoinDetails;

function CoinInfo({ coinProperties }: CoinInfoProps) {
    const { coinInfo, fetchingCoinInfo } = useCoinInfo({ coinProperties });
    const { timeFrame, setPriceStatus } = useCoinDetailsContext();
    const [priceChangePercentage, setPriceChangePercentage] = useState<number | null>(null);

    useEffect(() => {
        if (coinInfo && timeFrame?.name) {
            const timeFrameName = timeFrame.name === '1M' ? '30d' : timeFrame.name;
            const key = `price_change_percentage_${timeFrameName.toLowerCase()}_in_currency`;
            const percent = Number(coinInfo[key as keyof typeof coinInfo]);

            const priceChangePercentRoundOffValue = roundOffNumber(percent, 2);
            const priceStatus = (percent > 0) ? 'up' : 'down';

            setPriceStatus(priceStatus);
            setPriceChangePercentage(priceChangePercentRoundOffValue);
        }
    }, [coinInfo, timeFrame?.name])

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
                                {coinInfo.name}
                            </div>
                        </div>

                        <div className={`coin-price`}>
                            <div className="current-price">
                                {coinInfo.currentPriceWithCurrencySymbol}
                            </div>

                            {(priceChangePercentage && priceChangePercentage !== 0) &&
                                <div className={`price-change-percent ${(priceChangePercentage > 0 ? 'success-text' : 'danger-text')}`}>
                                    {
                                        (priceChangePercentage > 0) ? <FaCaretUp /> : <FaCaretDown />
                                    }
                                    {Math.abs(priceChangePercentage)}%
                                </div>}
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