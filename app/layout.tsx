import type { Metadata } from "next";
import "./globals.scss";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { OptimisticNavigationContextProvider } from '@/contexts/navigation-context';
import { UserContextProvider } from "@/contexts/user.context";
import { LoadingContextProvider } from '@/contexts/loading.context';
import { Toaster } from '@/components/ui/sonner';
import { cookies } from "next/headers";
import NavigationWrapper from '@/components/layout/navigation-wrapper';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import axios, { InternalAxiosRequestConfig, isAxiosError } from "axios";

const inter = Inter({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ["latin"],
    display: 'swap'
});

export const metadata: Metadata = {
    title: "Coinova - The new force in crypto.",
    description: "The new force in crypto.",
    icons: {
        icon: '/coins.svg'
    }
};

const fetchProfile = async () => {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}v0/users/me`, {
            headers: {
                'Cookie': cookieString
            }
        });

        return response.data.data;
    } catch (error) {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}v0/auth/refresh-token`, {}, {
                headers: {
                    'Cookie': cookieString
                }
            });

            return fetchProfile();
        } catch (error) {

        }
    } finally {

    }
}

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const profileData = await fetchProfile();

    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <div className="body-wrapper">
                    <LoadingContextProvider>
                        <UserContextProvider>
                            <NavigationWrapper>
                                <OptimisticNavigationContextProvider>
                                    <Header profileData={profileData} />

                                    <main className="main-content">
                                        <div className="container">
                                            {children}
                                            <Toaster />
                                            <Analytics />
                                        </div>
                                    </main>

                                    <Footer />
                                </OptimisticNavigationContextProvider>
                            </NavigationWrapper>
                        </UserContextProvider>
                    </LoadingContextProvider>
                </div>
            </body>
        </html>
    );
}
