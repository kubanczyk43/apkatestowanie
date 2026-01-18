import { render, screen } from '@testing-library/react';
import { LeftSidebar } from '@/components/home/LeftSidebar';
import { useApp } from '@/contexts/AppContext';
import { mockContextValue } from '../../utils/mockAppContext';

jest.mock('@/contexts/AppContext', () => ({
    useApp: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() }),
}));

describe('LeftSidebar Component', () => {
    beforeEach(() => {
        (useApp as jest.Mock).mockReturnValue(mockContextValue);
    });

    it('renders user details', () => {
        render(<LeftSidebar />);
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('Tester')).toBeInTheDocument();
    });

    it('renders stats', () => {
        render(<LeftSidebar />);
        expect(screen.getByText('Wyświetlenia profilu')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument(); // mock profileViews
    });

    it('renders quick links', () => {
        render(<LeftSidebar />);
        expect(screen.getByText('Moje artykuły')).toBeInTheDocument();
        expect(screen.getByText('Zapisane')).toBeInTheDocument();
    });
});
