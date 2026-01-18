import { render, screen } from '@testing-library/react';
import { SearchResults } from '@/components/SearchResults';
import { useApp } from '@/contexts/AppContext';
import { mockContextValue } from '../utils/mockAppContext';

jest.mock('@/contexts/AppContext', () => ({
    useApp: jest.fn(),
}));

// Mock PostCard
jest.mock('@/components/PostCard', () => ({
    PostCard: ({ post }: { post: any }) => <div data-testid="post-card">{post.content}</div>
}));

describe('SearchResults Component', () => {
    beforeEach(() => {
        (useApp as jest.Mock).mockReturnValue({
            ...mockContextValue,
            searchQuery: 'test',
            allUsers: [
                { id: 'u1', name: 'Test User 1', title: 'Dev', connections: [], institution: 'Inst', location: 'Loc' },
                { id: 'u2', name: 'Other', title: 'PM', connections: [], institution: 'Inst', location: 'Loc' }
            ],
            posts: [
                {
                    id: 'p1',
                    type: 'post',
                    content: 'This is a test post',
                    author: { id: 'u1', name: 'A', avatar: '/a.jpg', title: 'Dev' },
                    likes: [],
                    comments: [],
                    images: [],
                    timeAgo: '1h'
                }
            ]
        });
    });

    it('renders matching users', () => {
        render(<SearchResults />);
        // "Znaleziono: 1 osób"
        expect(screen.getByText(/Znaleziono: 1 osób/)).toBeInTheDocument();
        expect(screen.getByText('Test User 1')).toBeInTheDocument();
    });

    it('renders matching posts', () => {
        render(<SearchResults />);
        // "Znaleziono: 1 osób, 1 postów" - appears in H1 or P
        // "Posty (1)" - appears in Tabs
        // Use getAllByText if strict
        const elements = screen.getAllByText(/1 postów/);
        expect(elements.length).toBeGreaterThan(0);
        const posts = screen.getAllByText('This is a test post');
        expect(posts.length).toBeGreaterThan(0);
    });
});
