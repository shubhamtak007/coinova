'use client';

import { useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Item, ItemContent } from "@/components/ui/item";
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useCoinPriceChangeChart from '@/hooks/useCoinPriceChangeChart';
import type { CoinDetails } from '@/interfaces/coin-details';

type CoinPriceChangeChartProps = CoinDetails;

const chartConfig = {
    price: {
        label: 'Price (USD)',
        color: 'var(--chart-2)'
    }
} satisfies ChartConfig;

function CoinPriceChart({ coinProperties }: CoinPriceChangeChartProps) {
    const tabList = useRef<{ name: string, value: string }[]>([
        { name: '24H', value: '1' },
        { name: '7D', value: '7' },
        { name: '1M', value: '30' },
        { name: '3M', value: '90' },
        { name: '6M', value: '180' },
        { name: '1Y', value: '365' }
    ]).current;

    const [days, setDays] = useState<string>(tabList[0].value);
    const { fetchingPriceChangeList, priceChangeList } = useCoinPriceChangeChart({ coinProperties, days });

    function onTabChange(value: string) {
        setDays(value);
    }

    return (
        <Item
            variant="outline"
            className={`relative ${fetchingPriceChangeList ? 'min-h-[420px]' : 'min-h-[unset]'}`}
        >
            <ItemContent
                className="min-h-[420px]"
            >
                <Tabs
                    onValueChange={(value) => { onTabChange(value) }}
                    className="mb-[12px]"
                    defaultValue={days}
                >
                    <TabsList>
                        {
                            tabList.map((tab) => {
                                return (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={String(tab.value)}
                                        disabled={fetchingPriceChangeList}
                                    >
                                        {tab.name}
                                    </TabsTrigger>
                                )
                            })
                        }
                    </TabsList>
                </Tabs>

                {
                    fetchingPriceChangeList ?
                        <div className="hz-and-vert-center"><Spinner className="size-10" /></div> :
                        <ChartContainer
                            config={chartConfig}
                        >
                            <AreaChart
                                accessibilityLayer
                                data={priceChangeList}
                            >
                                <CartesianGrid vertical={true} />

                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <YAxis
                                    dataKey="price"
                                    axisLine={false}
                                    tickCount={5}
                                />

                                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />

                                <Area
                                    dataKey="price"
                                    type="monotone"
                                    fill="var(--chart-2)"
                                    fillOpacity={0.1}
                                    stroke="var(--chart-2)"
                                    strokeWidth={2}
                                />

                            </AreaChart>
                        </ChartContainer>
                }
            </ItemContent>
        </Item>
    )
}

export default CoinPriceChart;