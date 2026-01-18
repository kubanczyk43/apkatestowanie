import { render, screen } from '@testing-library/react';
import { SavedPostsTab } from '@/components/SavedPostsTab';
import { useApp } from '@/contexts/AppContext';
import { mockContextValue } from '../../utils/mockAppContext';

jest.mock('@/contexts/AppContext', () => ({
    useApp: jest.fn(),
    useAppContext: jest.fn(),
}));

// Mock PostCard to avoid complex rendering issues
jest.mock('@/components/PostCard', () => ({
    PostCard: ({ post }: { post: any }) => <div data-testid="post-card">{post.content}</div>
}));

describe('SavedPostsTab Component', () => {
    const mockOnEditPost = jest.fn();

    beforeEach(() => {
        (useApp as jest.Mock).mockReturnValue({
            ...mockContextValue,
            savedPosts: ['post-1'],
            posts: [
                {
                    id: 'post-1',
                    type: 'post',
                    content: 'Saved Post Content',
                    author: { id: 'a1', name: 'Author', avatar: '/a.jpg', title: 'Dev' },
                    likes: [],
                    comments: [],
                    images: [],
                    timeAgo: '1h'
                }
            ]
        });
    });

    it('renders saved posts', () => {
        render(<SavedPostsTab onEditPost={mockOnEditPost} />);
        expect(screen.getByTestId('post-card')).toHaveTextContent('Saved Post Content');
    });

    it('renders empty state', () => {
        (useApp as jest.Mock).mockReturnValue({
            ...mockContextValue,
            savedPosts: []
        });
        render(<SavedPostsTab onEditPost={mockOnEditPost} />);
        expect(screen.getByText(/Brak zapisanych postów/)).toBeInTheDocument();
    });
});
