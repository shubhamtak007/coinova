"use client";

import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch } from 'react';

type LoadingContextProviderProps = {
    children: ReactNode
}

type LoadingContextType = {
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean | false>>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const LoadingContextProvider = ({ children, }: LoadingContextProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean | false>(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error('useUser must be in LoadingContextProvider');
    }

    return context;
}

export { LoadingContextProvider, useLoading }