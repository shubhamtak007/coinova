'use client';

import useCoinList from '@/hooks/useCoinList';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { formatValueIntoCommaSeparated, roundOffNumber, formatValueInCompactUsd } from '@/services/utils.service';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { BsFillInfoCircleFill } from "react-icons/bs";

function CoinList() {
    let [currentPageNumber, setCurrentPageNumber] = useState(1);
    const colspanValue = useRef<number>(8).current;
    const { coinList, fetchingCoinList } = useCoinList({ currentPageNumber });

    return (
        <>
            <div className="coins-sst-container">
                <table className="coins-server-side-table">
                    <thead>
                        <tr>
                            <th className="w-[5%] text-center">#</th>
                            <th className="w-[35%] text-left">Coin</th>
                            <th className="text-right">Current Price</th>
                            <th className="text-right">1h</th>
                            <th className="text-right">24h</th>
                            <th className="text-right">7d</th>
                            <th className="text-right">Total Volume</th>
                            <th className="text-right">Market Cap.</th>
                            <th className="text-right !pr-[12px]">
                                <div className="flex justify-end">
                                    <div className="mr-[4px]">
                                        Circulating Supply
                                    </div>

                                    <Tooltip>
                                        <TooltipTrigger>
                                            <BsFillInfoCircleFill />
                                        </TooltipTrigger>

                                        <TooltipContent
                                            data-side={'top'}
                                            side={'top'}
                                            className="w-[300px]"
                                        >
                                            The amount of coins that are circulating in the market and are in public
                                            hands. It is analogous to the flowing shares in the stock market.
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </th>
                        </tr>
                    </thead>

                    {
                        fetchingCoinList ?
                            <tbody>
                                <tr>
                                    <td colSpan={colspanValue} className="!p-[unset]">
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
                                                    <div className="min-w-[120px] flex items-center">
                                                        <div className="min-w-[26px] mr-[8px]">
                                                            {
                                                                coin.image ?
                                                                    <Image
                                                                        className="object-cover rounded-[10px]"
                                                                        width={24}
                                                                        height={24}
                                                                        alt={`Image of ${coin.name}`}
                                                                        src={coin.image}
                                                                    />
                                                                    :
                                                                    <div className="coin-letter-mark">
                                                                        {coin.symbol[0].toUpperCase()}
                                                                    </div>
                                                            }
                                                        </div>

                                                        <div className="text-left font-semibold mr-[6px]">
                                                            {coin.name}

                                                            <div className="text-[12px] text-gray-400">
                                                                {coin.symbol.toUpperCase()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="text-right">
                                                    {formatValueIntoCommaSeparated(coin.current_price, 5, true)}
                                                </td>

                                                <td className="text-right">
                                                    {coin.price_change_percentage_1h_in_currency && <div className={`flex items-center justify-end ${(coin.price_change_percentage_1h_in_currency > 0 ? 'success-text' : 'danger-text')}`}>
                                                        <span className="relative bottom-[1px]">
                                                            {(coin.price_change_percentage_1h_in_currency > 0) ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                        {roundOffNumber(coin.price_change_percentage_1h_in_currency, 1) + '%'}
                                                    </div>}
                                                </td>

                                                <td className="text-right">
                                                    {coin.price_change_percentage_24h && <div className={`flex items-center justify-end ${(coin.price_change_percentage_24h > 0 ? 'success-text' : 'danger-text')}`}>
                                                        <span className="relative bottom-[1px]">
                                                            {(coin.price_change_percentage_24h > 0) ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                        {roundOffNumber(coin.price_change_percentage_24h, 1) + '%'}
                                                    </div>}
                                                </td>

                                                <td className="text-right">
                                                    {coin.price_change_percentage_7d_in_currency && <div className={`flex items-center justify-end ${(coin.price_change_percentage_7d_in_currency > 0 ? 'success-text' : 'danger-text')}`}>
                                                        <span className="relative bottom-[1px]">
                                                            {(coin.price_change_percentage_7d_in_currency > 0) ? <FaCaretUp /> : <FaCaretDown />}
                                                        </span>
                                                        {roundOffNumber(coin.price_change_percentage_7d_in_currency, 1) + '%'}
                                                    </div>}
                                                </td>

                                                <td className="text-right">
                                                    {coin.total_volume && formatValueInCompactUsd(coin.total_volume, 2)}
                                                </td>

                                                <td className="text-right">
                                                    {coin.market_cap && formatValueInCompactUsd(coin.market_cap, 2)}
                                                </td>

                                                <td className="text-right !pr-[12px]">
                                                    {coin.circulating_supply && formatValueInCompactUsd(coin.circulating_supply, 2)}
                                                </td>
                                            </tr>
                                        )
                                    }) : <tr>
                                        <td
                                            colSpan={colspanValue}
                                            className="italic text-[#ccc] text-center"
                                        >
                                            No coins found.
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                    }
                </table>
            </div>

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
        </>
    )
}

export default CoinList;