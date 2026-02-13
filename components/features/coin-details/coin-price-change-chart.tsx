'use client';

import { useRef, useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Text } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Item, ItemContent, ItemHeader } from "@/components/ui/item";
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useCoinPriceChangeChart from '@/hooks/useCoinPriceChangeChart';
import type { CoinDetails } from '@/interfaces/coin-details';
import { formatValueInUsdCompact } from '@/services/utils.service';
import { useCoinDetailsContext } from '@/contexts/coin-details-context';
import { AxisInterval } from 'recharts/types/util/types';

type CoinPriceChangeChartProps = CoinDetails;

const chartConfig = {
    price: {
        label: 'Price (USD)',
        color: 'var(--chart-2)'
    }
} satisfies ChartConfig;

const tabList = [
    { name: '24H', value: '1' },
    { name: '7D', value: '7' },
    { name: '14D', value: '14' },
    { name: '1M', value: '30' },
    { name: '200D', value: '200' },
    { name: '1Y', value: '365' }
]

function CoinPriceChart({ coinProperties }: CoinPriceChangeChartProps) {
    const xAxisDataKey = useRef<string>('date').current;
    const yAxisDataKey = useRef<string>('price').current;
    const [days, setDays] = useState<string>(tabList[0].value);
    const { fetchingPriceChangeList, priceChangeList } = useCoinPriceChangeChart({ coinProperties, days });
    const { timeFrame, setTimeFrame, priceStatus } = useCoinDetailsContext();

    useEffect(() => {
        if (days) {
            const foundTimeFrame = tabList.find((tab) => tab.value === days);
            if (foundTimeFrame) setTimeFrame(foundTimeFrame);
        }
    }, [days]);

    function onTabChange(value: string) {
        setDays(value);
    }

    function formatXAxisTick(milliseconds: string): string {
        const currentYear = new Date().getFullYear();

        if (timeFrame?.name === '24H') {
            return new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).format(new Date(milliseconds)).toUpperCase();
        } else {
            return new Intl.DateTimeFormat('en-US', {
                day: '2-digit',
                month: 'short',
                year: (new Date(milliseconds).getFullYear() !== currentYear) ? 'numeric' : undefined
            }).format(new Date(milliseconds));
        }
    }

    function formatYAxisTick(price: string): string {
        const formattedPrice = formatValueInUsdCompact(Number(price), 6)
        return String(formattedPrice);
    }

    return (
        <Item
            variant="outline"
            className="p-[10px]"
        >
            <ItemHeader className="overflow-x-auto">
                <Tabs
                    className="mb-[12px]"
                    onValueChange={(value) => { onTabChange(value) }}
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

            <ItemContent className={`relative min-h-[100px]`}>
                {
                    fetchingPriceChangeList ?
                        <div className="hz-and-vert-center"><Spinner className="size-10" /></div> :
                        <>
                            {
                                priceChangeList.length > 0 ?
                                    <ChartContainer
                                        className="max-h-[350px]"
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
                                                minTickGap={40}
                                                tickFormatter={formatXAxisTick}
                                                textAnchor="middle"
                                                tickMargin={5}
                                            />

                                            <YAxis
                                                dataKey={yAxisDataKey}
                                                axisLine={false}
                                                tickCount={5}
                                                tickFormatter={formatYAxisTick}
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
                                                fill={priceStatus === 'up' ? 'var(--chart-2)' : 'var(--chart-1)'}
                                                fillOpacity={0.1}
                                                stroke={priceStatus === 'up' ? 'var(--chart-2)' : 'var(--chart-1)'}
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