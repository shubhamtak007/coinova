import Image from 'next/image';
import { formatValueInUsdCompact } from "@/services/utils.service";
import { getPathName } from "@/services/utils.service";
import { useOptimisticNavigation } from '@/contexts/navigation-context';
import { useRouter } from 'next/navigation';
import type { MarketSummaryItem } from '@/interfaces/market-summary';
import type { CryptoCurrency } from '@/interfaces/crypto-currency';

interface Bindings {
    noOfCoins: number,
    marketSummaryItem: MarketSummaryItem
}

export default function MarketSummaryCoins({ noOfCoins, marketSummaryItem }: Bindings) {
    const router = useRouter();
    const { navigateOptimistically } = useOptimisticNavigation();

    function onSymbolClick(event: React.MouseEvent<HTMLElement>, coin: CryptoCurrency) {
        const path = getPathName('coinDetails', coin);

        if (path) {
            navigateOptimistically(path);
            router.push(path);
        }

        event.preventDefault();
    }

    return (
        <table className="coins-table">
            {noOfCoins === 15 && <thead>
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
                                    noOfCoins === 15 && <td className="text-center">
                                        {index + 1}
                                    </td>
                                }

                                <td>
                                    <div className="flex items-center">
                                        <div className="pr-[8px]">
                                            {
                                                coin.imageUrl ? <Image
                                                    className="object-contain rounded-[10px]"
                                                    width={23}
                                                    height={23}
                                                    alt={`Image of ${coin.name}`}
                                                    src={coin.imageUrl}
                                                /> :
                                                    <div className="coin-letter-mark cursor-pointer">
                                                        {coin.symbol[0]}
                                                    </div>
                                            }
                                        </div>

                                        <a
                                            href={`${getPathName('coinDetails', coin)}`}
                                            target="_blank"
                                            className="crypto-symbol cursor-pointer"
                                            onClick={(event) => { onSymbolClick(event, coin) }}
                                            rel="noopener noreferrer"
                                        >
                                            {coin.symbol}
                                        </a>
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
        </table >
    )
}
