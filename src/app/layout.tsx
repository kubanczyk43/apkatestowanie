import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
    title: 'ScienceLink',
    description: 'Scientific Networking Platform',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl">
            <body className="bg-pink-50 min-h-screen font-sans antialiased">
                <Providers>
                    <Navbar />
                    <div className="max-w-[1440px] mx-auto px-6 py-6">
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
