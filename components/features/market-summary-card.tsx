import { Item, ItemContent, ItemTitle } from '@/components/ui/item';
import Image from 'next/image';
import { CryptoCurrency, type MarketSummaryItem } from '@/interfaces/crypto-currency';
import { formatValueInUsdCompact, getPathName } from "@/services/utils.service";
import React from "react";
import { useOptimisticNavigation } from '@/contexts/navigation-context';
import { useRouter } from 'next/navigation';

interface MarketSummaryItemProps {
    key: string,
    marketSummaryItem: MarketSummaryItem,
}

function MarketSummaryCard({ marketSummaryItem }: MarketSummaryItemProps) {
    const { navigateOptimistically } = useOptimisticNavigation();
    const router = useRouter();

    function onSymbolClick(coin: CryptoCurrency) {
        const path = getPathName('coinDetails', coin);

        if (path) {
            navigateOptimistically(path);
            router.push(path);
        }
    }

    return (
        <Item
            key={marketSummaryItem.id}
            className="item border-[#ebeef5]"
            variant="outline"
        >
            <ItemContent>
                <ItemTitle className="mb-[8px] text-[12px]">
                    {marketSummaryItem.title}
                </ItemTitle>

                <table className="coins-table">
                    <tbody>
                        {
                            (marketSummaryItem.coins.length > 0) && marketSummaryItem.coins.map((coin) => {
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
                                                    <div className="coin-letter-mark cursor-pointer">
                                                        {coin.symbol[0]}
                                                    </div>
                                            }
                                        </td>

                                        <td>
                                            <div
                                                className="crypto-symbol cursor-pointer"
                                                onClick={() => { onSymbolClick(coin) }}
                                            >
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