import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");

    if (!accessToken && refreshToken) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}v0/auth/refresh-token`,
                {
                    method: "POST",
                    headers: {
                        cookie: request.headers.get("cookie") ?? "",
                    },
                }
            );

            const nextResponse = NextResponse.next();

            const setCookies = response.headers.getSetCookie();

            setCookies.forEach((cookie) => {
                nextResponse.headers.append("set-cookie", cookie);
            });

            return nextResponse;
        } catch (error) {
            console.error("Refresh failed", error);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};