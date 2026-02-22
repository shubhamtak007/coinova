"use client";

import { createContext, useContext, ReactNode, useState } from 'react';
import { timeFrameList } from '@/constants/coin.constants';

type TimeFrame = {
    name: string,
    value: string
}

type Status = 'up' | 'down';

type CoinDetailsContextType = {
    timeFrame: TimeFrame | null,
    setTimeFrame: (timeFrame: TimeFrame) => void,
    priceStatus: Status | null,
    setPriceStatus: (priceStatus: Status) => void
}

type CoinDetailsContextProviderProps = {
    children: ReactNode
}

const CoinDetailsContext = createContext<CoinDetailsContextType | undefined>(undefined);

const CoinDetailsContextProvider = ({ children, }: CoinDetailsContextProviderProps) => {
    const [timeFrame, setTimeFrame] = useState<TimeFrame | null>(timeFrameList[0]);
    const [priceStatus, setPriceStatus] = useState<Status | null>(null)

    return (
        <CoinDetailsContext.Provider value={{ timeFrame, setTimeFrame, priceStatus, setPriceStatus }}>
            {children}
        </CoinDetailsContext.Provider>
    )
}

const useCoinDetailsContext = (): CoinDetailsContextType => {
    const context = useContext(CoinDetailsContext);

    if (!context) {
        throw new Error('useTimeFrame must be in CoinDetailsContextProvider');
    }

    return context;
}

export { CoinDetailsContextProvider, useCoinDetailsContext }