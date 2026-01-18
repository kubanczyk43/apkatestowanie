import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostModal } from '@/components/modals/CreatePostModal';
import { useApp } from '@/contexts/AppContext';
import { mockContextValue } from '../../utils/mockAppContext';

// Mock context
jest.mock('@/contexts/AppContext', () => ({
    useApp: jest.fn(),
}));

describe('CreatePostModal Component', () => {
    beforeEach(() => {
        (useApp as jest.Mock).mockReturnValue(mockContextValue);
    });

    it('renders correctly when open', () => {
        render(<CreatePostModal open={true} onClose={jest.fn()} />);
        expect(screen.getByText('Utwórz post')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Podziel się odkryciem...')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        render(<CreatePostModal open={false} onClose={jest.fn()} />);
        expect(screen.queryByText('Utwórz post')).not.toBeInTheDocument();
    });

    it('handles tab switching', () => {
        render(<CreatePostModal open={true} onClose={jest.fn()} />);

        // Switch to Job
        fireEvent.click(screen.getByText('Oferta pracy'));
        expect(screen.getByLabelText(/stanowisko/i)).toBeInTheDocument();

        // Switch back to Post
        fireEvent.click(screen.getByText('Post'));
        expect(screen.getByPlaceholderText('Podziel się odkryciem...')).toBeInTheDocument();
    });

    it('submits form correctly', () => {
        render(<CreatePostModal open={true} onClose={jest.fn()} />);
        const input = screen.getByPlaceholderText('Podziel się odkryciem...');
        fireEvent.change(input, { target: { value: 'New post content' } });

        const submitButton = screen.getByText('Opublikuj');
        fireEvent.click(submitButton);

        expect(mockContextValue.addPost).toHaveBeenCalledWith(expect.objectContaining({
            content: 'New post content'
        }));
    });
});
