type Result<T> = { ok: true, data: T } | { ok: false, error: Error };

async function attempt<T>(promise: Promise<T>): Promise<Result<T>> {
    try {
        return {
            ok: true,
            data: await promise,
        };
    } catch (error) {
        return {
            ok: false,
            error: error instanceof Error ? error : new Error(String(error))
        };
    }
}

export default attempt;