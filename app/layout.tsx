import type { Metadata } from "next";
import "./globals.scss";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from '@/components/ui/sonner';


const inter = Inter({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ["latin"],
    display: 'swap'
});

export const metadata: Metadata = {
    title: "Secret Terminal",
    description: "The new force in crypto.",
    icons: {
        icon: '/coins.svg'
    }
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                {children}
                <Toaster />
                <Analytics />
            </body>
        </html>
    );
}
