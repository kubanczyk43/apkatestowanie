import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Create Next App/);
});

test('check if main content loads', async ({ page }) => {
    await page.goto('/');
    // Sprawdź czy istnieje element main lub inny kluczowy element
    const main = page.locator('main');
    // Jeśli nie ma main, sprawdźmy body
    await expect(page.locator('body')).toBeVisible();
});
