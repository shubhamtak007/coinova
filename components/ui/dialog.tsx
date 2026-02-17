"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Dialog({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
    return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
    return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
    return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
    return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return (
        <DialogPrimitive.Overlay
            data-slot="dialog-overlay"
            className={cn(
                `data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0
                data-[state=open]:fade-in-0 fixed inset-0 z-60 bg-black/50 backdrop-blur-[1px]`,
                className
            )}
            {...props}
        />
    )
}

function DialogHeader({
    className,
    children,
    showCloseButton = true,
    ...props
}: React.ComponentProps<"div"> & {
    showCloseButton?: boolean
}) {
    return (
        <div
            data-slot="dialog-header"
            className={cn(`flex items-center justify-between gap-2 text-center sm:text-left min-w-[100%]
                        p-[12px] sticky top-[0px] bg-[#fff] border-b-[1px] border-[var(--main-color)] rounded-t-[var(--border-radius)]`, className)}
            {...props}
        >
            {children}

            {showCloseButton && (
                <DialogPrimitive.Close
                    data-slot="dialog-close"
                    className={`data-[state=open]:bg-accent p-[4px] h-[max-content] rounded-[var(--border-radius)] bg-[hsl(from_var(--main-color)_h_s_calc(l_+_3))]
                                data-[state=open]:text-muted-foreground opacity-70 cursor-pointer outline-[var(--main-color)]
                                transition-opacity hover:opacity-100 disabled:pointer-events-none [&_svg]:pointer-events-none
                                 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`}
                >
                    <XIcon />
                    <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
            )}
        </div>
    )
}

function DialogTitle({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
    return (
        <DialogPrimitive.Title
            data-slot="dialog-title"
            className={cn("text-left text-md whitespace-nowrap overflow-x-auto overflow-y-hidden w-[90%] leading-none font-semibold", className)}
            {...props}
        />
    )
}

function DialogContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean
}) {
    return (
        <DialogPortal data-slot="dialog-portal">
            <DialogOverlay />
            <DialogPrimitive.Content
                data-slot="dialog-content"
                className={cn(
                    `max-h-[80vh] bg-background data-[state=open]:animate-in data-[state=closed]:animate-out
                    data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
                    data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-[100] grid w-full
                    max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-[var(--border-radius)]
                    border shadow-lg duration-200 outline-none sm:max-w-lg`,
                    className
                )}
                {...props}
            >
                {children}
            </DialogPrimitive.Content>
        </DialogPortal>
    )
}

function DialogDescription({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
    return (
        <DialogPrimitive.Description
            data-slot="dialog-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    )
}

function DialogFooter({
    className,
    showCloseButton = false,
    children,
    ...props
}: React.ComponentProps<"div"> & {
    showCloseButton?: boolean
}) {
    return (
        <div
            data-slot="dialog-footer"
            className={cn(
                "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
                className
            )}
            {...props}
        >
            {children}
            {showCloseButton && (
                <DialogPrimitive.Close asChild>
                    <Button variant="outline">Close</Button>
                </DialogPrimitive.Close>
            )}
        </div>
    )
}

export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
}
