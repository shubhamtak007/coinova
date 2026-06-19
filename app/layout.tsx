import type { Metadata } from "next";
import "./globals.scss";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { OptimisticNavigationContextProvider } from '@/contexts/navigation-context';
import { UserContextProvider } from "@/contexts/user.context";
import { LoadingContextProvider } from '@/contexts/loading.context';
import { Toaster } from '@/components/ui/sonner';
import NavigationWrapper from '@/components/layout/navigation-wrapper';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import UserService from "@/services/user.service";

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

async function fetchProfile() {
    try {
        const response = await UserService.retrieveProfile();
        return response.data.data;
    } catch (error) {

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
