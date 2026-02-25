"use client";

import { createContext, useContext, ReactNode, useState } from 'react';
import { timeFrameList } from '@/constants/coin.constants';

type TimeFrame = {
    name: string,
    value: string
}

type Status = 'up' | 'down';

type CoinAnalysisContextType = {
    timeFrame: TimeFrame | null,
    setTimeFrame: (timeFrame: TimeFrame) => void,
    priceStatus: Status | null,
    setPriceStatus: (priceStatus: Status) => void
}

type CoinAnalysisContextProviderProps = {
    children: ReactNode
}

const CoinAnalysisContext = createContext<CoinAnalysisContextType | undefined>(undefined);

const CoinAnalysisContextProvider = ({ children, }: CoinAnalysisContextProviderProps) => {
    const [timeFrame, setTimeFrame] = useState<TimeFrame | null>(timeFrameList[0]);
    const [priceStatus, setPriceStatus] = useState<Status | null>(null)

    return (
        <CoinAnalysisContext.Provider value={{ timeFrame, setTimeFrame, priceStatus, setPriceStatus }}>
            {children}
        </CoinAnalysisContext.Provider>
    )
}

const useCoinAnalysisContext = (): CoinAnalysisContextType => {
    const context = useContext(CoinAnalysisContext);

    if (!context) {
        throw new Error('useTimeFrame must be in CoinAnalysisContextProvider');
    }

    return context;
}

export { CoinAnalysisContextProvider, useCoinAnalysisContext }