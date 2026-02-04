'use client';

import { useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Item, ItemContent } from "@/components/ui/item";
import type { CoinDetails } from '@/interfaces/coin-details';
import useCoinPriceChangeChart from '@/hooks/useCoinPriceChangeChart';
import { Spinner } from '@/components/ui/spinner';

type CoinPriceChangeChartProps = CoinDetails;

const chartConfig = {
    price: {
        label: 'Price (USD)',
        color: 'var(--chart-2)'
    }
} satisfies ChartConfig;

function CoinPriceChart({ coinProperties }: CoinPriceChangeChartProps) {
    let coinName = useRef<string>(coinProperties.name).current;
    const { priceChangeList, fetchingPriceChangeList } = useCoinPriceChangeChart({ coinProperties });

    return (
        <Item
            variant="outline"
            className="relative max-h-[480px]"
        >
            <ItemContent className="h-[480px]">
                {
                    fetchingPriceChangeList ?
                        <div className="hz-and-vert-center"><Spinner className="size-10" /></div> :
                        <ChartContainer config={chartConfig}>
                            <AreaChart
                                accessibilityLayer
                                data={priceChangeList}
                            >
                                <CartesianGrid vertical={false} />

                                <XAxis
                                    tickLine={false}
                                    axisLine={false}
                                    dataKey="time"
                                />

                                <YAxis
                                    dataKey="price"
                                    axisLine={false}
                                />

                                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />

                                <Area
                                    dataKey="price"
                                    type="monotone"
                                    fill="var(--chart-2)"
                                    fillOpacity={0.1}
                                    stroke="var(--chart-2)"
                                    strokeWidth={1}
                                />

                            </AreaChart>
                        </ChartContainer>
                }
            </ItemContent>
        </Item>
    )
}

export default CoinPriceChart;