'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatValueIntoCommaSeparated, roundOffNumber } from '@/services/utils.service';
import { useCoinDetailsContext } from '@/contexts/coin-details-context';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { CoinDetails } from '@/interfaces/coin-details';
import useCoinInfo from '@/hooks/useCoinInfo';
import { coinKeyList } from '@/constants/coin.constants';

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
        fetchingCoinInfo ? <Skeleton className="w-full min-h-[308px]" /> :
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
                            {
                                coinKeyList.map((coinKeyItem, index) => {
                                    return (
                                        <div
                                            key={`${index}-${coinKeyItem.key}`}
                                            className="pair"
                                        >
                                            <div className="key flex items-center">
                                                <div className="mr-[4px]">
                                                    {coinKeyItem.name}
                                                </div>

                                                {coinKeyItem.toolTipValue ? <Tooltip>
                                                    <TooltipTrigger>
                                                        <Info size={'15'} />
                                                    </TooltipTrigger>

                                                    <TooltipContent
                                                        side="bottom"
                                                        className="max-w-[260px]"
                                                    >
                                                        {coinKeyItem.toolTipValue}
                                                    </TooltipContent>
                                                </Tooltip> : undefined}
                                            </div>

                                            <div className="font-medium">
                                                {formatValueIntoCommaSeparated(Number(coinInfo[coinKeyItem.key]), 0, true)}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                }
            </div>
    )
}

export default CoinInfo;