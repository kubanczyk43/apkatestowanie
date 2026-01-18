import { render, screen, fireEvent } from '@testing-library/react';
import { EditProfileModal } from '@/components/modals/EditProfileModal';
import { useApp } from '@/contexts/AppContext';
import { mockContextValue } from '../../utils/mockAppContext';

jest.mock('@/contexts/AppContext', () => ({
    useApp: jest.fn(),
}));

describe('EditProfileModal Component', () => {
    beforeEach(() => {
        (useApp as jest.Mock).mockReturnValue(mockContextValue);
    });

    it('renders correctly with user data', () => {
        render(<EditProfileModal open={true} onClose={jest.fn()} />);
        expect(screen.getByText('Edytuj profil')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument(); // from mockCurrentUser
        expect(screen.getByDisplayValue('Tester')).toBeInTheDocument();
    });

    it('updates profile on save', () => {
        const onClose = jest.fn();
        render(<EditProfileModal open={true} onClose={onClose} />);

        const nameInput = screen.getByDisplayValue('Test User');
        fireEvent.change(nameInput, { target: { value: 'New Name' } });

        const submitButton = screen.getByText('Zapisz zmiany');
        fireEvent.click(submitButton);

        expect(mockContextValue.updateCurrentUser).toHaveBeenCalledWith(expect.objectContaining({
            name: 'New Name'
        }));
        expect(onClose).toHaveBeenCalled();
    });
});
