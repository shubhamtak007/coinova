"use client";

import { useOptimisticNavigation } from "@/contexts/navigation-context";
import { cn } from "@/lib/utils"
import { Spinner } from "../ui/spinner";
import { useEffect } from 'react';

const NavigationWrapper = ({ className, ...props }: React.ComponentProps<"div">) => {
    const { isNavigating } = useOptimisticNavigation();

    useEffect(() => {
        let body = document.getElementsByTagName('Body');

        if (isNavigating === true) {
            body[0].classList.add('overflow-hidden');
        }

        return () => {
            body[0].classList.remove('overflow-hidden')
        }
    }, [isNavigating])

    return <>
        {isNavigating && <div className="!fixed hz-and-vert-center z-40"><Spinner className="size-15" /></div>}
        <div
            className={cn({ "spinner-overlay": isNavigating })}
            {...props}
        >
            {props.children}
        </div>
    </>
};

export default NavigationWrapper;