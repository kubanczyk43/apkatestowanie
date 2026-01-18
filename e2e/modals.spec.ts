import { test, expect } from '@playwright/test';

test.describe('Modals and Interactions', () => {
    test('should open Create Post modal', async ({ page }) => {
        await page.goto('/');

        // Przycisk "Podziel się odkryciem..."
        const startPostButton = page.getByText('Podziel się odkryciem...', { exact: false });
        await expect(startPostButton).toBeVisible();
        await startPostButton.click();

        // Sprawdzamy czy modal się pojawił
        const modalHeader = page.getByRole('dialog');
        await expect(modalHeader).toBeVisible();
        // Sprawdzamy nagłówek modala
        await expect(page.getByText('Utwórz post')).toBeVisible();

        // Zamknij modal
        await page.keyboard.press('Escape');
    });

    test('should open Edit Profile modal on profile page', async ({ page }) => {
        await page.goto('/profile');

        // Przycisk "Edytuj profil"
        const editProfileButton = page.getByRole('button', { name: 'Edytuj profil' });
        await expect(editProfileButton).toBeVisible();
        await editProfileButton.click();

        // Sprawdź czy modal się otworzył
        await expect(page.getByRole('dialog')).toBeVisible();
    });
});
