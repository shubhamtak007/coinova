'use client';

import { z } from 'zod';

const watchlistSchema = z.object({
    name: z.string().min(2, 'Watchlist name must be at least 2 characters'),
    description: z.string().nullable()
});

export { watchlistSchema };