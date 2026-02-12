'use client';

import useGlobalMarketStats from '@/hooks/useGlobalMarketStats';
import { formatValueInUsdCompact, roundOffNumber } from '@/services/utils.service';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

function GlobalMarketStats() {
    const { globalMarketStats, fetchingGlobalMarketStats } = useGlobalMarketStats();

    return (
        <>
            {
                fetchingGlobalMarketStats ?
                    <Skeleton className="rounded-[var(--border-radius)] w-[830px] h-[22.75px]" /> :
                    <div className="flex">
                        {
                            globalMarketStats.totalCoins &&
                            <div className="pair-container">
                                <div className="name">
                                    Total Coins
                                </div>

                                <div className="value">
                                    {globalMarketStats.totalCoins}
                                </div>
                            </div>
                        }

                        {
                            globalMarketStats.exchanges &&
                            <div className="pair-container">
                                <div className="name">
                                    Exchanges
                                </div>

                                <div className="value">
                                    {globalMarketStats.exchanges}
                                </div>
                            </div>
                        }

                        {
                            globalMarketStats.totalMarketCapital &&
                            <div className="pair-container">
                                <div className="name">
                                    Market Cap
                                </div>

                                <div className="value flex items-center">
                                    {formatValueInUsdCompact(globalMarketStats.totalMarketCapital.value, 3)}

                                    {
                                        globalMarketStats.totalMarketCapitalChange24hInUsd &&
                                        <div className={`ml-[6px] flex items-center ${(globalMarketStats.totalMarketCapitalChange24hInUsd > 0 ? 'success-text' : 'danger-text')}`}>
                                            <span className="relative bottom-[1px]">
                                                {(globalMarketStats.totalMarketCapitalChange24hInUsd > 0) ? <FaCaretUp /> : <FaCaretDown />}
                                            </span>
                                            {roundOffNumber(globalMarketStats.totalMarketCapitalChange24hInUsd, 2) + '%'}
                                        </div>
                                    }
                                </div>
                            </div>
                        }

                        {
                            globalMarketStats.totalVolume &&
                            <div className="pair-container">
                                <div className="name">
                                    24h Vol
                                </div>

                                <div className="value">
                                    {formatValueInUsdCompact(globalMarketStats.totalVolume, 3)}
                                </div>
                            </div>
                        }

                        {
                            globalMarketStats.totalMarketCapital &&
                            <div className="pair-container">
                                <div className="name">
                                    Dominance
                                </div>


                                <div className="value">
                                    <span className="mr-[10px]">
                                        {globalMarketStats.totalMarketCapital.marketCapShareList[0].name}&nbsp;
                                        {globalMarketStats.totalMarketCapital.marketCapShareList[0].value}
                                    </span>

                                    <span>
                                        {globalMarketStats.totalMarketCapital.marketCapShareList[1].name}&nbsp;
                                        {globalMarketStats.totalMarketCapital.marketCapShareList[1].value}
                                    </span>
                                </div>
                            </div>
                        }
                    </div>
            }
        </>
    )
}

export default GlobalMarketStats;