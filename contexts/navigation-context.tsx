"use client";

import { createContext, useContext, ReactNode, useOptimistic, useMemo, startTransition, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from '@/contexts/loading.context';

type OptimisticNavigationContextType = {
    optimisticPathname: string;
    navigateOptimistically: (pathname: string) => void;
};

type OptimisticNavigationContextProviderProps = {
    children: ReactNode;
};

const OptimisticNavigationContext = createContext<OptimisticNavigationContextType | undefined>(undefined);

export const OptimisticNavigationContextProvider = ({ children,
}: OptimisticNavigationContextProviderProps) => {
    const pathname = usePathname();
    const [optimisticPathname, setOptimisticPathname] = useOptimistic(pathname);
    const { setIsLoading } = useLoading();

    const navigateOptimistically = (nextPathname: string) => {
        startTransition(() => {
            setOptimisticPathname(() => nextPathname);
        });
    };

    const value = useMemo(() => ({
        optimisticPathname,
        navigateOptimistically,
    }), [pathname, optimisticPathname]);

    useEffect(() => {
        setIsLoading(false);
        if (pathname !== optimisticPathname) setIsLoading(true);
    }, [pathname, optimisticPathname])

    return (
        <OptimisticNavigationContext.Provider value={value}>
            {children}
        </OptimisticNavigationContext.Provider>
    );
};

export const useOptimisticNavigation = () => {
    const context = useContext(OptimisticNavigationContext);
    if (!context) {
        throw new Error(
            "useOptimisticNavigation must be used within an OptimisticNavigationContextProvider"
        );
    }
    return context;
};
