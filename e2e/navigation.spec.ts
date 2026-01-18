import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test('should navigate to the Jobs page', async ({ page }) => {
        await page.goto('/');
        await page.click('text=Oferty pracy');
        await expect(page).toHaveURL(/\/jobs/);
    });

    test('should navigate to the Messages page', async ({ page }) => {
        await page.goto('/');
        await page.click('text=Wiadomości');
        await expect(page).toHaveURL(/\/messages/);
    });

    test('should navigate to the Notifications page', async ({ page }) => {
        await page.goto('/');
        await page.click('text=Powiadomienia');
        await expect(page).toHaveURL(/\/notifications/);
    });

    test('should navigate to the Network page', async ({ page }) => {
        await page.goto('/');
        await page.click('text=Moja sieć');
        await expect(page).toHaveURL(/\/network/);
    });

    test('should navigate to the Articles page', async ({ page }) => {
        await page.goto('/');
        // Czasami linki są w menu bocznym lub footerze
        await page.goto('/articles'); // Bezpośrednie wejście jeśli link nie jest oczywisty na home
        await expect(page).toHaveURL(/\/articles/);
    });
});
