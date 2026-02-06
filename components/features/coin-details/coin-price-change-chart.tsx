'use client';

import { useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Item, ItemContent, ItemHeader } from "@/components/ui/item";
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
    const xAxisDataKey = useRef<string>('date').current;
    const yAxisDataKey = useRef<string>('price').current;

    function onTabChange(value: string) {
        setDays(value);
    }

    function formatXAxisTick(milliseconds: string): string {
        const currentDate = new Date();
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: (currentDate.getFullYear() === new Date(milliseconds).getFullYear()) ? undefined : 'numeric'
        }).format(new Date(milliseconds));
    }

    return (
        <Item
            variant="outline"
            className="p-[10px]"
        >
            <ItemHeader>
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
            </ItemHeader>

            <ItemContent className={`relative min-h-[200px]`}>
                {
                    fetchingPriceChangeList ?
                        <div className="hz-and-vert-center"><Spinner className="size-10" /></div> :
                        <>
                            {
                                priceChangeList.length > 0 ?
                                    <ChartContainer
                                        config={chartConfig}
                                    >
                                        <AreaChart
                                            accessibilityLayer
                                            data={priceChangeList}
                                        >
                                            <CartesianGrid vertical={true} />

                                            <XAxis
                                                dataKey={xAxisDataKey}
                                                tickLine={false}
                                                axisLine={false}
                                                tickCount={5}
                                                interval={Math.floor(priceChangeList.length / 5)}
                                                tickFormatter={formatXAxisTick}
                                            />

                                            <YAxis
                                                dataKey={yAxisDataKey}
                                                axisLine={false}
                                                tickCount={5}
                                            />

                                            <ChartTooltip
                                                content={
                                                    <ChartTooltipContent
                                                        indicator="line"
                                                        xAxisDataKey={xAxisDataKey}
                                                        yAxisDataKey={yAxisDataKey}
                                                    />
                                                }
                                            />

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
                                    :
                                    <div className="hz-and-vert-center no-value-text">
                                        No data found.
                                    </div>
                            }
                        </>
                }
            </ItemContent>
        </Item>
    )
}

export default CoinPriceChart;