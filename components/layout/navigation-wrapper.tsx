"use client";

import { useOptimisticNavigation } from "@/contexts/navigation-context";
import { cn } from "@/lib/utils"
import { Spinner } from "../ui/spinner";

const NavigationWrapper = ({ className, ...props }: React.ComponentProps<"div">) => {
    const { isNavigating } = useOptimisticNavigation();

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