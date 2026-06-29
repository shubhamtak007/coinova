import { useEffect, useState } from "react";
import NewsService from "@/services/news.service";
import type { NewsArticle } from "@/interfaces/news.interface";
import { CaptchaData } from "@/interfaces/captcha.interface";

type Bindings = {
    showDialog: boolean
}

export default function useNews({ showDialog }: Bindings) {
    const [articles, setArticles] = useState<NewsArticle[] | null>(null);
    const [fetchingLatestNews, setFetchingLatestNews] = useState<boolean>(false);
    const [captchaData, setCaptchaData] = useState<CaptchaData | null>(null);

    function handleCaptchaData(childCaptchaData: CaptchaData) {
        setCaptchaData(childCaptchaData);
    }

    useEffect(() => {
        if (!showDialog) return;
    }, [showDialog])

    useEffect(() => {
        if (captchaData?.ref) { setFetchingLatestNews(true); captchaData.ref.current?.execute(); }
    }, [captchaData?.ref]);

    useEffect(() => {
        if (captchaData?.token) fetchLatestNews();
    }, [captchaData?.token]);

    async function fetchLatestNews() {
        try {
            const response = await NewsService.retrieveLatestNews({ captchaToken: captchaData?.token });
            setArticles(response?.data.data);
        } catch (error) {

        } finally {
            setFetchingLatestNews(false);
        }
    }

    return {
        fetchingLatestNews, articles, handleCaptchaData
    }
}