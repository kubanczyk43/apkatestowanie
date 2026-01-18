"use client";

import { ArticlesPage } from '@/components/articles/ArticlesPage';
import { useApp } from '@/contexts/AppContext';

export default function Page() {
    const { openCreatePost } = useApp();

    return (
        <ArticlesPage onCreateArticle={() => openCreatePost()} />
    );
}
