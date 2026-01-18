import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationsTab } from '@/components/NotificationsTab';
import { useApp } from '@/contexts/AppContext';
import { mockContextValue } from '../../utils/mockAppContext';

jest.mock('@/contexts/AppContext', () => ({
    useApp: jest.fn(),
}));

describe('NotificationsTab Component', () => {
    const mockNotifications = [
        { id: 'n1', type: 'like', message: 'liked your post', read: false, timeAgo: '1h', from: { name: 'User A', avatar: '/a.jpg' } },
        { id: 'n2', type: 'comment', message: 'commented', read: true, timeAgo: '2h', from: { name: 'User B', avatar: '/b.jpg' } }
    ];

    beforeEach(() => {
        (useApp as jest.Mock).mockReturnValue({
            ...mockContextValue,
            notifications: mockNotifications
        });
    });

    it('renders notifications list', () => {
        render(<NotificationsTab />);
        expect(screen.getByText('User A')).toBeInTheDocument();
        expect(screen.getByText('liked your post')).toBeInTheDocument();
    });

    it('handles mark all as read', () => {
        render(<NotificationsTab />);
        const markAllButton = screen.getByText('Oznacz wszystkie jako przeczytane');
        fireEvent.click(markAllButton);
        expect(mockContextValue.markAllNotificationsRead).toHaveBeenCalled();
    });
});
