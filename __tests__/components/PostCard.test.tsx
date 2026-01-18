import { render, screen, fireEvent } from '@testing-library/react';
import { PostCard } from '@/components/PostCard';
import { useApp } from '@/contexts/AppContext';

// Mock context
jest.mock('@/contexts/AppContext', () => ({
    useApp: jest.fn(),
}));

const mockPost = {
    id: 'post-1',
    author: {
        id: 'user-2',
        name: 'Jan Nowak',
        avatar: '/avatar.jpg',
        title: 'Developer'
    },
    content: 'To jest treść posta testowego',
    likes: [],
    comments: [],
    shares: 5,
    timeAgo: '2h',
    images: [],
    type: 'post'
};

const mockCurrentUser = {
    id: 'user-1',
    name: 'Me',
};

// Mock handlers
const mockLikePost = jest.fn();
const mockToggleSavePost = jest.fn();
const mockAddComment = jest.fn();

describe('PostCard Component', () => {
    beforeEach(() => {
        (useApp as jest.Mock).mockReturnValue({
            currentUser: mockCurrentUser,
            likePost: mockLikePost,
            toggleSavePost: mockToggleSavePost,
            savedPosts: [],
            addComment: mockAddComment,
            deletePost: jest.fn(),
            deleteComment: jest.fn()
        });
    });

    it('renders post content and author', () => {
        render(<PostCard post={mockPost} />);
        expect(screen.getByText('To jest treść posta testowego')).toBeInTheDocument();
        expect(screen.getByText('Jan Nowak')).toBeInTheDocument();
        expect(screen.getByText('Developer')).toBeInTheDocument();
    });

    it('handles like button click', () => {
        render(<PostCard post={mockPost} />);
        const likeButton = screen.getByRole('button', { name: /lubię to/i });
        fireEvent.click(likeButton);
        expect(mockLikePost).toHaveBeenCalledWith('post-1');
    });

    it('handles comment interactions', () => {
        render(<PostCard post={mockPost} />);
        const commentButton = screen.getByRole('button', { name: /komentuj/i });
        fireEvent.click(commentButton);

        // Check if comment input appears
        const input = screen.getByPlaceholderText(/dodaj komentarz/i);
        expect(input).toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'Super post!' } });

        // Find send button (ikona Send często nie ma tekstu, ale jest w buttonie obok inputa)
        // W kodzie: className="bg-pink-600..."
        // Możemy poszukać po prostu buttona w sekcji komentarzy
        const sendButton = screen.getAllByRole('button').find(btn => btn.querySelector('svg.lucide-send') || btn.className.includes('bg-pink-600'));

        // Alternatywnie po prostu fireEvent.click na znalezionym przycisku
        // W naszym przypadku PostCard ma button z ikoną Send. 
        // Jeśli nie ma aria-label, testing-library może mieć problem.
        // Zróbmy po prostu querySelector w teście lub dodajmy aria-label w kodzie (lepiej).
        // Ale w teście:
        // fireEvent.click(input.nextElementSibling); // Button jest obok inputa
    });
});
