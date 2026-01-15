import type { Metadata } from "next";
import { Onest } from "next/font/google";
import Header from "@/components/layout/Header";
import "./globals.scss";
import { Analytics } from '@vercel/analytics/next';

const onest = Onest({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ["latin"],
    display: 'swap'
});

export const metadata: Metadata = {
    title: "Minance",
    description: "A finance app",
    icons: {
        icon: 'coins.svg'
    }
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={onest.className}>
                <Header />

                <main className="main-container">
                    <div className="max-w-6xl mx-auto">
                        {children}
                        <Analytics />
                    </div>
                </main>
            </body>
        </html>
    );
}
