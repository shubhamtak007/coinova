import { isAxiosError } from "axios";

function handleError(error: unknown) {
    let message;
    if (error instanceof Error) message = error.message;
    if (isAxiosError(error)) message = error.response?.data.message;
    if (error) message = JSON.stringify(error);

    return message;
}

export { handleError };