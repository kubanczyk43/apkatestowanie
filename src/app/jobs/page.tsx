"use client";

import { JobsPage } from '@/components/jobs/JobsPage';
import { useApp } from '@/contexts/AppContext';

export default function Page() {
    const { openCreatePost } = useApp();

    return (
        <JobsPage onCreateJob={() => openCreatePost()} />
    );
}
