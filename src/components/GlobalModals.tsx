"use client";

import { useApp } from "@/contexts/AppContext";
import { CreatePostModal } from "@/components/modals/CreatePostModal";

export function GlobalModals() {
    const { isCreatePostOpen, closeCreatePost, editingPost } = useApp();

    return (
        <CreatePostModal
            open={isCreatePostOpen}
            onClose={closeCreatePost}
            editPost={editingPost}
        />
    );
}
