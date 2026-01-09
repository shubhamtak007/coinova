'use client';

import useCoinList from '@/hooks/useCoinList';
import Image from 'next/image';
import { useState } from 'react';
import { formatValueIntoCommaSeparated, roundOffNumber, formatValueInCompactUsd } from '@/services/utils.service';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

function CoinList() {
    let [currentPageNumber, setCurrentPageNumber] = useState(1);
    const { coinList, fetchingCoinList } = useCoinList({ currentPageNumber });

    return (
        <div className="coins-sst-container">

            <table className="coins-server-side-table">
                <thead>
                    <tr>
                        <th className="w-[5%] text-center">#</th>
                        <th className="w-[35%] text-left">Coin</th>
                        <th className="text-right">Current Price</th>
                        <th className="text-right">24h</th>
                        <th className="text-right">Total Volume</th>
                        <th className="text-right">Market Cap.</th>
                    </tr>
                </thead>

                {
                    fetchingCoinList ?
                        <tbody>
                            <tr>
                                <td colSpan={6} className="!p-[unset]">
                                    <Skeleton className="rounded-md w-[100%] h-[490px]" />
                                </td>
                            </tr>
                        </tbody> :
                        <tbody>
                            {
                                ((coinList.length > 0) ? coinList.map((coin, index) => {
                                    return (
                                        <tr key={coin.id}>
                                            <td className="text-center">
                                                {index + 1 + ((currentPageNumber > 1) ? ((currentPageNumber - 1) * 10) : 0)}
                                            </td>

                                            <td>
                                                <div className="flex items-center">
                                                    <div className="mr-[6px]">
                                                        <Image
                                                            className="object-contain rounded-[10px]"
                                                            width={24}
                                                            height={24}
                                                            alt={`Image of ${coin.name}`}
                                                            src={coin.image}
                                                        />
                                                    </div>

                                                    <div className="font-semibold mr-[6px]">
                                                        {coin.name}
                                                    </div>

                                                    <div className="text-[12px]">
                                                        {coin.symbol.toUpperCase()}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="text-right">
                                                {formatValueIntoCommaSeparated(coin.current_price, 5, true)}
                                            </td>

                                            <td className="text-right">
                                                <div className={`flex items-center justify-end ${(coin.price_change_percentage_24h > 0 ? 'success-text' : 'danger-text')}`}>
                                                    <span className="relative bottom-[1px]">
                                                        {(coin.price_change_percentage_24h > 0) ? <FaCaretUp /> : <FaCaretDown />}
                                                    </span>
                                                    {roundOffNumber(coin.price_change_percentage_24h, 2) + '%'}
                                                </div>
                                            </td>

                                            <td className="text-right">
                                                {formatValueInCompactUsd(coin.total_volume, 2)}
                                            </td>

                                            <td className="text-right">
                                                {formatValueInCompactUsd(coin.market_cap, 2)}
                                            </td>
                                        </tr>
                                    )
                                }) : <tr>
                                    <td
                                        colSpan={6}
                                        className="italic text-[#ccc] text-center"
                                    >
                                        No coins found.
                                    </td>
                                </tr>)
                            }
                        </tbody>
                }
            </table>

            <div className="pagination-btn-group space-x-2 mt-[12px] text-center">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setCurrentPageNumber(currentPageNumber - 1) }}
                    disabled={(currentPageNumber === 1 || fetchingCoinList)}
                >
                    Previous
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setCurrentPageNumber((prev) => prev + 1) }}
                    disabled={(coinList.length === 0 || fetchingCoinList)}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default CoinList;