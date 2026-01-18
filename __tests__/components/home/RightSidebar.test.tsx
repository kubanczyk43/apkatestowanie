import { render, screen } from '@testing-library/react';
import { RightSidebar } from '@/components/RightSidebar';
import { useApp } from '@/contexts/AppContext';
import { mockContextValue } from '../../utils/mockAppContext';

jest.mock('@/contexts/AppContext', () => ({
    useApp: jest.fn(),
}));

describe('RightSidebar Component', () => {
    beforeEach(() => {
        (useApp as jest.Mock).mockReturnValue({
            ...mockContextValue,
            allUsers: [
                { id: 'u2', name: 'Other User', title: 'Dev', avatar: '/a.jpg', connections: [] }
            ]
        });
    });

    it('renders suggestions list', async () => {
        render(<RightSidebar />);
        expect(screen.getByText('Sugestie znajomych')).toBeInTheDocument();
        expect(await screen.findByText('Other User')).toBeInTheDocument();
    });

    it('handles connect button', () => {
        render(<RightSidebar />);
        const connectButton = screen.getByRole('button', { name: /połącz/i });
        expect(connectButton).toBeInTheDocument();
    });
});
