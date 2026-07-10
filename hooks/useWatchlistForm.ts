'use client';

import { useForm } from "@tanstack/react-form";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { watchlistSchema } from "@/schemas/watchlist.schema";
import { addWatchlist } from "@/services/watchlist.service";
import { handleError } from "@/services/error.service";
import { toast } from "sonner";

type Bindings = {
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

export default function useWatchlistForm(bindings: Bindings) {
    const { setShowDialog } = bindings;
    const [submittingData, setSubmittingData] = useState<boolean>(false);
    const formData = useRef<Record<string, string>>({});

    const watchlistForm = useForm({
        defaultValues: {
            name: '',
            description: ''
        },

        validators: {
            onChange: watchlistSchema as any,
            onMount: watchlistSchema as any
        },

        onSubmit: async ({ value }) => {
            setSubmittingData(true);
            formData.current = value;
            createWatchlist();
        }
    });

    async function createWatchlist() {
        try {
            setSubmittingData(true);
            const response = await addWatchlist(formData.current);

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

    return { watchlistForm, submittingData }
}