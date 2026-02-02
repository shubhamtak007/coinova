"use client";

import { usePathname } from "next/navigation";
import { createContext, ReactNode, useContext, useOptimistic, useMemo, startTransition, } from "react";

type OptimisticNavigationContextType = {
    isNavigating: boolean;
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

    const navigateOptimistically = (nextPathname: string) => {
        startTransition(() => {
            setOptimisticPathname(() => nextPathname);
        });
    };

    const value = useMemo(() => ({
        isNavigating: pathname !== optimisticPathname,
        optimisticPathname,
        navigateOptimistically,
    }), [pathname, optimisticPathname]);

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
