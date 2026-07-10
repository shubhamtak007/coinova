'use client';

import { useForm } from "@tanstack/react-form";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { watchlistSchema } from "@/schemas/watchlist.schema";
import { addWatchlist, updateWatchlist } from "@/services/watchlist.service";
import { handleError } from "@/services/error.service";
import { toast } from "sonner";
import { Watchlist } from "@/interfaces/watchlist.interface";

type Bindings = {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>,
    watchlist: Record<string, string> | null
}

export default function useWatchlistForm(bindings: Bindings) {
    const { showDialog, setShowDialog, watchlist } = bindings;
    const [submittingData, setSubmittingData] = useState<boolean>(false);
    const formData = useRef<Watchlist>(null);
    const inputWatchlistNameRef = useRef<HTMLInputElement>(null);

    const watchlistForm = useForm({
        defaultValues: {
            name: '',
            description: ''
        },

        validators: {
            onChange: watchlistSchema as any,
            onMount: watchlistSchema as any
        },

        onSubmit: async ({ value }: { value: Watchlist }) => {
            setSubmittingData(true);
            formData.current = value;
            if (formData?.current?.description?.length === 0) formData.current.description = null;

            if (watchlist?.id) {
                updateWatchlistEntry();
            } else {
                createWatchlist();
            }
        }
    });

    useEffect(() => {
        const focusHandler: ReturnType<typeof setTimeout> = setTimeout(() => {
            if (inputWatchlistNameRef?.current) inputWatchlistNameRef.current.focus();
        });

        return () => {
            clearTimeout(focusHandler);
        }
    }, [inputWatchlistNameRef]);

    useEffect(() => {
        if (!showDialog) return;

        watchlistForm.reset();
        watchlistForm.mount();

        if (watchlist?.id) {
            watchlistForm.setFieldValue('name', watchlist.name);
            watchlistForm.setFieldValue('description', watchlist.description ? watchlist.description : '');
        }
    }, [showDialog])

    async function createWatchlist() {
        try {
            setSubmittingData(true);

            const serverWatchlist: any = {
                name: formData.current?.name,
                description: formData.current?.description
            }

            const response = await addWatchlist(serverWatchlist);

            if (response.data.data.id) {
                setShowDialog(false);
            }
        } catch (error) {
            const message = handleError(error);
            toast.error(message, { className: 'error-toast' });
        } finally {
            setSubmittingData(false);
        }
    }

    async function updateWatchlistEntry() {
        if (!watchlist || !watchlist.id) { throw new Error('watchlistId is required!!!'); }

        try {
            setSubmittingData(true);

            const serverWatchlist: any = {
                name: formData.current?.name,
                description: formData.current?.description
            }

            const updatedEntry = await updateWatchlist(watchlist.id, serverWatchlist);
            if (updatedEntry.id) setShowDialog(false);
        } catch (error) {

        } finally {
            setSubmittingData(false);
        }
    }

    return { watchlistForm, submittingData, inputWatchlistNameRef }
}