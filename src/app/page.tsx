"use client";

import { useApp } from "@/contexts/AppContext";
import { LeftSidebar } from "@/components/home/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { NewPostCard } from "@/components/NewPostCard";
import { PostCard } from "@/components/PostCard";
import { FileQuestion } from "lucide-react";

export default function HomePage() {
    const { posts, currentUser, openCreatePost } = useApp();

    const handleEditPost = (post: any) => {
        openCreatePost(post);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-3">
                <LeftSidebar />
            </aside>

            <main className="lg:col-span-6 space-y-4">
                <NewPostCard
                    userAvatar={currentUser?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop'}
                    onCreatePost={() => openCreatePost()}
                />

                {posts.length === 0 ? (
                    <div className="bg-white border-2 border-pink-200 rounded-xl p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <FileQuestion className="w-16 h-16 mx-auto" strokeWidth={1} />
                        </div>
                        <h3 className="text-gray-900 mb-2">Brak postów</h3>
                        <p className="text-gray-600">Zacznij dodawać treści, aby zobaczyć swój feed</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} onEdit={handleEditPost} />
                        ))}
                    </div>
                )}
            </main>

            <aside className="lg:col-span-3 hidden lg:block">
                <RightSidebar />
            </aside>
        </div>
    );
}
