import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/next';
import "./globals.scss";

const inter = Inter({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ["latin"],
    display: 'swap'
});

export const metadata: Metadata = {
    title: "Coinova - The new force in crypto.",
    description: "The new force in crypto.",
    icons: {
        icon: 'coins.svg'
    }
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />

                <main className="main-container">
                    <div className="max-w-6xl mx-auto">
                        {children}
                        <Analytics />
                    </div>
                </main>

                <Footer />
            </body>
        </html>
    );
}
