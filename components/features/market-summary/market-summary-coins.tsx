import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatValueInUsdCompact } from "@/services/utils.service";
import { getUiRoute } from "@/services/utils.service";
import { useOptimisticNavigation } from '@/contexts/navigation-context';
import { coinSymbolImageSize } from '@/constants/coin.constants';
import type { MarketSummaryItem } from '@/interfaces/market-summary.interface';
import type { CryptoCurrency } from '@/interfaces/coin.interface';

interface Bindings {
    noOfCoins: number,
    marketSummaryItem: MarketSummaryItem
}

export default function MarketSummaryCoins({ noOfCoins, marketSummaryItem }: Bindings) {
    const { navigateOptimistically } = useOptimisticNavigation();
    const router = useRouter();
    function onSymbolClick(event: React.MouseEvent<HTMLElement>, coin: CryptoCurrency) {
        const route = getUiRoute('coinAnalysis', coin);

        if (route) {
            navigateOptimistically(route);
            router.push(route);
        }
    }

    return (
        <table className="coins-table">
            {noOfCoins > 3 && <thead>
                <tr>
                    <th className="w-[35px]">#</th>
                    <th className="text-left w-[30%]">Coin</th>
                    <th className="text-left">Price</th>
                    <th className="text-right">24hr Change</th>
                </tr>
            </thead>}

            <tbody>
                {
                    (marketSummaryItem.coins.length > 0) &&
                    marketSummaryItem.coins.slice(0, noOfCoins).map((coin, index) => {
                        return (
                            <tr key={coin.id}>
                                {
                                    noOfCoins > 3 && <td className="text-center">
                                        {index + 1}
                                    </td>
                                }

                                <td className={`${noOfCoins === 3 ? 'w-[40%]' : ''}`}>
                                    <div className="flex items-center">
                                        <div className="pr-[8px]">
                                            {
                                                coin.imageUrl ? <Image
                                                    className="coin-symbol-image"
                                                    width={coinSymbolImageSize.width}
                                                    height={coinSymbolImageSize.height}
                                                    alt={`Image of ${coin.name}`}
                                                    src={coin.imageUrl}
                                                /> :
                                                    <div className="coin-letter-mark cursor-pointer">
                                                        {coin.symbol[0]}
                                                    </div>
                                            }
                                        </div>

                                        <div
                                            className="crypto-symbol cursor-pointer"
                                            onClick={(event) => { onSymbolClick(event, coin) }}
                                        >
                                            {coin.symbol}
                                        </div>
                                    </div>
                                </td>

                                <td className={`text-left`}>
                                    {
                                        coin.lastPrice &&
                                        <span className="break-all">
                                            {coin.lastPrice > 999 ? formatValueInUsdCompact(coin.lastPrice, 2) : '$' + coin.lastPrice}
                                        </span>
                                    }
                                </td>

                                <td className="text-right">
                                    {
                                        coin.priceChangePercent &&
                                        <>
                                            {(marketSummaryItem.id === 'topGainer' || marketSummaryItem.id === 'topVolume' || marketSummaryItem.id === 'trending') &&
                                                <span className={`${coin.priceChangePercent > 0 ? 'success-text' : 'danger-text'}`}>
                                                    {formatValueInUsdCompact(coin.priceChangePercent, 2, false)}%
                                                </span>}

                                            {(marketSummaryItem.id === 'topLoser') &&
                                                <span className="danger-text">{formatValueInUsdCompact(coin.priceChangePercent, 2, false)}%</span>}
                                        </>
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table >
    )
}
