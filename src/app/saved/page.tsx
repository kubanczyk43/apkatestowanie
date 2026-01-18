"use client";

import { SavedPostsTab } from '@/components/SavedPostsTab';
import { useApp } from '@/contexts/AppContext';

export default function Page() {
    const { openCreatePost } = useApp();

    return (
        <div className="max-w-4xl mx-auto">
            <SavedPostsTab onEditPost={(post) => openCreatePost(post)} />
        </div>
    );
}
