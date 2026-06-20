import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");

    if (!accessToken && refreshToken) {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}v0/auth/refresh-token`,
                {
                    method: "POST",
                    headers: {
                        cookie: request.headers.get("cookie") ?? "",
                    },
                }
            );
        } catch (error) {
            throw new Error('Failed!!');
        }
    }

    return NextResponse.next();
}