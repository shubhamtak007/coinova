import Image from 'next/image';
import { CoinCategoryOrNft } from '@/interfaces/trending.interface';
import { coinSymbolImageSize } from '@/constants/coin.constants';
import { formatValueInUsdCompact } from '@/services/utils.service';

type Bindings = {
    type: string,
    list: CoinCategoryOrNft[]
}

function TrendingCoinsCategoriesAndNftsTable(bindings: Bindings) {
    const { list, type } = bindings;

    return (
        <table className="cn-table">
            <thead>
                <tr>
                    <th className="text-center">#</th>

                    <th className="text-left w-[40%]">
                        Name
                    </th>

                    <th className="text-left">
                        {
                            (type === 'coins' || type === 'nfts') ? 'Price' :
                                type === 'categories' ? 'Market Cap' : ''
                        }
                    </th>

                    <th className="text-right">
                        24hr Change
                    </th>
                </tr>
            </thead>

            <tbody>
                {
                    list.map((coinCategoryOrNft, index) => {
                        return (
                            <tr key={coinCategoryOrNft.id}>
                                <td className="text-center w-[30px]">
                                    {index + 1}
                                </td>

                                <td>
                                    <div className="flex items-center">
                                        {(type === 'coins' || type === 'nfts') &&
                                            <div className="pr-[8px] min-w-[30px]">
                                                {
                                                    coinCategoryOrNft.image ? <Image
                                                        className="coin-symbol-image"
                                                        width={coinSymbolImageSize.width}
                                                        height={coinSymbolImageSize.height}
                                                        alt={`Image of ${coinCategoryOrNft.name}`}
                                                        src={coinCategoryOrNft.image}
                                                    /> :
                                                        <div className="coin-letter-mark cursor-pointer">
                                                            {coinCategoryOrNft.symbol && coinCategoryOrNft.symbol[0]}
                                                        </div>
                                                }
                                            </div>}

                                        {type === 'coins' && <div className="crypto-symbol cursor-pointer">
                                            {coinCategoryOrNft.symbol}
                                        </div>}

                                        {
                                            (type === 'categories' || type === 'nfts') &&
                                            <div className="whitespace-pre w-[100px] overflow-hidden text-ellipsis">
                                                {coinCategoryOrNft.name}
                                            </div>
                                        }
                                    </div>
                                </td>

                                <td className={`text-left`}>
                                    <span className="break-all">
                                        {
                                            type === 'coins' ? formatValueInUsdCompact(Number(coinCategoryOrNft.price), 2) :
                                                type === 'nfts' ? <span>{coinCategoryOrNft.price}</span> :
                                                    (type === 'categories' && coinCategoryOrNft.marketCap) ?
                                                        formatValueInUsdCompact(Number(coinCategoryOrNft.marketCap), 2) : ''
                                        }
                                    </span>
                                </td>

                                <td className="text-right">
                                    {
                                        (type === 'coins' || type === 'nfts') && coinCategoryOrNft.priceChangePercentIn24hr ?
                                            <span className={`${coinCategoryOrNft.priceChangePercentIn24hr > 0 ? 'success-text' : 'danger-text'}`}>
                                                {formatValueInUsdCompact(coinCategoryOrNft.priceChangePercentIn24hr, 2, false)}%
                                            </span>
                                            :
                                            (type === 'categories' && coinCategoryOrNft.marketCapChangePercentIn24hr) ?
                                                <span className={`${coinCategoryOrNft.marketCapChangePercentIn24hr > 0 ? 'success-text' : 'danger-text'}`}>
                                                    {formatValueInUsdCompact(coinCategoryOrNft.marketCapChangePercentIn24hr, 2, false)}%
                                                </span> : ''
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default TrendingCoinsCategoriesAndNftsTable;