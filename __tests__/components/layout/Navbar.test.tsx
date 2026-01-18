import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '@/components/layout/Navbar';

// Mock mocks
jest.mock('next/navigation', () => ({
    usePathname: () => '/',
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock('@/contexts/AppContext', () => ({
    useApp: () => ({
        currentUser: {
            name: 'Test User',
            avatar: '/avatar.jpg',
            title: 'Tester',
        },
        notifications: [],
        setSearchQuery: jest.fn(),
    }),
}));

describe('Navbar Component', () => {
    it('renders correctly', () => {
        render(<Navbar />);
        expect(screen.getByText('ScienceLink')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/szukaj/i)).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<Navbar />);
        expect(screen.getByText('Strona główna')).toBeInTheDocument();
        expect(screen.getByText('Moja sieć')).toBeInTheDocument();
        expect(screen.getByText('Oferty pracy')).toBeInTheDocument();
    });

    it('renders user avatar', () => {
        render(<Navbar />);
        const avatar = screen.getByAltText('Test User');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', '/avatar.jpg');
    });
});
