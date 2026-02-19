'use client';

import { useRef, useState, useEffect } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { AreaChart, XAxis, YAxis, Area, CartesianGrid } from 'recharts';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useCoinPriceChangeChart from '@/hooks/useCoinPriceChangeChart';
import type { CoinDetails } from '@/interfaces/coin-details';
import { formatValueInUsdCompact } from '@/services/utils.service';
import { useCoinDetailsContext } from '@/contexts/coin-details-context';
import { coinPriceChartTimeframeList } from '@/constants/coin.constants';

type CoinPriceChangeChartProps = CoinDetails;

const chartConfig = {
    price: {
        label: 'Price (USD)',
        color: 'var(--chart-2)'
    }
} satisfies ChartConfig;

function CoinPriceChart({ coinProperties }: CoinPriceChangeChartProps) {
    const xAxisDataKey = useRef<string>('date').current;
    const yAxisDataKey = useRef<string>('price').current;
    const [days, setDays] = useState<string>(coinPriceChartTimeframeList[0].value);
    const { fetchingPriceChangeList, priceChangeList } = useCoinPriceChangeChart({ coinProperties, days });
    const { timeFrame, setTimeFrame, priceStatus } = useCoinDetailsContext();

    useEffect(() => {
        if (days) {
            const foundTimeFrame = coinPriceChartTimeframeList.find((timeframe) => timeframe.value === days);
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
        <div
            className="coin-chart-wrapper"
        >
            <div className="timeframe-tabs-wrapper">
                <Tabs
                    onValueChange={(value) => { onTabChange(value) }}
                    defaultValue={days}
                >
                    <TabsList>
                        {
                            coinPriceChartTimeframeList.map((timeframe) => {
                                return (
                                    <TabsTrigger
                                        key={timeframe.value}
                                        value={String(timeframe.value)}
                                        disabled={fetchingPriceChangeList}
                                    >
                                        {timeframe.name}
                                    </TabsTrigger>
                                )
                            })
                        }
                    </TabsList>
                </Tabs>
            </div>

            <div className="chart-container">
                {
                    fetchingPriceChangeList ?
                        <div className="loading-spinner">
                            <Spinner className="size-15" />
                        </div>
                        : <>
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
                                    <div className="no-value-text p-[12px]">
                                        No data found.
                                    </div>
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default CoinPriceChart;