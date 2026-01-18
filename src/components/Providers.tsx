"use client";

import { AppProvider } from "@/contexts/AppContext";
import { Toaster } from "@/components/ui/sonner";

import { GlobalModals } from "@/components/GlobalModals";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            {children}
            <GlobalModals />
            <Toaster position="top-right" />
        </AppProvider>
    );
}
