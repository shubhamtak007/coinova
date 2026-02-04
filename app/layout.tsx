import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from '@/components/layout/footer';
import { Analytics } from '@vercel/analytics/next';
import "./globals.scss";
import { OptimisticNavigationContextProvider } from '@/contexts/navigation-context';
import NavigationWrapper from '@/components/layout/navigation-wrapper';

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

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <div className="body-wrapper">
                    <Header />


                    <OptimisticNavigationContextProvider>
                        <NavigationWrapper>
                            <main className="main-content">
                                <div className="container">
                                    {children}
                                    <Analytics />
                                </div>
                            </main>
                        </NavigationWrapper>
                    </OptimisticNavigationContextProvider>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
