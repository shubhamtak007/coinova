import { coinovaClientV2 } from "@/lib/api-client";
import { isAxiosError } from "axios";

const retrieveLatestNews = async () => {
    try {
        const response = await coinovaClientV2.get('v0/news/latest');
        return response;
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
        if (isAxiosError(error)) throw new Error(error.response?.data.message);
    }
}

export { retrieveLatestNews };