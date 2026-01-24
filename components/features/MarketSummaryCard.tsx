import { Item, ItemContent, ItemTitle } from '@/components/ui/item';
import Image from 'next/image';
import { type MarketSummaryItem } from '@/interfaces/CryptoCurrency';
import { formatValueInUsdCompact } from "@/services/utils.service";
import React from "react";

interface MarketSummaryItemProps {
    key: string,
    marketSummaryItem: MarketSummaryItem,
}

function MarketSummaryCard({ marketSummaryItem }: MarketSummaryItemProps) {
    return (
        <Item
            key={marketSummaryItem.id}
            className="flex-1 min-w-[270px] border-[#ebeef5]"
            variant="outline"
        >
            <ItemContent>
                <ItemTitle className="mb-[8px] text-[12px]">
                    {marketSummaryItem.title}
                </ItemTitle>

                <table className="coins-table">
                    <tbody>
                        {
                            marketSummaryItem.coins.map((coin) => {
                                return (
                                    <tr key={coin.id}>
                                        <td className="w-[30px]">
                                            {
                                                coin.imageUrl ? <Image
                                                    className="object-contain rounded-[10px]"
                                                    width={28}
                                                    height={28}
                                                    alt={`Image of ${coin.name}`}
                                                    src={coin.imageUrl}
                                                /> :
                                                    <div className="coin-letter-mark">
                                                        {coin.symbol[0]}
                                                    </div>
                                            }
                                        </td>

                                        <td className="">
                                            <div className="crypto-symbol">
                                                {coin.symbol}
                                            </div>
                                        </td>

                                        <td className={`text-left`}>
                                            {
                                                coin.lastPrice &&
                                                <span>
                                                    {coin.lastPrice > 999 ? formatValueInUsdCompact(coin.lastPrice, 2) : '$' + coin.lastPrice}
                                                </span>
                                            }
                                        </td>

                                        <td className="text-right">
                                            {
                                                coin.priceChangePercent && (marketSummaryItem.id === 'topGainer' || marketSummaryItem.id === 'topVolume' || marketSummaryItem.id === 'trending') &&
                                                <span className={`${coin.priceChangePercent > 0 ? 'success-text' : 'danger-text'}`}>
                                                    {coin.priceChangePercent > 0 ? '+' : ''}
                                                    {coin.priceChangePercent}%
                                                </span>
                                            }

                                            {
                                                (marketSummaryItem.id === 'topLoser') &&
                                                <span className="danger-text">{coin.priceChangePercent}%</span>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </ItemContent>
        </Item>
    )
}

export default React.memo(MarketSummaryCard);