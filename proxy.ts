import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    // const accessToken = request.cookies.get("accessToken");
    // const refreshToken = request.cookies.get("refreshToken");

    // if (!accessToken && refreshToken) {
    //     try {
    //         const response = await fetch(
    //             `${process.env.NEXT_PUBLIC_API_URL}v0/auth/refresh-token`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     cookie: request.headers.get("cookie") ?? "",
    //                 },
    //             }
    //         );

    //         const redirectResponse = NextResponse.redirect(request.nextUrl);
    //         const cookies = response.headers.getSetCookie();

    //         cookies.forEach((cookie) => {
    //             redirectResponse.headers.append(
    //                 "set-cookie",
    //                 cookie
    //             );
    //         });

    //         return redirectResponse;
    //     } catch (error) {
    //         console.error("Refresh token request failed:", error);
    //     }
    // }

    // return NextResponse.next();
}