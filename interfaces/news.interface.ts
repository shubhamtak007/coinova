interface NewsArticle {
    id: string,
    title: string,
    description: string,
    publishedAt: string,
    url: string,
    imageUrl: string,
    source: {
        id: string,
        name: string,
        icon: string
    }
}

export type { NewsArticle };