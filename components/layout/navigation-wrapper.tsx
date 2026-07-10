"use client";

import { useLoading } from "@/contexts/loading.context";
import { cn } from "@/lib/utils"
import { Spinner } from "../ui/spinner";

const NavigationWrapper = ({ className, ...props }: React.ComponentProps<"div">) => {
    const { isLoading } = useLoading();

    return (
        <>
            {isLoading && <>
                <div className="!fixed hz-and-vert-center z-[302]">
                    <Spinner className="size-10" strokeWidth={3} />
                </div>

                <div className={cn({ "spinner-overlay": isLoading }, className)}></div>
            </>}
            <div
                className={`${isLoading && 'pointer-events-none select-none'}`}
                {...props}
            >
                {props.children}
            </div>
        </>
    )
};

export default NavigationWrapper;