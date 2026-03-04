interface CoinListApiParams {
    vs_currency?: string | null,
    precision?: number | null,
    symbols?: string | null,
    page?: number | null,
    per_page?: number | null,
    price_change_percentage?: string | null,
    order?: string | null,
    names?: string | null,
    ids?: string | null
}

export type { CoinListApiParams }