'use client';

import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { formatValueInUsdCompact, formatValueIntoCommaSeparated, roundOffNumber } from '@/services/utils.service';
import type { CoingeckoCrypto } from '@/interfaces/CryptoCurrency';

export const columns: ColumnDef<CoingeckoCrypto>[] = [
    {
        id: 'indexNumber',
        accessorKey: '',
        header: ({ header }) => { return '#' },
        cell: ({ row, table }) => {
            const currentPageNumber = table.options.meta?.currentPageNumber;
            const rowsPerPage = table.options.meta?.rowsPerPage ? table.options.meta?.rowsPerPage : 0;
            return (row.index + 1) + (currentPageNumber === 1 ? 0 : rowsPerPage)
        },
        meta: {
            headerClassNames: 'w-[5%] text-center',
            cellClassNames: 'text-center'
        }
    }, {
        id: 'coinDetails',
        accessorKey: '',
        header: ({ header }) => 'Coin',
        cell: ({ row }) => {
            const imageUrl: string = row.original['image'];
            const name: string = row.original['name'];
            const symbol: string = row.original['symbol'];

            return <div className="min-w-[120px] flex items-center">
                <div className="min-w-[26px] mr-[8px]">
                    {
                        imageUrl ?
                            <Image
                                className="object-cover rounded-[10px]"
                                width={24}
                                height={24}
                                alt={`Image of ${name}`}
                                src={imageUrl}
                            />
                            :
                            <div className="coin-letter-mark">
                                {symbol[0].toUpperCase()}
                            </div>
                    }
                </div>

                <div className="text-left font-semibold mr-[6px]">
                    {name}

                    <div className="text-[12px] text-gray-400">
                        {symbol.toUpperCase()}
                    </div>
                </div>
            </div>
        },
        meta: {
            headerClassNames: 'w-[35%] text-left',
            cellClassNames: 'text-center'
        }
    }, {
        accessorKey: 'current_price',
        header: ({ header }) => 'Current Price',
        cell: ({ row }) => {
            const currentPrice: number = row.getValue('current_price');
            return currentPrice && formatValueIntoCommaSeparated(currentPrice, 5, true)
        },
        meta: {
            headerClassNames: 'text-right',
            cellClassNames: 'text-right'
        }
    }, {
        accessorKey: 'price_change_percentage_1h_in_currency',
        header: ({ header }) => '1h',
        cell: ({ row }) => {
            const priceChangeIn1hInPercent: number = row.getValue('price_change_percentage_1h_in_currency');

            return priceChangeIn1hInPercent && <div className={`flex items-center justify-end ${(priceChangeIn1hInPercent > 0 ? 'success-text' : 'danger-text')}`}>
                <span className="relative bottom-[1px]">
                    {(priceChangeIn1hInPercent > 0) ? <FaCaretUp /> : <FaCaretDown />}
                </span>
                {roundOffNumber(priceChangeIn1hInPercent, 1) + '%'}
            </div>
        },
        meta: {
            headerClassNames: 'text-right',
            cellClassNames: 'text-right'
        }
    }, {
        accessorKey: 'price_change_percentage_24h',
        header: ({ header }) => '24h',
        cell: ({ row }) => {
            const priceChangeIn24hInPercent: number = row.getValue('price_change_percentage_24h');

            return priceChangeIn24hInPercent && <div className={`flex items-center justify-end ${(priceChangeIn24hInPercent > 0 ? 'success-text' : 'danger-text')}`}>
                <span className="relative bottom-[1px]">
                    {(priceChangeIn24hInPercent > 0) ? <FaCaretUp /> : <FaCaretDown />}
                </span>
                {roundOffNumber(priceChangeIn24hInPercent, 1) + '%'}
            </div>
        },
        meta: {
            headerClassNames: 'text-right',
            cellClassNames: 'text-right'
        }
    }, {
        accessorKey: 'price_change_percentage_7d_in_currency',
        header: ({ header }) => '7d',
        cell: ({ row }) => {
            const priceChangeIn7DaysInPercent: number = row.getValue('price_change_percentage_7d_in_currency');

            return priceChangeIn7DaysInPercent && <div className={`flex items-center justify-end ${(priceChangeIn7DaysInPercent > 0 ? 'success-text' : 'danger-text')}`}>
                <span className="relative bottom-[1px]">
                    {(priceChangeIn7DaysInPercent > 0) ? <FaCaretUp /> : <FaCaretDown />}
                </span>
                {roundOffNumber(priceChangeIn7DaysInPercent, 1) + '%'}
            </div>
        },
        meta: {
            headerClassNames: 'text-right',
            cellClassNames: 'text-right'
        }
    }, {
        accessorKey: 'total_volume',
        header: ({ header }) => 'Total Volume',
        cell: ({ row }) => {
            const totalVolume: number = row.getValue('total_volume');
            return totalVolume && formatValueInUsdCompact(totalVolume, 2)
        },
        meta: {
            headerClassNames: 'text-right',
            cellClassNames: 'text-right'
        }
    }, {
        accessorKey: 'market_cap',
        header: ({ header }) => 'Market Cap.',
        cell: ({ row }) => {
            const marketCapital: number = row.getValue('market_cap');
            return marketCapital && formatValueInUsdCompact(marketCapital, 2)
        },
        meta: {
            headerClassNames: 'text-right',
            cellClassNames: 'text-right'
        }
    }, {
        accessorKey: 'circulating_supply',
        header: ({ header }) => {
            return <div className="flex justify-end">
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
        },
        cell: ({ row }) => {
            const circulatingSupply: number = row.getValue('circulating_supply');
            return circulatingSupply && formatValueInUsdCompact(circulatingSupply, 2)
        },
        meta: {
            headerClassNames: 'text-right !pr-[12px]',
            cellClassNames: 'text-right !pr-[12px]'
        }
    }
]