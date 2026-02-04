import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="skeleton"
            className={cn("bg-[#eeeeee] rounded-[var(--border-radius)] animate-pulse", className)}
            {...props}
        />
    )
}

export { Skeleton }
