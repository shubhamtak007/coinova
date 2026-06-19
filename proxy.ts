import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");

    console.log("Proxy executed");
    console.log("Access:", !!accessToken);
    console.log("Refresh:", !!refreshToken);

    if (!accessToken && refreshToken) {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}v0/auth/refresh-token`,
            {
                method: "POST",
                headers: {
                    cookie: request.headers.get("cookie") ?? "",
                },
            }
        );

        const redirectResponse = NextResponse.redirect(
            request.nextUrl
        );

        const setCookies = response.headers.getSetCookie();

        setCookies.forEach((cookie) => {
            redirectResponse.headers.append(
                "set-cookie",
                cookie
            );
        });

        return redirectResponse;
    }

    return NextResponse.next();
}