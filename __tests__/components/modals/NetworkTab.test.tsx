import { render, screen, fireEvent } from '@testing-library/react';
import { NetworkTab } from '@/components/NetworkTab';
import { useApp } from '@/contexts/AppContext';
import { mockContextValue } from '../../utils/mockAppContext';

jest.mock('@/contexts/AppContext', () => ({
    useApp: jest.fn(),
}));

describe('NetworkTab Component', () => {
    beforeEach(() => {
        (useApp as jest.Mock).mockReturnValue({
            ...mockContextValue,
            connectionRequests: [
                { id: 'r1', from: { id: 'u3', name: 'Requesting User', avatar: '/u.jpg', title: 'Dev', connections: [] }, status: 'pending', mutualConnections: 0 }
            ],
            allUsers: [
                { id: 'u2', name: 'Suggested User', title: 'Dev', avatar: '/u2.jpg', connections: [] }
            ]
        });
    });

    it('renders connection requests after click', async () => {
        render(<NetworkTab />);
        // Initial state might be hidden
        const tabTrigger = screen.getByRole('tab', { name: /Zaproszenia/ });
        fireEvent.click(tabTrigger);

        expect(await screen.findByText('Requesting User')).toBeInTheDocument();
    });

    it('renders suggestions', () => {
        // "Suggestions" is default tab? No, "connections".
        // Need click "Sugestie".
        render(<NetworkTab />);
        const tabTrigger = screen.getByRole('tab', { name: /Sugestie/ });
        fireEvent.click(tabTrigger);

        expect(screen.getByText('Suggested User')).toBeInTheDocument();
    });
});
