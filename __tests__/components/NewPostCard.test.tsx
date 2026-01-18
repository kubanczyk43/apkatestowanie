import { render, screen, fireEvent } from '@testing-library/react';
import { NewPostCard } from '@/components/NewPostCard';

describe('NewPostCard Component', () => {
    const mockOnCreatePost = jest.fn();
    const mockAvatar = '/avatar.jpg';

    it('renders correctly', () => {
        render(<NewPostCard userAvatar={mockAvatar} onCreatePost={mockOnCreatePost} />);
        expect(screen.getByText('Podziel się odkryciem...')).toBeInTheDocument();
        expect(screen.getByAltText('User avatar')).toHaveAttribute('src', mockAvatar);
    });

    it('calls onCreatePost with correct type', () => {
        render(<NewPostCard userAvatar={mockAvatar} onCreatePost={mockOnCreatePost} />);

        fireEvent.click(screen.getByText('Podziel się odkryciem...'));
        expect(mockOnCreatePost).toHaveBeenCalledWith('post');

        fireEvent.click(screen.getByText('Artykuł'));
        expect(mockOnCreatePost).toHaveBeenCalledWith('article');

        fireEvent.click(screen.getByText('Oferta'));
        expect(mockOnCreatePost).toHaveBeenCalledWith('job');
    });
});
