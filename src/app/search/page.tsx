"use client";

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { SearchResults } from '@/components/SearchResults';

function SearchPageContent() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const { setSearchQuery } = useApp();

    useEffect(() => {
        if (q) setSearchQuery(q);
    }, [q, setSearchQuery]);

    return (
        <div className="max-w-5xl mx-auto">
            <SearchResults />
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div>Ładowanie...</div>}>
            <SearchPageContent />
        </Suspense>
    );
}
