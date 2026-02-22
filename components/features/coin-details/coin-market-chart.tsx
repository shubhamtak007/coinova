'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, XAxis, YAxis, Area, CartesianGrid } from 'recharts';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCoinDetailsContext } from '@/contexts/coin-details-context';
import { timeFrameList, chartViewList } from '@/constants/coin.constants';
import useCoinMarketChartData from '@/hooks/useCoinMarketChartData';
import useCoinChart from '@/hooks/useCoinChart';
import type { CoinDetails } from '@/interfaces/coin-details';

type CoinPriceChangeChartProps = CoinDetails;

function CoinPriceChart({ coinProperties }: CoinPriceChangeChartProps) {
    const { priceStatus } = useCoinDetailsContext();
    const { chartConfiguration, xAxisDataKey, yAxisDataKey, formatXAxisTick, formatYAxisTick, onChartViewChange, onTimeFrameChange, chartTimeFrame, chartView } = useCoinChart();
    const { fetchingMarketDataPointList, marketDataPointList } = useCoinMarketChartData({ coinProperties, days: chartTimeFrame.value, currentChartView: chartView.value });

    return (
        <div
            className="coin-chart-wrapper"
        >
            <div className="tabs-wrapper">
                <Tabs
                    id={'chart-view-tabs'}
                    onValueChange={(value) => { onChartViewChange(value) }}
                    defaultValue={chartView.value}
                >
                    <TabsList>
                        {
                            chartViewList.map((chartView) => {
                                return (
                                    <TabsTrigger
                                        key={chartView.value}
                                        value={String(chartView.value)}
                                        disabled={fetchingMarketDataPointList}
                                    >
                                        {chartView.name}
                                    </TabsTrigger>
                                )
                            })
                        }
                    </TabsList>
                </Tabs>

                <Tabs
                    id={'time-frame-tabs'}
                    onValueChange={(value) => { onTimeFrameChange(value) }}
                    defaultValue={chartTimeFrame.value}
                >
                    <TabsList>
                        {
                            timeFrameList.map((timeframe) => {
                                return (
                                    <TabsTrigger
                                        key={timeframe.value}
                                        value={String(timeframe.value)}
                                        disabled={fetchingMarketDataPointList}
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
                    fetchingMarketDataPointList ?
                        <div className="loading-spinner">
                            <Spinner className="size-15" />
                        </div>
                        : <>
                            {
                                marketDataPointList.length > 0 ?
                                    <ChartContainer
                                        config={chartConfiguration}
                                    >
                                        <AreaChart
                                            accessibilityLayer
                                            data={marketDataPointList}
                                        >
                                            <CartesianGrid vertical={true} />

                                            <XAxis
                                                dataKey={xAxisDataKey.current}
                                                tickLine={false}
                                                axisLine={false}
                                                minTickGap={40}
                                                tickFormatter={formatXAxisTick}
                                                textAnchor="middle"
                                                tickMargin={5}
                                            />

                                            <YAxis
                                                dataKey={yAxisDataKey.current}
                                                axisLine={false}
                                                tickCount={5}
                                                tickFormatter={formatYAxisTick}
                                            />

                                            <ChartTooltip
                                                content={
                                                    <ChartTooltipContent
                                                        indicator="line"
                                                        xAxisDataKey={xAxisDataKey.current}
                                                        yAxisDataKey={yAxisDataKey.current}
                                                    />
                                                }
                                            />

                                            <Area
                                                dataKey={yAxisDataKey.current}
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