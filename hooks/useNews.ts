import { useEffect, useState } from "react";
import NewsService from "@/services/news.service";

export default function useNews() {
    const [articles, setArticles] = useState<Record<string, string | object>[] | null>(null);
    const [fetchingLatestNews, setFetchingLatestNews] = useState<boolean>(false);

    useEffect(() => {
        fetchLatestNews();
    }, []);

    async function fetchLatestNews() {
        try {
            setFetchingLatestNews(true);
            const response = await NewsService.retrieveLatestNews();
            setArticles(response?.data);
        } catch (error) {

        } finally {
            setFetchingLatestNews(false);
        }
    }

    return {
        fetchingLatestNews, articles
    }
}