'use client';

import { useForm } from "@tanstack/react-form";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { watchlistSchema } from "@/schemas/watchlist.schema";
import { addWatchlist, updateWatchlist } from "@/services/watchlist.service";
import { handleError } from "@/services/error.service";
import { toast } from "sonner";
import { Watchlist } from "@/interfaces/watchlist.interface";

type Bindings = {
    setShowDialog: Dispatch<SetStateAction<boolean>>,
    watchlist: Record<string, string> | null
}

export default function useWatchlistForm(bindings: Bindings) {
    const { setShowDialog, watchlist } = bindings;
    const [submittingData, setSubmittingData] = useState<boolean>(false);
    const formData = useRef<Watchlist>(null);

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
            if (value?.description?.length === 0) value.description = null;
            formData.current = value;

            if (watchlist?.id) {
                updateWatchlistEntry();
            } else {
                createWatchlist();
            }
        }
    });

    useEffect(() => {
        if (watchlist) {
            watchlistForm.setFieldValue('name', watchlist.name);
            watchlistForm.setFieldValue('description', watchlist.description ? watchlist.description : '');
        }
    }, [watchlist]);

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

    return { watchlistForm, submittingData }
}