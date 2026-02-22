'use client';

import { useState, useRef } from 'react';
import { formatValueInUsdCompact } from '@/services/utils.service';
import { timeFrameList, chartViewList } from '@/constants/coin.constants';
import { useCoinDetailsContext } from '@/contexts/coin-details-context';
import { type ChartConfig } from '@/components/ui/chart';

type ChartView = { name: string, value: string };

function useCoinChart() {
    const xAxisDataKey = useRef<string>('date');
    const yAxisDataKey = useRef<string>('value');
    const { setTimeFrame } = useCoinDetailsContext();
    const [chartTimeFrame, setChartTimeFrame] = useState(timeFrameList[0]);
    const [chartView, setChartView] = useState<ChartView>(chartViewList[0]);
    const [chartConfiguration, setChartConfiguration] = useState<ChartConfig>({
        value: {
            label: 'Price (USD)',
            color: 'var(--chart-2)'
        }
    })

    function formatXAxisTick(milliseconds: string): string {
        const currentYear = new Date().getFullYear();

        if (chartTimeFrame?.name === '24H') {
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

    function formatYAxisTick(yAxisTickValue: string): string {
        const formattedValue = formatValueInUsdCompact(Number(yAxisTickValue), 6)
        return String(formattedValue);
    }

    function onTimeFrameChange(value: string) {
        const currentTimeFrame = timeFrameList.find((timeFrameElement) => timeFrameElement.value === value);

        if (currentTimeFrame) {
            setChartTimeFrame(currentTimeFrame);
            setTimeFrame(currentTimeFrame);
        }
    }

    function onChartViewChange(value: string) {
        const currentChartView = chartViewList.find((masterChartViewItem) => masterChartViewItem.value === value);

        if (currentChartView) {
            setChartView(currentChartView);
            setChartConfigurationByChartView(currentChartView.value);
        }
    }

    function setChartConfigurationByChartView(chartView: string) {
        switch (chartView) {
            case 'price': return setChartConfiguration({
                value: {
                    label: 'Price (USD)',
                    color: 'var(--chart-2)'
                }
            });
            case 'marketCapital': return setChartConfiguration({
                value: {
                    label: 'Market Capital',
                    color: 'var(--chart-2)'
                }
            });
            case 'volume': return setChartConfiguration({
                value: {
                    label: 'Volume',
                    color: 'var(--chart-2)'
                }
            })
        }
    }

    return {
        chartConfiguration, xAxisDataKey, yAxisDataKey, formatXAxisTick, formatYAxisTick, onChartViewChange,
        onTimeFrameChange, chartTimeFrame, chartView
    }
}

export default useCoinChart;