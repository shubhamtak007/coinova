interface FetchFuncOptions {
    method: string,
    headers: {
        [key: string]: string
    },
    next: {
        revalidate?: number
    }
}

interface ApiProperties {
    baseUrl: string,
    headers: Record<string, string>,
}

export type { FetchFuncOptions, ApiProperties }